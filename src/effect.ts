import { clearDependencies, contextStack, Effect } from "./utils";

export function createEffect(effectFunction: () => void): void {
  const effect: Effect = {
    execute() {
      clearDependencies(effect);
      contextStack.push(effect);
      try {
        effectFunction();
      } catch (error) {
        console.error("Error executing effect:", error);
      } finally {
        contextStack.pop();
      }
    },
    dependencies: new Set(),
  };

  effect.execute();
}
