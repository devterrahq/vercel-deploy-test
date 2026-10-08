export function CalcTwoColumnWidths(width: string | undefined): Array<number> {
  let col1 = parseInt(width || '6');
  col1 = minmax(col1, 0, 12);
  let col2 = 12 - col1;
  col2 = minmax(col2, 0, 12);
  return [col1, col2];
}

export function minmax(num: number, min: number, max: number) {
  if (num < min) {
    return min;
  } else if (num > max) {
    return max;
  }
  return num;
}
