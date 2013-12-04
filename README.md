# node-curly-colors

Simplifies the working with console colors in Node.js

## Installation

    $ npm install curly-colors

## How to include

```js
    var cc = require('curly-colors');
```

## Available Colors

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

### 

### The final console output looks like this
![Console Screenshot](http://i.imgur.com/5p2AhjL.png)

### printf-style usage
This should be used when performance is important.

```js
    var fs = require('fs');
    var cc = require('curly-colors');

    var dir = './';
    var format = cc('<{yellow>%d<}> <{magenta>%s<}>');

    fs.readdirSync(dir).forEach(function(filename) {
        var stat = fs.lstatSync(filename);
        console.log(format, stat.size, filename);
    });
```

If you need you can also pass the parameters directly to curly-colors

```js
    var result = cc("You're using <{blue>Node<}> <{magenta>%s<}>", process.version);
    console.log(result);
```
