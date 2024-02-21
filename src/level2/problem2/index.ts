export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  const flattenedLogs = args.flat().sort((a, b) => a[0].getTime() - b[0].getTime());

  const mergedLogs: DowntimeLogs = [];
  let currentLog: [Date, Date] | undefined = flattenedLogs[0];

  for (const nextLog of flattenedLogs.slice(1)) {
    if (currentLog![1].getTime() >= nextLog[0].getTime()) {
      // Merge overlapping downtime periods
      currentLog![1] = new Date(Math.max(currentLog![1].getTime(), nextLog[1].getTime()));
    } else {
      // Add non-overlapping downtime periods to the merged logs
      mergedLogs.push(currentLog as [Date, Date]);
      currentLog = nextLog;
    }
  }

  if (currentLog) {
    mergedLogs.push(currentLog);
  }

  return mergedLogs;
}




