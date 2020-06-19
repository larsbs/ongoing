# Ongoing

A simple ascii progress bar renderer. It doesn't take care of printing the progress bar to the terminal, so that has to be done using other tools.

## Installation

```bash
npm i ongoing
```

## Example

```ts
import { ProgressBar } from 'ongoing';

const bar = new ProgressBar(':message :bar :percent');

console.log(bar.update(0.2, { message: 'Hello' }));
console.log(bar.tick(1, { message: 'World' }));
```

## Features

 - Custom tokens
 - Update the bar to a specific value
 - Tick the bar based on a delta

## Default tokens

 - `:current`: Displays the current value
 - `:total`: Displays the total value
 - `:percent`: Displays the current percentage
 - `:bar`: Displays the bar (required)

## Options

A second argument can be passed when instantiating the bar. The following options are supported:

 - `total`: Indicates the maximum value of the progress bar
 - `width`: Indicates the width in characters of the progress bar
 - `completedChar`: Indicates the character to use to darw the completed section
 - `incompletedChar`: Indicates the character to use to draw the incompleted section
 - `headChar`: Indicates a character to draw as the head of the completed section

### Default values

```ts
const bar = new ProgressBar(':bar', {
  total: 100,
  width: 30,
  completedChar: '=',
  incompletedChar: '-',
  headChar: '=',
});
```

## License

[MIT](LICENSE)
