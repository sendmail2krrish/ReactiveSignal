import { createEffect } from "./effect";
import { createSignal, Signal } from "./signal";

export function createMemo<T>(computationFunction: () => T): Signal<T> {
  const signal = createSignal<T>(computationFunction());
  createEffect(() => (signal.value = computationFunction()));
  return signal;
}
