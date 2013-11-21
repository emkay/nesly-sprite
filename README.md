nesly-sprite
============

Rip the sprite data out of a NES CHR file

[![build status](https://secure.travis-ci.org/emkay/nesly-sprite.png)](http://travis-ci.org/emkay/nesly-sprite)

Example:

```
var neslySprite = require('nesly-sprite');
var sprites = neslySprite.rip('mario.chr');

var spriteData = neslySprite.get(0, sprites);
```
