let batchDepth = 0;
const batchQueue: Array<() => void> = [];

export function batch(fn: () => void): void {
  batchDepth++;
  try {
    fn();
  } finally {
    batchDepth--;
    if (batchDepth === 0) {
      while (batchQueue.length) {
        batchQueue.shift()?.();
      }
    }
  }
}

export function scheduleUpdate(fn: () => void): void {
  if (batchDepth > 0) {
    batchQueue.push(fn);
  } else {
    fn();
  }
}
