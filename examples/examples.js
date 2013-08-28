#!/usr/bin/env node

var _  = require('underscore');
var cc = require('../lib/curly-colors');

var print = function(fmt) {
  console.log('-------------------------------------------------------------------------------------');
  console.log([fmt.replace('%', '%%')]);
  console.log([cc.apply(null, _.toArray(arguments))]);
  console.log('[', cc.apply(null, _.toArray(arguments)), ']');
}

console.log('DEFAULT:');
print('<{red>foo<}>');
print('<{red>%s<}>', 'foo');
print('default <{red>foo<}> default');
print('default <{red>%s<}> default', 'foo');
print('default <{red>foo<}> default <{green>bar<}> default');
print('default <{red>%s<}> default <{green>%s<}> default', 'foo', 'bar');
print('<{green>green <{yellow>yellow<}> green <{magenta>magenta<}> green<}>');
print('<{bold>bold <{yellow>yellow<}> bold <{magenta>magenta<}> bold<}>');

console.log();
console.log('SGML:');
cc.setFormat(cc.SGML);
print('<red>foo</red>');
print('default <red>foo</red> default');
print('default <red>foo</red> default <green>bar</green> default');
print('<green>green <yellow>yellow</yellow> green <magenta>magenta</magenta> green</green>');
print('<bold>bold <yellow>yellow</yellow> bold <magenta>magenta</magenta> bold</bold>');

console.log();
console.log('COLORIZE:');
cc.setFormat(cc.COLORIZE);
print('#red[foo]');
print('default #red[foo] default');
print('default #red[foo] default #green[bar] default');
print('#green[green #yellow[yellow] green #magenta[magenta] green]');
print('#bold[bold #yellow[yellow] bold #magenta[magenta] bold]');

console.log();
console.log('COLOR_TMPL:');
cc.setFormat(cc.COLOR_TMPL);
print('{red}foo{/red}');
print('default {red}foo{/red} default');
print('default {red}foo{/red} default {green}bar{/green} default');
print('{green}green {yellow}yellow{/yellow} green {magenta}magenta{/magenta} green{/green}');
print('{bold}bold {yellow}yellow{/yellow} bold {magenta}magenta{/magenta} bold{/bold}');

console.log();
console.log('STY:');
cc.setFormat(cc.STY);
print('#{red: foo}');
print('default #{red: foo} default');
print('default #{red: foo} default #{green: bar} default');
print('#{green: green #{yellow: yellow} green #{magenta: magenta} green}');
print('#{bold: bold #{yellow: yellow} bold #{magenta: magenta} bold}');
