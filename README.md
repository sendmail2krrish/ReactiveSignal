ReactiveSignal Documentation

# ReactiveSignal

A lightweight reactive library for managing state and effects in JavaScript/TypeScript applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating Signals](#creating-signals)
  - [Creating Effects](#creating-effects)
  - [Creating Memos](#creating-memos)
  - [Batching Updates](#batching-updates)
- [API](#api)
  - [createSignal](#createsignal)
  - [createEffect](#createeffect)
  - [createMemo](#creatememo)
  - [batch](#batch)
- [License](#license)

## Installation

To install ReactiveSignal, you can use npm or yarn:

```
npm install reactivesignal.ts
```

or

```
yarn add reactivesignal.ts
```

## Usage

### Creating Signals

Signals are used to create reactive state variables.

```
import { createSignal } from 'reactivesignal';

const count = createSignal(0);

console.log(count.value); // 0
count.value = 1;
console.log(count.value); // 1
```

### Creating Effects

Effects are functions that run whenever the signals they depend on change.

```
import { createSignal, createEffect } from 'reactivesignal';

const count = createSignal(0);

createEffect(() => {
  console.log(`Count changed to: ${count.value}`);
});

count.value = 1; // Logs: Count changed to: 1
```

### Creating Memos

Memos are used to create derived state that automatically updates when its dependencies change.

```
import { createSignal, createMemo } from 'reactivesignal';

const count = createSignal(0);
const doubleCount = createMemo(() => count.value * 2);

console.log(doubleCount.value); // 0
count.value = 2;
console.log(doubleCount.value); // 4
```

### Batching Updates

Batching allows you to group multiple state updates into a single re-render for better performance.

```
import { createSignal, batch } from 'reactivesignal';

const count = createSignal(0);

batch(() => {
  count.value = 1;
  count.value = 2;
  count.value = 3;
});

console.log(count.value); // 3
```

## API

### createSignal

Creates a reactive state variable.

```
function createSignal<T>(initialValue: T): { value: T };
```

- `initialValue`: The initial value of the signal.
- Returns an object with a `value` property for the signal.

### createEffect

Creates an effect that runs whenever the signals it depends on change.

```
function createEffect(effectFunction: () => void): void;
```

- `effectFunction`: The function to run when the signals it depends on change.

### createMemo

Creates a memoized value that updates automatically when its dependencies change.

```
function createMemo<T>(computationFunction: () => T): { value: T };
```

- `computationFunction`: The function to compute the memoized value.
- Returns an object with a `value` property for the memoized value.

### batch

Groups multiple state updates into a single re-render for better performance.

```
function batch(fn: () => void): void;
```

- `fn`: The function containing the state updates to batch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
