import { describe, it, expect } from 'vitest';
import { cleanText, getCharacterName } from './textCleaner.js';

describe('textCleaner', () => {
	describe('cleanText', () => {
		it('should remove zero-width spaces', () => {
			const input = 'Hello\u200BWorld\u200C\u200DTest';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Hello World  Test');
			expect(result.changes).toHaveLength(3);
			expect(result.changes[0].type).toBe('whitespace');
		});

		it('should convert smart quotes to regular quotes', () => {
			const input = '\u201cHello\u201d and \u2018world\u2019';
			const result = cleanText(input);

			expect(result.cleaned).toBe('"Hello" and \'world\'');
			expect(result.changes).toHaveLength(5);
			expect(result.changes.every((c) => c.type === 'smart-quotes')).toBe(true);
		});

		it('should convert em dashes to regular dashes with proper spacing', () => {
			const input = 'Hello\u2014world and test\u2014more';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Hello - world and test - more');
			expect(result.changes).toHaveLength(2);
			expect(result.changes.every((c) => c.type === 'em-dash')).toBe(true);
		});

		it('should convert en dashes to regular dashes', () => {
			const input = 'Hello\u2013world';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Hello-world');
			expect(result.changes).toHaveLength(1);
			expect(result.changes[0].type).toBe('en-dash');
		});

		it('should convert Unicode ellipsis to regular dots', () => {
			const input = 'Hello\u2026world';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Hello...world');
			expect(result.changes).toHaveLength(1);
			expect(result.changes[0].type).toBe('ellipsis');
		});

		it('should remove soft hyphens', () => {
			const input = 'Hel\u00ADlo world';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Hello world');
			expect(result.changes).toHaveLength(1);
			expect(result.changes[0].type).toBe('soft-hyphen');
		});

		it('should convert fullwidth characters', () => {
			const input = '\uff28\uff45\uff4c\uff4c\uff4f\uff11\uff12\uff13';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Hello123');
			expect(result.changes).toHaveLength(8);
			expect(result.changes.every((c) => c.type === 'fullwidth')).toBe(true);
		});
		it('should clean AI tracking parameters from URLs', () => {
			const input =
				'Check this: https://example.com/page?source=chatgpt&utm_source=openai&other=keep';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Check this: https://example.com/page?other=keep');
			expect(result.changes).toHaveLength(1);
			expect(result.changes[0].type).toBe('url-params');
		});

		it('should handle multiple URL parameters correctly', () => {
			const input = 'Visit https://test.com?ref=bard&source=gemini&keep=this';
			const result = cleanText(input);

			expect(result.cleaned).toBe('Visit https://test.com/?keep=this');
			expect(result.changes).toHaveLength(1);
			expect(result.changes[0].type).toBe('url-params');
		});

		it('should handle text with no issues', () => {
			const input = 'This is clean text with no issues.';
			const result = cleanText(input);

			expect(result.cleaned).toBe(input);
			expect(result.changes).toHaveLength(0);
		});

		it('should handle empty text', () => {
			const result = cleanText('');

			expect(result.cleaned).toBe('');
			expect(result.changes).toHaveLength(0);
		});

		it('should handle complex mixed issues', () => {
			const input = '\u201cSmart quotes\u201d with\u2014em dash and\u200Bzero-width space';
			const result = cleanText(input);

			expect(result.cleaned).toBe('"Smart quotes" with - em dash and zero-width space');
			expect(result.changes.length).toBeGreaterThan(0);
		});

		it('should preserve original text in result', () => {
			const input = 'Test\u200Btext';
			const result = cleanText(input);

			expect(result.original).toBe(input);
		});
	});

	describe('getCharacterName', () => {
		it('should identify zero-width spaces', () => {
			expect(getCharacterName('\u200B')).toBe('Zero-width space');
		});

		it('should identify smart quotes', () => {
			expect(getCharacterName('\u201C')).toBe('Left double quotation mark');
			expect(getCharacterName('\u201D')).toBe('Right double quotation mark');
		});

		it('should identify dashes', () => {
			expect(getCharacterName('\u2014')).toBe('Em dash');
			expect(getCharacterName('\u2013')).toBe('En dash');
		});

		it('should identify fullwidth characters', () => {
			expect(getCharacterName('\uff21')).toBe('Fullwidth uppercase letter (A)');
			expect(getCharacterName('\uff41')).toBe('Fullwidth lowercase letter (a)');
			expect(getCharacterName('\uff11')).toBe('Fullwidth digit (1)');
		});

		it('should handle URLs', () => {
			expect(getCharacterName('https://example.com')).toBe('URL with AI tracking parameters');
		});

		it('should handle unknown characters', () => {
			const result = getCharacterName('€');
			expect(result).toContain('Unknown character');
			expect(result).toContain('U+20AC');
		});
	});
});
