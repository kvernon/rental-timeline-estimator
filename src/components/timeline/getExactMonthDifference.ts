export function getExactMonthDifference(availableEndDate: Date, availableStartDate: Date) {
  let months = (availableEndDate.getFullYear() - availableStartDate.getFullYear()) * 12 + availableEndDate.getMonth() - availableStartDate.getMonth();
  if (availableEndDate.getDate() < availableStartDate.getDate()) {
    months--;
  }
  return months;
}
