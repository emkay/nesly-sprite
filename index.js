var fs = require('fs');

function rip(file) {
    var sprites = [];
    var chr = fs.readFileSync(file, 'binary');

    var chrSize = chr.length;

    for (var i =0; i < chrSize; i++) {
        sprites.push(chr.charCodeAt(i) && 0xFF);
    }

    return sprites;
}

function decode(channelA, channelB) {
    var sprite = [];
    for (var y=0; y <8; y++) {
        var a = channelA[y];
        var b = channelB[y];
        var line = [];
        for (var x=0; x <8; x++) {
            var bit = Math.pow(2,7-x);
            var pixel = -1;
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
    var encoded = this.encode_sprite(spr);
    for (var i=start, j=0; i < (start + 16); i++, j++){
        sprites[i] = encoded[j];
    }
    return sprites;
}

function encode(sprite) {
    var channelA = [];
    var channelB = [];
    for (var y=0; y <8; y++){
        var a = 0;
        var b = 0;
        for (var x=0; x < 8; x++){
            var pixel = spr[y][x];
            var bit = Math.pow(2,7-x);
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

module.exports.get = get;
module.exports.put = put;
module.exports.rip = rip;
