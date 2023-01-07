"use strict";
function printGeneric(a, b) {
    console.log(`typeof a is : ${typeof a}`);
    console.log(`typeof b is : ${typeof b}`);
}
printGeneric(1, "string");
printGeneric("hey", true);
printGeneric(() => { }, 0);
printGeneric({ id: 1 }, false);
// XXX generics type CONSTRAINTS
class Concatenator {
    concatenateArray(items) {
        let returnString = "";
        for (let i = 0; i < items.length; i++) {
            returnString += i > 0 ? "," : "";
            returnString += items[i].toString();
        }
        return returnString;
    }
}
let concator = new Concatenator();
concator.concatenateArray(["first", "second", "third"]);
concator.concatenateArray([1000, 2000, 3000]);
function useT(item) {
    item.print();
    // item.id = 1;
    // item.name = "test";
}
function printProperty(object, key) {
    let propertyValue = object[key];
    console.log(`object[${String(key)}] = ${propertyValue}`);
}
let obj3 = {
    id: 1,
    name: "myName",
    print() {
        console.log(`${this.id}`);
    },
};
printProperty(obj3, "id");
printProperty(obj3, "name");
class LogClass {
    logToConsole(iPrintObj) {
        iPrintObj.print();
    }
}
let printedObject = {
    print() {
        console.log("printedObject.print() called");
    },
};
let logClass = new LogClass();
logClass.logToConsole(printedObject);
// [x] generic class factories
class ClassA {
}
class ClassB {
}
function createClassInstance(arg1 // anonymous type whose new() returns type T
) {
    return new arg1();
}
let classAInstance = createClassInstance(ClassA);
let ab = { a: 1, b: "test" };
// can only have properties in WeakInterface
let allOptional = {};
let partial = {}; // [x]
let required = { a: 1, b: '2' }; // [x]
let readonly = { a: 1, b: '2' }; // [x]
let recordedCdVar = { c: 1, d: 1 };
function logNumberOrString(input) { }
logNumberOrString(1);
logNumberOrString("test");
logNumberOrString("boolean does not extend number"); //=> type == string
// • If the input parameter is of type Date, then the compareTo parameter may only be of type Date.
// • If the input parameter is of type number, then the compareTo parameter may be either a Date or a number.
// • If the input parameter is of type string, then the compareTo parameter may be either a Date or a number or a string.
// • If the input parameter is not of type Date or number or string, then do not allow this function to be called
function compareDates(input, compareTo) { }
function testInferFromPropertyType(arg) { }
testInferFromPropertyType("test");
testInferFromPropertyType(1);
function testInferredFromFnParam(arg) { }
testInferredFromFnParam(1);
testInferredFromFnParam("test");
let boolValue = true;
let stringValue = "test";
let numValue = 1;
//# sourceMappingURL=4.js.map