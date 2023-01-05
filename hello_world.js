"use strict";
let idObject = { id: 2 };
// weak type == interface with only optional fields
// [x] in operator - check property in interface
if ('id' in idObject)
    console.log(idObject);
function getProperty(property, person) {
    console.log(`${property} = ${person[property]}`);
}
getProperty("id", { id: 1, name: "firstName" });
getProperty("name", { id: 2, name: "secondName" });
function printClass(a) {
    a.print();
}
class SimplerClass {
    two;
}
class SimpleClass extends SimplerClass {
    one; // since no constructor
    print() {
        console.log(`one=${this.one}`);
        console.log(`two=${this.two}`);
    }
}
class DuckClass {
    // doesn't implement IPrint
    // but duck typing makes it work
    print() {
        console.log("quacks like a duck");
        return "";
    }
}
let myInstance = new SimpleClass();
myInstance.one = 1;
printClass(myInstance);
let myDuck = new DuckClass();
printClass(myDuck);
// [x] constructors
//# sourceMappingURL=hello_world.js.map