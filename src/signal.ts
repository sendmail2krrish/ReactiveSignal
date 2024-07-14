import { contextStack, Effect, subscribe } from "./utils";

export type Signal<T> = {
  value: T;
};

export function createSignal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const subscribers = new Set<Effect>();

  const signal = new Proxy(
    { value: initialValue },
    {
      get(target, prop, receiver) {
        if (prop === "value") {
          const currentExecution = contextStack[contextStack.length - 1];
          if (currentExecution) subscribe(currentExecution, subscribers);
          return Reflect.get(target, prop, receiver);
        }
        return undefined;
      },
      set(target, prop, newValue, receiver) {
        if (prop === "value") {
          if (value !== newValue) {
            value = newValue;
            target[prop] = newValue;
            for (const subscriber of [...subscribers]) {
              subscriber.execute();
            }
          }
          return true;
        }
        return false;
      },
    }
  );

  return signal;
}
