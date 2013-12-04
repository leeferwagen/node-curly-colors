var slice = Array.prototype.slice;
var format = require('util').format;

var colors = {
  //styles
  'bold':      ['\x1b[1m', '\x1b[22m'],
  'italic':    ['\x1b[3m', '\x1b[23m'],
  'underline': ['\x1b[4m', '\x1b[24m'],
  'blink':     ['\x1b[5m', '\x1b[25m'],
  'inverse':   ['\x1b[7m', '\x1b[27m'],
  //colors
  'black':     ['\x1b[30m', '\x1b[39m'],
  'red':       ['\x1b[31m', '\x1b[39m'],
  'green':     ['\x1b[32m', '\x1b[39m'],
  'yellow':    ['\x1b[33m', '\x1b[39m'],
  'blue':      ['\x1b[34m', '\x1b[39m'],
  'magenta':   ['\x1b[35m', '\x1b[39m'],
  'cyan':      ['\x1b[36m', '\x1b[39m'],
  'white':     ['\x1b[37m', '\x1b[39m'],
  'grey':      ['\x1b[90m', '\x1b[39m'],
};

var rx = new RegExp('<(?:\\{(' + Object.keys(colors).join('|') + ')|\\})>', 'gi');



/**
 * curlyColors ( str: String [, arg1: Any [, ... ]] ): String
 */
function curlyColors(str) {
  var res = '';
  var esc;
  var match;
  var history = [];
  var lastIndex = 0;

  if (arguments.length >= 2) str = format.apply(null, slice.apply(arguments));

  while ((match = rx.exec(str)) !== null) {
    res += str.slice(lastIndex, match.index);
    if (match[1]) {
      // Opening tag found.
      // Append the starting escape string sequence.
      esc = colors[match[1]];
      history.push(esc);
      res += esc[0];
    } else if (history.length) {
      // Closing tag found.
      // Append the closing escape string sequence of the current color.
      res += history.pop()[1];
      if (history.length) {
        // Continue with previous starting escape string sequence.
        res += history[history.length - 1][0];
      }
    }
    lastIndex = match.index + match[0].length;
  }

  // Append the remaining string to the result string.
  res += str.slice(lastIndex);

  // Close all remaining tags.
  while (history.length) res += history.pop()[1];

  // Delete double occurrences of color sequences.
  res = res.replace(/(\x1b\[\d+m)\1{1,}/g, '$1');

  return res;
}

exports = module.exports = curlyColors;
