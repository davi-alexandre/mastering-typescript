"use strict";
// [x] EXPLICIT CASTING (with inferred typing?)
var item1 = { id: 1, name: "item1" };
item1 = { id: 2 };
// [x] LET: vê escopo
// var: não vê escopo => deve ser evitada
var one = 1;
let two = 2;
if (one == 1 && two == 2) {
    var one = 0;
    let two = 0;
    console.log(`${one}, ${two}`);
}
console.log(`${one}, ${two}`);
// [x] UNION TYPES
function printObject(obj) {
    console.log(obj);
}
printObject(1);
printObject("string value");
// [x] TYPE GUARDS === type check
function addWithUnion(arg1, arg2) {
    // ERROR: arg1 + arg2;
    if (typeof arg1 === "number" && typeof arg2 === "number") {
        return arg1 + arg2;
    }
    return arg1.toString() + arg2.toString();
}
addWithUnion(1, 2);
(arg) => { console.log(typeof arg); };
// PRIMITIVES
// for no defined value
undefined; // aparece quando ex.: delete array[0];
// for no value - the defined value of none
null;
// [x] TERNARY OPERATOR / conditional expressions
(1 + 2 == 2) ? 'yes' : 'no';
// [x] CHECK NESTING
function printNestedObject(obj) {
    if (obj != undefined &&
        obj.nestedProperty != undefined &&
        obj.nestedProperty.name)
        console.log(`name = ${obj.nestedProperty.name}`);
    else
        console.log('name not found or undefined');
}
printNestedObject({});
let a = printNestedObject?.name;
a = (printNestedObject.name === null ? null : printNestedObject.name);
// com undefined também (por isso null-ish)
function printNestedOptionalChain(obj) {
    if (obj?.nestedProperty?.name)
        console.log(`name = ${obj.nestedProperty.name}`);
    else
        console.log(`name not found or undefined`);
}
// [x] NULLISH COALESCING OPERATOR
let b = 42;
console.log(b ?? 'undefined or null');
// DEFINITE ASSIGNMENT ASSERTION == pode usar sem dar valor (não use)
let globalString;
// [x] OBJECT (residual / JSON) type
let structuredObject = {
    name: "myObject",
    properties: { id: 1, type: "AnObject" },
};
console.log(JSON.stringify(structuredObject));
// a string, and other primitives, is not an object
// [x] UNKNOWN (type-safe <any>)
// assign it to known types <=> explicit casting
let u = "an unknown";
u = 1;
let aNumber2;
aNumber2 = u; // since u can be any type
// NEVER
// atribui qualquer tipo quando a declaração é inalcançável
function alwaysThrows() {
    throw new Error("this will always throw");
    // return -1;  ->  -1 not assignable to 'never'
}
var AnEnum;
(function (AnEnum) {
    AnEnum[AnEnum["FIRST"] = 0] = "FIRST";
    AnEnum[AnEnum["SECOND"] = 1] = "SECOND";
})(AnEnum || (AnEnum = {}));
function getEnumValue(enumValue) {
    switch (enumValue) {
        case AnEnum.FIRST:
            return "First Case";
        case AnEnum.SECOND:
            return "Second Case";
    }
    // só pode atribuir quando é inalcançável
    let returnValue = enumValue;
    return returnValue;
}
// [x] OBJECT SPREAD (+ array,tuple spread)
let firstObj = { id: 1, name: "firstObj" };
let secondObj = { value: "on", ...firstObj };
console.log(`secondObj : ${JSON.stringify(secondObj)}`);
// [x] TUPLE (mutable, fixed)
let tuple; // optional boolean element
tuple = ["msg", true];
tuple = ["optional"];
let [first, second] = tuple; // unpacking, DESTRUCTURING
// mutable, variable-sized
let variableTuple;
variableTuple = [1];
variableTuple = [1, "string1"];
variableTuple = [1, "string1", "string2"];
// [x] OBJECT DESTRUCTURING (unpacking)
let complexObject = {
    num: 1,
    str: "name",
    bool: true
};
var { num, str, bool } = complexObject;
var { num: numero, // renaming
str: msg, bool: booleano, } = complexObject;
console.log(num, numero);
// FUNCTIONS
// [x] default and optional parameters
function concatValues(a = "default", b) {
    // concatValues("third") -> thirdundefined
    console.log(`a + b = ${a + b}`);
}
// [x] rest syntax for arbitrary number of parameters
function restArguments(...args) {
    for (let i in args)
        console.log(`args[${i}] = ${args[i]}`);
}
restArguments("davi", "alexandre");
// [x] callback functions and function signatures as parameters to ensure the argument is of the expected function type
let callback = function (text) {
    console.log(text);
};
function withCallback(message, callbackFn) {
    console.log(message);
    callbackFn("callback msg");
}
withCallback("func withCallback", callback);
function add(a, b) {
    return a + b;
}
add("first", "second");
add(1, 2);
function withLiteral(input) {
    console.log(`called with : ${input}`);
}
withLiteral("two");
withLiteral(65535);
// withLiteral("four");
// withLiteral(2);
//# sourceMappingURL=2.js.map