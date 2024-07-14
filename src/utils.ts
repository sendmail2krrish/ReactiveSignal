export type Effect = {
  execute: () => void;
  dependencies: Set<Set<Effect>>;
};

export const contextStack: Array<Effect> = [];

export function subscribe(
  currentExecution: Effect,
  subscriptionSet: Set<Effect>
) {
  subscriptionSet.add(currentExecution);
  currentExecution.dependencies.add(subscriptionSet);
}

export function clearDependencies(execution: Effect): void {
  for (const dependency of execution.dependencies) {
    dependency.delete(execution);
  }
  execution.dependencies.clear();
}
