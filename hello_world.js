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
//# sourceMappingURL=hello_world.js.map