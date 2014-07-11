var fs = require('fs');

function Chr(file) {
    this.sprites = load(read(file));
}

function read(file) {
    return fs.readFileSync(file, 'binary');
}

function load(chr) {
    var chrSize = chr.length;
    var sprites = [];

    for (var i = 0; i < chrSize; i++) {
        sprites.push(chr.charCodeAt(i) && 0xFF);
    }

    return sprites;
}

Chr.prototype.decode = function decode(channelA, channelB) {
    var sprite = [];
    var a, b, line, bit, pixel;

    for (var y = 0; y <8; y++) {
        a = channelA[y];
        b = channelB[y];
        line = [];
        for (var x=0; x <8; x++) {
            bit = Math.pow(2,7-x);
            pixel = -1;
            if (!(a & bit) && !(b & bit)) {
                pixel = 0;
            } else if ((a & bit) && !(b & bit)) {
                pixel = 1;
            } else if (!(a & bit) && (b & bit)) {
                pixel = 2;
            } else if ((a & bit) && (b & bit)) {
                pixel = 3;
            }
            line.push(pixel);
        }
        sprite.push(line);
    }
    return sprite;
}

Chr.prototype.get = function get(index) {
    var a = index * 16;
    var b = a + 8;
    var c = b + 8;
    var channelA = this.sprites.slice(a, b);
    var channelB = this.sprites.slice(b, c);

    return this.decode(channelA, channelB);
}

Chr.prototype.put = function put(index, sprite) {
    var start = index * 16;
    var encoded = this.encode(sprite);

    for (var i = start, var j = 0; i < (start + 16); i++, j++){
        this.sprites[i] = encoded[j];
    }
    return this.sprites;
}

Chr.prototype.encode = function encode(sprite) {
    var channelA = [];
    var channelB = [];

    var a, b, pixel, bit;

    for (var y = 0; y < 8; y++){
        a = 0;
        b = 0;
        for (var x = 0; x < 8; x++){
            pixel = sprite[y][x];
            bit = Math.pow(2,7-x);
            switch(pixel){
                case 1:
                    a = a | bit;
                    break;
                case 2:
                    b = b | bit;
                    break;
                case 3:
                    a = a | bit;
                    b = b | bit;
                    break;
            }
        }
        channelA.push(a);
        channelB.push(b);
    }
    return channelA.concat(channelB);
}

module.exports = Chr;
