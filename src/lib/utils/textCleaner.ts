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
  type: 'whitespace' | 'em-dash' | 'other';
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
  '\uFEFF', // Zero-width no-break space (BOM)
];

const EM_DASH_REGEX = /—/g;

export function cleanText(text: string): CleaningResult {
  const changes: TextChange[] = [];
  let cleaned = text;

  // First, find all em dashes
  const emDashMatches = [...text.matchAll(EM_DASH_REGEX)];
  for (const match of emDashMatches) {
    if (match.index !== undefined) {
      changes.push({
        start: match.index,
        end: match.index + 1,
        original: '—',
        replacement: ' - ',
        type: 'em-dash'
      });
    }
  }

  // Then find suspicious whitespace characters
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

  return {
    original: text,
    cleaned,
    changes
  };
}

export function getCharacterName(char: string): string {
  const charMap: Record<string, string> = {
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
    '—': 'Em dash'
  };

  return charMap[char] || `Unknown character (U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`;
} 
