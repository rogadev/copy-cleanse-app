import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyToClipboard, getClipboardErrorMessage } from './clipboardOperations.js';

describe('clipboardOperations', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('copyToClipboard', () => {
		it('should successfully copy text using modern API', async () => {
			const mockWriteText = vi.fn().mockResolvedValue(undefined);
			Object.assign(navigator, {
				clipboard: {
					writeText: mockWriteText
				}
			});

			const result = await copyToClipboard('test text', { maxSize: 1000000 });

			expect(result.success).toBe(true);
			expect(mockWriteText).toHaveBeenCalledWith('test text');
		});

		it('should handle text too large error', async () => {
			const result = await copyToClipboard('x'.repeat(2000000), { maxSize: 1000000 });

			expect(result.success).toBe(false);
			expect(result.errorType).toBe('size');
			expect(result.error).toBe('Text too large for clipboard');
		});

		it('should handle permission denied error', async () => {
			const mockWriteText = vi
				.fn()
				.mockRejectedValue(new DOMException('Permission denied', 'NotAllowedError'));
			Object.assign(navigator, {
				clipboard: {
					writeText: mockWriteText
				}
			});

			// Mock fallback to also fail
			const mockExecCommand = vi.fn().mockReturnValue(false);
			Object.assign(document, {
				createElement: vi.fn().mockReturnValue({
					value: '',
					style: {},
					focus: vi.fn(),
					select: vi.fn()
				}),
				execCommand: mockExecCommand
			});
			Object.assign(document.body, {
				appendChild: vi.fn(),
				removeChild: vi.fn()
			});

			const result = await copyToClipboard('test text', { maxSize: 1000000 });

			expect(result.success).toBe(false);
			expect(result.errorType).toBe('permission');
		});

		it('should use fallback method when modern API fails', async () => {
			const mockWriteText = vi.fn().mockRejectedValue(new Error('API not supported'));
			Object.assign(navigator, {
				clipboard: {
					writeText: mockWriteText
				}
			});

			// Mock successful fallback
			const mockTextarea = {
				value: '',
				style: {},
				focus: vi.fn(),
				select: vi.fn()
			};
			const mockExecCommand = vi.fn().mockReturnValue(true);
			Object.assign(document, {
				createElement: vi.fn().mockReturnValue(mockTextarea),
				execCommand: mockExecCommand
			});
			Object.assign(document.body, {
				appendChild: vi.fn(),
				removeChild: vi.fn()
			});

			const result = await copyToClipboard('test text', { maxSize: 1000000 });

			expect(result.success).toBe(true);
			expect(mockExecCommand).toHaveBeenCalledWith('copy');
		});
	});

	describe('getClipboardErrorMessage', () => {
		it('should return empty string for successful result', () => {
			const message = getClipboardErrorMessage({ success: true });
			expect(message).toBe('');
		});

		it('should return size error message', () => {
			const message = getClipboardErrorMessage({
				success: false,
				errorType: 'size'
			});
			expect(message).toBe('Text too large for clipboard. Use manual copy.');
		});

		it('should return permission error message', () => {
			const message = getClipboardErrorMessage({
				success: false,
				errorType: 'permission'
			});
			expect(message).toBe('Clipboard access denied. Use manual copy button.');
		});

		it('should return custom error message', () => {
			const message = getClipboardErrorMessage({
				success: false,
				error: 'Custom error message'
			});
			expect(message).toBe('Custom error message');
		});

		it('should return default error message', () => {
			const message = getClipboardErrorMessage({
				success: false
			});
			expect(message).toBe('Copy failed. Try manual copy button.');
		});
	});
});
