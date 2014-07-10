function read(file) {
    var fs = require('fs');
    var chr = fs.readFileSync(file, 'binary');

    return load(chr);
}

function load(chr) {
    var chrSize = chr.length;
    var sprites = [];

    for (var i =0; i < chrSize; i++) {
        sprites.push(chr.charCodeAt(i) && 0xFF);
    }

    return sprites;
}

function decode(channelA, channelB) {
    var sprite = [];
    var a, b, line, bit, pixel, y;

    for (y=0; y <8; y++) {
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

function get(index, sprites) {
    var a = index * 16;
    var b = a + 8;
    var c = b + 8;
    var channelA = sprites.slice(a, b);
    var channelB = sprites.slice(b, c);

    return decode(channelA, channelB);
}

function put(index, sprites, sprite) {
    var start = index * 16;
    var encoded = this.encode(spr);
    var i, j;

    for (i=start, j=0; i < (start + 16); i++, j++){
        sprites[i] = encoded[j];
    }
    return sprites;
}

function encode(sprite) {
    var channelA = [];
    var channelB = [];

    var a, b, pixel, bit, x, y;

    for (y=0; y <8; y++){
        a = 0;
        b = 0;
        for (x=0; x < 8; x++){
            pixel = spr[y][x];
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

module.exports.load = load;
module.exports.get = get;
module.exports.put = put;
module.exports.read = read;
