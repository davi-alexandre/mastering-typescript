function printGeneric<A, B>(a: A, b: B) {
	console.log(`typeof a is : ${typeof a}`);
	console.log(`typeof b is : ${typeof b}`);
}
printGeneric(1, "string");
printGeneric<string, boolean>("hey", true);
printGeneric(() => {}, 0);
printGeneric({ id: 1 }, false);

// XXX generics type CONSTRAINTS
class Concatenator<T extends Array<string> | Array<number>> {
	public concatenateArray(items: T): string {
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

// [x] only refer to intersection of all constraints
interface IPrintId {
	id: number;
	print(): void;
}
type PrintName = { name: string; print(): void };
function useT<T extends IPrintId | PrintName>(item: T): void {
	item.print();
	// item.id = 1;
	// item.name = "test";
}
function printProperty<T, K extends keyof T>(object: T, key: K) {
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

// [x] generic interfaces
interface IPrint {
	print(): void;
}
interface ILogInterface<T extends IPrint> {
	// T é uma entidade que possui um print()
	logToConsole(iPrintObj: T): void;
}
class LogClass<T extends IPrint> implements ILogInterface<T> {
	logToConsole(iPrintObj: T): void {
		iPrintObj.print();
	}
}

let printedObject: IPrint = {
	print() {
		console.log("printedObject.print() called");
	},
};
let logClass = new LogClass();
logClass.logToConsole(printedObject);

// [x] generic class factories

class ClassA {}
class ClassB {}
function createClassInstance<T>(
	arg1: { new (): T } // anonymous type whose new() returns type T
): T {
	return new arg1();
}
let classAInstance = createClassInstance(ClassA);
