"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
class WithConstructor {
    id;
    // [x] static
    static instanceCount = 0;
    static _addCount() {
        WithConstructor.instanceCount++;
    }
    // [x] field access modifiers: public, private, protected
    // public id: number;
    // constructor(id: number) {
    //     this.id = id;
    // }
    // readonly properties are only allowed to set within the constructor function
    name;
    // [x] get-set properties
    _property = 0;
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
    }
    // [x] constructors
    constructor(id) {
        this.id = id;
        WithConstructor._addCount();
        this.name = "none";
    }
}
let instance = new WithConstructor(10);
console.log(JSON.stringify(instance));
// [x] NAMESPACES
var FirstNameSpace;
(function (FirstNameSpace) {
    class NameSpaceClass {
    }
    FirstNameSpace.NameSpaceClass = NameSpaceClass;
    class NotExported {
    }
})(FirstNameSpace || (FirstNameSpace = {}));
let instance0 = new FirstNameSpace.NameSpaceClass();
// [x] object structure described by interface
let interfacedObject = {
    id: 1,
    name: "myName",
};
class BaseClass {
    id;
    // [x] protected = private + acessible to derived classes
    length = 23;
    name = "nameString";
    constructor(id) {
        this.id = id;
    }
    print(text) {
        console.log(`BaseClass.print() : ${text}`);
    }
}
class DerivedClass extends BaseClass {
    id;
    constructor(id) {
        // [x] super/base class
        super(id);
        this.id = id;
        this.name = "overrided name";
        super.length = 32;
    }
    // [x] function overriding
    print(text) {
        super.print(`${text}\n>>\t from DerivedClassFncallthrough`);
    }
}
let c = new DerivedClass(0);
c.print("13");
// [x] abstract class
// cannot be instantiated, only derivable
class EmployeeBase {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class OfficeWorker extends EmployeeBase {
    doWork() {
        console.log(`${this.name} is working`);
    }
}
class OfficeManager extends OfficeWorker {
    employees = [];
    manageEmployees() {
        super.doWork();
        for (let employee of this.employees) {
            employee.doWork();
        }
    }
}
console.log(new OfficeManager(0, 'davi') instanceof EmployeeBase);
// [x] interface extends class: "captures" attributes
class BaseClassInterface {
    id = 0;
    print() { }
}
class ImplementsExt {
    id = 0;
    print() { }
    setId(id) {
        this.id = id;
    }
}
// [x] modules
// import { ModuleClass, ModuleFunction } from "./modules/Module1";
// using namespace Module1
const Module1 = __importStar(require("./modules/Module1"));
let mod1 = new Module1.ModuleClass();
mod1.print();
Module1.ModuleFunction();
const DefaultExport_1 = __importDefault(require("./modules/DefaultExport"));
let modDefault = (0, DefaultExport_1.default)(1, 2);
//# sourceMappingURL=3.js.map