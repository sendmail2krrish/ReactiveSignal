ReactiveSignal with React

# ReactiveSignal with React

A lightweight reactive library for managing state and effects in React applications using JavaScript/TypeScript.

## Table of Contents

- [Installation](#installation)
- [Usage in React](#usage-in-react)
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

## Usage in React

### Creating Signals

Signals are used to create reactive state variables.

```
import React from 'react';
import { createSignal } from 'reactivesignal';

function Counter() {
  const count = createSignal(0);

  return (

      Count: {count.value}
       count.value++}>Increment

  );
}

export default Counter;
```

### Creating Effects

Effects are functions that run whenever the signals they depend on change.

```
import React, { useEffect } from 'react';
import { createSignal, createEffect } from 'reactivesignal';

function CounterWithEffect() {
  const count = createSignal(0);

  useEffect(() => {
    createEffect(() => {
      console.log(`Count changed to: ${count.value}`);
    });
  }, [count]);

  return (

      Count: {count.value}
       count.value++}>Increment

  );
}

export default CounterWithEffect;
```

### Creating Memos

Memos are used to create derived state that automatically updates when its dependencies change.

```
import React from 'react';
import { createSignal, createMemo } from 'reactivesignal';

function CounterWithMemo() {
  const count = createSignal(0);
  const doubleCount = createMemo(() => count.value * 2);

  return (

      Count: {count.value}
      Double Count: {doubleCount.value}
       count.value++}>Increment

  );
}

export default CounterWithMemo;
```

### Batching Updates

Batching allows you to group multiple state updates into a single re-render for better performance.

```
import React from 'react';
import { createSignal, batch } from 'reactivesignal';

function BatchingExample() {
  const count = createSignal(0);

  const handleBatchUpdate = () => {
    batch(() => {
      count.value = 1;
      count.value = 2;
      count.value = 3;
    });
  };

  return (

      Count: {count.value}
      Batch Update

  );
}

export default BatchingExample;
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
