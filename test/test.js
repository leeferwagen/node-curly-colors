var cc     = require('..');
var assert = require('assert');

describe('curly-colors', function() {

  describe('Simple colors (not nested)', function() {

    it('should return only red', function() {
      assert.equal('\u001b[31mfoo\u001b[39m', cc('<{red>foo<}>'));
      assert.equal('\u001b[31mfoo\u001b[39m', cc('<{red>%s<}>', 'foo'));
    });

    it('should return a string containing red', function() {
      assert.equal('default \u001b[31mfoo\u001b[39m default',
                   cc('default <{red>foo<}> default'));
      assert.equal('default \u001b[31mfoo\u001b[39m default',
                   cc('default <{red>%s<}> default', 'foo'));
    });

    it('should return a string containing red and green', function() {
      assert.equal('default \u001b[31mfoo\u001b[39m default \u001b[32mbar\u001b[39m default',
                   cc('default <{red>foo<}> default <{green>bar<}> default'));
      assert.equal('default \u001b[31mfoo\u001b[39m default \u001b[32mbar\u001b[39m default',
                   cc('default <{red>%s<}> default <{green>%s<}> default', 'foo', 'bar'));
    });

  });

  describe('Nested colors', function() {

    it('should return a string with yellow and magenta on green', function() {
      assert.equal('\u001b[32mgreen \u001b[33myellow\u001b[32m green \u001b[35mmagenta\u001b[32m green\u001b[39m',
                   cc('<{green>green <{yellow>yellow<}> green <{magenta>magenta<}> green<}>'));
    });

  });

  describe('Non-colors (underline, blink)', function() {

  });

  describe('Alternate formats', function() {

    // it('should return a string ')

  });

});
