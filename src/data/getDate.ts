export function getDate(date: Date): string {
  return date.toLocaleDateString('en-ca', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
