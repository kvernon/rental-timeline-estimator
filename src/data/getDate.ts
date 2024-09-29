export function getDate(date: Date): string {
  const monthZeroBased = date.getMonth();
  return date.getFullYear() + '-' + (monthZeroBased + 1) + '-' + date.getDate();
}
