var Ns = require('../');
var ns = new Ns('mario.chr');
console.log(ns.get(0));
console.log(ns.get(0));
console.log(ns.get(2));
ns.put(0, [ [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                     [ 0, 0, 0, 0, 0, 0, 0, 0 ] ]);

console.log(ns.get(0));

