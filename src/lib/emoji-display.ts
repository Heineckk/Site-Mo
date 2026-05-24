export function isEmojiOnly(text: string) {
  const trimmed = text.trim();
  return trimmed.length > 0 && !/[a-zA-ZÀ-ú0-9]/.test(trimmed);
}

export function splitEmojis(text: string) {
  const matches = text.match(
    /\p{Extended_Pictographic}+(\uFE0F)?(\u200D\p{Extended_Pictographic}+(\uFE0F)?)*/gu
  );
  return matches?.length ? matches : [text.trim()];
}
