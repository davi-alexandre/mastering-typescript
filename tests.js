"use strict";
// XXX MAPPED TYPES: type alias + generics
let ab = { a: 1, b: "test" };
// can only have properties in WeakInterface
let allOptional = {};
let partial = {}; // [x]
let required = { a: 1, b: '2' }; // [x]
let readonly = { a: 1, b: '2' }; // [x]
let recordedCdVar = { c: 1, d: 1 };
function logNumberOrString(input) {
    console.log(`logNumberOrString : ${input}`);
}
logNumberOrString(1);
logNumberOrString("test");
logNumberOrString("boolean does not extend number");
//# sourceMappingURL=tests.js.map