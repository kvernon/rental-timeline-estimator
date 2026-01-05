export function getPaddedDateRange(currentDate: Date): [Date, Date] {
  const startEarly = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
  startEarly.setMonth(startEarly.getMonth() - 1);

  const endLate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
  endLate.setMonth(endLate.getMonth() + 1);

  return [startEarly, endLate];
}
