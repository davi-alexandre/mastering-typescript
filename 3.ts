// XXX INTERFACES
interface IdName {
	id: number;
	name?: string; // optional
}
let idObject: IdName = { id: 2 };
// weak type == interface with only optional fields

// [x] in operator - check property in interface
if ('id' in idObject) console.log(idObject)

// [x] keyof operator - iter property names of a type
interface IPerson { id: number; name: string; }
type PersonProperty = keyof IPerson; // "id" | "name"
function getProperty(
    property: PersonProperty,
    person: IPerson
) {
	console.log(`${property} = ${person[property]}`);
}
getProperty("id", { id: 1, name: "firstName" });
getProperty("name", { id: 2, name: "secondName" });
// getProperty("telephone", { id: 3, name: "thirdName" });



// XXX CLASSES

interface IPrint {
    print(): void;
}
function printClass(a: IPrint) {
    a.print();
}

class SimplerClass { two!: number; }
class SimpleClass
    extends SimplerClass
    implements IPrint
{
	one: number | undefined; // since no constructor
	print(): void {
		console.log(`one=${this.one}`);
		console.log(`two=${this.two}`);
	}
}
class DuckClass {
    // doesn't implement IPrint
    // but duck typing makes it work
    print(): string {
        console.log("quacks like a duck")
        return ""
    }
}

let myInstance = new SimpleClass();
myInstance.one = 1;
printClass(myInstance)
let myDuck = new DuckClass();
printClass(myDuck)

class WithConstructor {
	// [x] static
	static instanceCount: number = 0;
	static _addCount() {
		WithConstructor.instanceCount++;
	}
	// [x] field access modifiers: public, private, protected
	// public id: number;
	// constructor(id: number) {
	//     this.id = id;
	// }
	// readonly properties are only allowed to set within the constructor function
	readonly name!: string;
	// [x] get-set properties
	private _property: number = 0;
	get property(): number {
		return this._property;
	}
	set property(value: number) {
		this._property = value;
	}
    // [x] constructors
	constructor(public id: number) {
		WithConstructor._addCount();
		this.name = "none";
	}
}
let instance = new WithConstructor(10);
console.log(JSON.stringify(instance));



// [x] NAMESPACES
namespace FirstNameSpace {
	export class NameSpaceClass {}
	class NotExported {}
}
let instance0 = new FirstNameSpace.NameSpaceClass();


// XXX INHERITANCE
interface IBase {
	// interfaces are always public
	id: string | number;
}
interface IDerivedFromBase extends IBase {
	name: string;
}
// [x] object structure described by interface
let interfacedObject: IDerivedFromBase = {
	id: 1,
	name: "myName",
};

class BaseClass implements IDerivedFromBase {
	// [x] protected = private + acessible to derived classes
	protected length: number = 23;
	public name: string = "nameString";
	constructor(public id: number) {}
	print(text: string) {
		console.log(`BaseClass.print() : ${text}`);
	}
}
class DerivedClass extends BaseClass implements IDerivedFromBase {
	constructor(public id: number) {
		// [x] super/base class
		super(id);
		this.name = "overrided name";
		super.length = 32;
	}
	// [x] function overriding
	print(text: string) {
		super.print(`${text}\n>>\t from DerivedClassFncallthrough`);
	}
}
let c = new DerivedClass(0);
c.print("13");


// [x] abstract class
// cannot be instantiated, only derivable
abstract class EmployeeBase {
	constructor(public id: number, public name: string) {}
	abstract doWork(): void;
}
class OfficeWorker extends EmployeeBase {
	doWork(): void {
		console.log(`${this.name} is working`);
	}
}
class OfficeManager extends OfficeWorker {
	public employees: OfficeWorker[] = [];
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
	id: number = 0;
	print() {}
}
interface IBaseInterface extends BaseClassInterface {
	// "captures" the attributes of the class and requires them
	setId(id: number): void;
}
class ImplementsExt implements IBaseInterface {
	id: number = 0;
	print() {}
	setId(id: number): void {
		this.id = id;
	}
}

// [x] modules

// import { ModuleClass, ModuleFunction } from "./modules/Module1";
// using namespace Module1
import * as Module1 from "./modules/Module1";
let mod1 = new Module1.ModuleClass();
mod1.print();
Module1.ModuleFunction()

import DefaultAdd, { NonDefaultExport } from "./modules/DefaultExport";
let modDefault = DefaultAdd(1, 2);

