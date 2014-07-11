var Ns = require('..');
var test = require("tap").test;

test("make sure read is working", function (t) {
    var ns = new Ns('test.chr');
    t.ok(ns, "sprites should be something!");

    var expected = [ [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 1, 1, 1, 1, 1, 1, 1, 1 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ],
                     [ 3, 3, 3, 3, 3, 3, 3, 3 ] ];
    t.same(ns.get(0), expected, "Output from rip was not equal to expected output");
    t.end();
});
