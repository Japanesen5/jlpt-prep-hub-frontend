import React from 'react';

interface FuriganaProps {
  japanese: string;
  reading?: string;
  className?: string;
}

// Simple parser for inputs like "私[わたし]は 学生[がくせい]です"
// If not using bracket format, it will just show the reading above the whole string if provided.
export function Furigana({ japanese, reading, className }: FuriganaProps) {
  const bracketRegex = /([^\x00-\x7F]+)\[([^[\]]+)\]/g;
  
  if (japanese.includes('[') && japanese.includes(']')) {
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = bracketRegex.exec(japanese)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{japanese.substring(lastIndex, match.index)}</span>);
      }
      parts.push(
        <ruby key={`ruby-${match.index}`}>
          {match[1]}<rt>{match[2]}</rt>
        </ruby>
      );
      lastIndex = bracketRegex.lastIndex;
    }

    if (lastIndex < japanese.length) {
      parts.push(<span key={`text-${lastIndex}`}>{japanese.substring(lastIndex)}</span>);
    }

    return <span className={`text-jp font-medium ${className || ''}`}>{parts}</span>;
  }

  // Fallback: If reading is provided explicitly, wrap the whole word
  if (reading && japanese !== reading) {
    return (
      <span className={`text-jp font-medium ${className || ''}`}>
        <ruby>
          {japanese}<rt>{reading}</rt>
        </ruby>
      </span>
    );
  }

  return <span className={`text-jp font-medium ${className || ''}`}>{japanese}</span>;
}
