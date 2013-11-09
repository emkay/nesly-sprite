nesly-sprite
============

Rip the sprite data out of a NES CHR file

Example:

```
var neslySprite = require('nesly-sprite');
var sprites = neslySprite.rip('mario.chr');

var spriteData = neslySprite.get(0, sprites);
```
