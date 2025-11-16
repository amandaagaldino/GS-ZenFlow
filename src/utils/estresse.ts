/**
 * Retorna o emoji correspondente ao nível de estresse
 * @param level - Nível de estresse (1-5)
 * @returns Emoji correspondente
 */
export function getEmojiForLevel(level: number): string {
  const emojis = ['😊', '🙂', '😐', '😟', '😰'];
  return emojis[level - 1];
}

/**
 * Retorna a cor correspondente ao nível de estresse
 * @param level - Nível de estresse (1-5)
 * @returns Cor em hexadecimal
 */
export function getColorForLevel(level: number): string {
  const colors = [
    '#4CAF50', // Verde - Nível 1
    '#8BC34A', // Verde claro - Nível 2
    '#FFC107', // Amarelo - Nível 3
    '#FF9800', // Laranja - Nível 4
    '#F44336', // Vermelho - Nível 5
  ];
  return colors[level - 1];
}

