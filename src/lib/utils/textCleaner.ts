export interface CleaningResult {
	original: string;
	cleaned: string;
	changes: TextChange[];
}

export interface TextChange {
	start: number;
	end: number;
	original: string;
	replacement: string;
	type: 'whitespace' | 'em-dash' | 'en-dash' | 'smart-quotes' | 'ellipsis' | 'soft-hyphen' | 'fullwidth' | 'other';
}

// Common AI-generated text markers and suspicious whitespace characters
const SUSPICIOUS_WHITESPACE = [
	'\u00A0', // Non-breaking space
	'\u2000', // En quad
	'\u2001', // Em quad
	'\u2002', // En space
	'\u2003', // Em space
	'\u2004', // Three-per-em space
	'\u2005', // Four-per-em space
	'\u2006', // Six-per-em space
	'\u2007', // Figure space
	'\u2008', // Punctuation space
	'\u2009', // Thin space
	'\u200A', // Hair space
	'\u200B', // Zero-width space
	'\u200C', // Zero-width non-joiner
	'\u200D', // Zero-width joiner
	'\u202F', // Narrow no-break space
	'\u205F', // Medium mathematical space
	'\u3000', // Ideographic space
	'\uFEFF' // Zero-width no-break space (BOM)
];

// Character patterns that indicate AI generation
const EM_DASH_REGEX = /\u2014/g; // Em dash
const EN_DASH_REGEX = /\u2013/g; // En dash (often used where hyphen should be)
const SMART_QUOTES_REGEX = /[\u201C\u201D\u2018\u2019]/g; // Smart/curly quotes
const UNICODE_ELLIPSIS_REGEX = /\u2026/g; // Unicode ellipsis character
const SOFT_HYPHEN_REGEX = /\u00AD/g; // Soft hyphen (invisible)
const CURLY_APOSTROPHE_REGEX = /\u2019/g; // Curly apostrophe

// Fullwidth character ranges (commonly A-Z, a-z, 0-9)
const FULLWIDTH_UPPERCASE_REGEX = /[Ａ-Ｚ]/g;
const FULLWIDTH_LOWERCASE_REGEX = /[ａ-ｚ]/g;
const FULLWIDTH_NUMBERS_REGEX = /[０-９]/g;

export function cleanText(text: string): CleaningResult {
	const changes: TextChange[] = [];
	let cleaned = text;

	// Find em dashes
	const emDashMatches = [...text.matchAll(EM_DASH_REGEX)];
	for (const match of emDashMatches) {
		if (match.index !== undefined) {
			changes.push({
				start: match.index,
				end: match.index + 1,
				original: '\u2014',
				replacement: ' - ',
				type: 'em-dash'
			});
		}
	}

	// Find en dashes
	const enDashMatches = [...text.matchAll(EN_DASH_REGEX)];
	for (const match of enDashMatches) {
		if (match.index !== undefined) {
			changes.push({
				start: match.index,
				end: match.index + 1,
				original: '\u2013',
				replacement: '-',
				type: 'en-dash'
			});
		}
	}

	// Find smart quotes
	const smartQuoteMatches = [...text.matchAll(SMART_QUOTES_REGEX)];
	for (const match of smartQuoteMatches) {
		if (match.index !== undefined) {
			const char = match[0];
			let replacement = '"';
			if (char === '\u2018' || char === '\u2019') {
				replacement = "'";
			}
			changes.push({
				start: match.index,
				end: match.index + 1,
				original: char,
				replacement: replacement,
				type: 'smart-quotes'
			});
		}
	}

	// Find Unicode ellipsis
	const ellipsisMatches = [...text.matchAll(UNICODE_ELLIPSIS_REGEX)];
	for (const match of ellipsisMatches) {
		if (match.index !== undefined) {
			changes.push({
				start: match.index,
				end: match.index + 1,
				original: '\u2026',
				replacement: '...',
				type: 'ellipsis'
			});
		}
	}

	// Find soft hyphens (invisible)
	const softHyphenMatches = [...text.matchAll(SOFT_HYPHEN_REGEX)];
	for (const match of softHyphenMatches) {
		if (match.index !== undefined) {
			changes.push({
				start: match.index,
				end: match.index + 1,
				original: '\u00AD',
				replacement: '',
				type: 'soft-hyphen'
			});
		}
	}

	// Find curly apostrophes
	const curlyApostropheMatches = [...text.matchAll(CURLY_APOSTROPHE_REGEX)];
	for (const match of curlyApostropheMatches) {
		if (match.index !== undefined) {
			changes.push({
				start: match.index,
				end: match.index + 1,
				original: '\u2019',
				replacement: "'",
				type: 'smart-quotes'
			});
		}
	}

	// Find fullwidth characters
	const fullwidthMatches = [
		...text.matchAll(FULLWIDTH_UPPERCASE_REGEX),
		...text.matchAll(FULLWIDTH_LOWERCASE_REGEX),
		...text.matchAll(FULLWIDTH_NUMBERS_REGEX)
	];

	for (const match of fullwidthMatches) {
		if (match.index !== undefined) {
			const char = match[0];
			let replacement = char;

			// Convert fullwidth to regular characters
			const code = char.charCodeAt(0);
			if (code >= 0xFF21 && code <= 0xFF3A) { // A-Z
				replacement = String.fromCharCode(code - 0xFF21 + 0x41);
			} else if (code >= 0xFF41 && code <= 0xFF5A) { // a-z
				replacement = String.fromCharCode(code - 0xFF41 + 0x61);
			} else if (code >= 0xFF10 && code <= 0xFF19) { // 0-9
				replacement = String.fromCharCode(code - 0xFF10 + 0x30);
			}

			if (replacement !== char) {
				changes.push({
					start: match.index,
					end: match.index + 1,
					original: char,
					replacement: replacement,
					type: 'fullwidth'
				});
			}
		}
	}

	// Find suspicious whitespace characters
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (SUSPICIOUS_WHITESPACE.includes(char)) {
			changes.push({
				start: i,
				end: i + 1,
				original: char,
				replacement: ' ',
				type: 'whitespace'
			});
		}
	}

	// Sort changes by position to apply them correctly
	changes.sort((a, b) => a.start - b.start);

	// Apply changes from end to beginning to maintain correct indices
	for (let i = changes.length - 1; i >= 0; i--) {
		const change = changes[i];
		cleaned = cleaned.slice(0, change.start) + change.replacement + cleaned.slice(change.end);
	}

	// Remove extra newlines at the end of the text
	const newlineMatch = cleaned.match(/[\r\n]+$/);
	if (newlineMatch) {
		changes.push({
			start: cleaned.length - newlineMatch[0].length,
			end: cleaned.length,
			original: newlineMatch[0],
			replacement: '',
			type: 'whitespace'
		});
		cleaned = cleaned.slice(0, cleaned.length - newlineMatch[0].length);
	}

	return {
		original: text,
		cleaned,
		changes
	};
}

export function getCharacterName(char: string): string {
	const charMap: Record<string, string> = {
		// Whitespace characters
		'\u00A0': 'Non-breaking space',
		'\u2000': 'En quad',
		'\u2001': 'Em quad',
		'\u2002': 'En space',
		'\u2003': 'Em space',
		'\u2004': 'Three-per-em space',
		'\u2005': 'Four-per-em space',
		'\u2006': 'Six-per-em space',
		'\u2007': 'Figure space',
		'\u2008': 'Punctuation space',
		'\u2009': 'Thin space',
		'\u200A': 'Hair space',
		'\u200B': 'Zero-width space',
		'\u200C': 'Zero-width non-joiner',
		'\u200D': 'Zero-width joiner',
		'\u202F': 'Narrow no-break space',
		'\u205F': 'Medium mathematical space',
		'\u3000': 'Ideographic space',
		'\uFEFF': 'Zero-width no-break space (BOM)',
		// Dashes
		'\u2014': 'Em dash',
		'\u2013': 'En dash',
		// Smart quotes and apostrophes
		'\u201C': 'Left double quotation mark',
		'\u201D': 'Right double quotation mark',
		'\u2018': 'Left single quotation mark',
		'\u2019': 'Right single quotation mark',
		// Other special characters
		'\u2026': 'Unicode ellipsis',
		'\u00AD': 'Soft hyphen (invisible)'
	};

	// Check for fullwidth characters
	const code = char.charCodeAt(0);
	if (code >= 0xFF21 && code <= 0xFF3A) {
		return `Fullwidth uppercase letter (${String.fromCharCode(code - 0xFF21 + 0x41)})`;
	} else if (code >= 0xFF41 && code <= 0xFF5A) {
		return `Fullwidth lowercase letter (${String.fromCharCode(code - 0xFF41 + 0x61)})`;
	} else if (code >= 0xFF10 && code <= 0xFF19) {
		return `Fullwidth digit (${String.fromCharCode(code - 0xFF10 + 0x30)})`;
	}

	return (
		charMap[char] ||
		`Unknown character (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`
	);
}
