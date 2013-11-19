var neslySprite = require('../');
var test = require("tap").test;

test("make sure rip is working", function (t) {
    var sprites = neslySprite.rip('test.chr');
    t.ok(sprites, "sprites should be something!");

    var expected = [ [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ] ];
    t.same(neslySprite.get(0, sprites), expected, "Output from rip was not equal to expected output");
    t.end();
});
