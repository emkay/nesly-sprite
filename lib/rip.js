/**
Copyright (c) 2012, Gustavo Maia Neto (Guto Maia)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the <organization> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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

module.exports.get = get;
module.exports.rip = rip;
