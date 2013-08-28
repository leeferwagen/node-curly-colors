/**
 * Module dependencies.
 */
var _ = require('underscore');

// shortcuts
var slice = Array.prototype.slice;
var format = require('util').format;

// ANSI codes
var ANSI = {

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
  'grey':      ['\x1b[90m', '\x1b[39m']

};

// Predefined formats
var DEFAULT    = '<{@CODE>@TEXT<}>';
var SGML       = '<@CODE>@TEXT</@CODE>';
var COLORIZE   = '#@CODE[@TEXT]';
var COLOR_TMPL = '{@CODE}@TEXT{/@CODE}';
var STY        = '#{@CODE: @TEXT}';

var ccTag = DEFAULT;

/**
 * Return the ANSI code for `key`.
 * @param  {string} key The verbose representation of the ANSI code
 *                      as defined in the ANSI array
 * @return {string}     the ANSI code string
 */
var ansiCode = function(key) {
  if (key && _.has(ANSI, key)) {
    return ANSI[key];
  }

  return undefined;
};

/**
 * Returns a new string with all matches of `pat` replaced by `sub`.
 * @param  {string} str The string to perform the replacement on.
 * @param  {string} pat The search pattern
 * @param  {string} sub The replacment string
 * @return {string}     the new string
 */
var replaceAll = function(str, pat, sub) {
  return str.replace(new RegExp(regify(pat), 'g'), sub);
}

var regify = function(str) {
  return '(' + str
    .replace(/\\/g, '\\\\')

    .replace(/\^/g, '\\^')
    .replace(/\$/g, '\\$')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\?/g, '\\?')
    .replace(/\./g, '\\.')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')

    .replace(/\//g, '\\/')

    .replace(/@CODE/,  '(\\w+)')
    .replace(/@CODE/g, '\\3')

    .replace(/@TEXT/,  ')(.*?)(')
    .replace(/@TEXT/g, '\\4')
    + ')';
};

/**
 * Replace all matches of `re` with their corresponding ANSI code.
 * @param  {RegEx}  re  The RegEx of the ANSI representation
 * @param  {string} str The string to perform the replacement on.
 * @return {Array}      An array where index 0 is the replaced string
 *                                 and index 1 is the ANSI closing code
 */
var colorize = function(re, str) {
  var m = re.exec(str);

  if (m) {
    var match  = m[0];
    var prefix = m[1];
    var start  = m[2];
    var code   = m[3];
    var text   = m[4];
    var close  = m[5];
    var suffix = m[6];

    var cc = ansiCode(code);

    if (cc) {
      var aa = cc[0];
      var oo = cc[1];1
      var rs = [prefix, aa, replaceAll(text, oo, aa), oo, suffix].join('');

      return [colorize(re, rs)[0], close, oo];
    }
  }

  return [str, '', ''];
};

/**
 * Replace all ANSI encodings with the real ANSI codes. Uses the currently set format
 * to find all ANSI encodings.
 * @param  {string} str The string to perform the replacement on.
 * @return {string}     The string with ANSI codes
 */
var curlyColors = function(str) {
  var ts = regify(ccTag);
  var rs =format('(.*)%s(.*)', ts);
  var re = new RegExp(rs);

  var retVal = [str, ''];

  while(re.test(retVal[0])) {
    retVal    = colorize(re, retVal[0]);
    retVal[0] = replaceAll(retVal[0], retVal[1], retVal[2]);
  }

  var args = _.toArray(arguments);

  args.shift();

  return format.apply(null, _.flatten([retVal[0], args]));
};

/**
 * Set the format for ANSI encodings.
 * Use @CODE for a placeholder where you can enter supported ANSI codes.
 * Use @TEXT for text embedded between the ANSI opening and closing.
 * @param {string} tag The ANSI encoding format
 */
var setFormat = function(tag) {
  ccTag = tag || CURLY;
};

exports            = module.exports           = curlyColors;
exports.setFormat  = module.exports.setFormat = setFormat;
exports.DEFAULT    = module.exports.DEFAULT   = DEFAULT;
exports.SGML       = module.exports.SGML      = SGML;
exports.COLORIZE   = module.exports.COLORIZE  = COLORIZE;
exports.COLOR_TMPL = module.exports.COLOR_TMPL = COLOR_TMPL;
exports.STY        = module.exports.STY       = STY;
