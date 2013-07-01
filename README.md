# node-curly-colors

Simplifies the working with console colors in Node.js

## Installation

    $ npm install curly-colors

## How to include

```js
    var cc = require('curly-colors');
```

## Available Color

- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `grey`

## Available Styles

- `bold` for bold size text
- `italic` for italic text
- `underline` for underlined text
- `blink` for blinking text
- `inverse` to inverse the colors

## Examples

### Simple colors

```js
    console.log(cc('<{red>red text<}>'));
```

### Multiple colors

```js
    console.log(cc('<{red>red text<}> <{green>green text<}>'));
```

### Nested colors

```js
    console.log(cc('<{red>red text <{green>green text<}> red text<}>'));
    console.log(cc('<{red>red <{green>green <{bold>bold green<}> green<}> red<}>'));
```

### And the final console output looks like this
![Console Screenshot](http://i.imgur.com/5p2AhjL.png)
