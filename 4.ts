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



// XXX MAPPED TYPES: type alias + generics

interface IAbRequired { a: number; b: string; }
let ab: IAbRequired = { a: 1, b: "test" }

type WeakInterface<T> = { 
    // [x] aka Partial, opposite of Required
	// return the type of the original property of type T, named K, but make it optional
	// optional mapping of all T properties
	[K in keyof T]?: T[K]; // identifier : type
};

// can only have properties in WeakInterface
let allOptional: WeakInterface<IAbRequired> = {};

let partial : Partial<IAbRequired> = {}; // [x]
let required : Required<IAbRequired> = { a:1, b:'2' }; // [x]
let readonly : Readonly<IAbRequired> = { a:1, b:'2' }; // [x]


interface IAbc {
	a: number;
	b: string;
	c: boolean;
}
type PickAb = Pick<IAbc, "a" | "b">; // [x] Pick: subset type
type RecordedCd = Record<"c" | "d", number>; // [x] Record: c and d both numbers

let recordedCdVar: RecordedCd = { c: 1, d: 1 };



// XXX CONDITIONAL TYPES

type NumberOrString<T> = T extends number ? number : string;
function logNumberOrString<T>(input: NumberOrString<T>) {}
logNumberOrString<number>(1);
logNumberOrString<string>("test");
logNumberOrString<boolean>("boolean does not extend number"); //=> type == string
// logNumberOrString<boolean>(1);
// logNumberOrString<boolean>(true);

// [x] Conditional type chaining
interface IA {
	a: number;
}
interface IAb {
	a: number;
	b: string;
}
interface IAbc {
	a: number;
	b: string;
	c: boolean;
}
type abc_ab_a<T> =
	T extends IAbc ? [number, string, boolean] : // tuple
	T extends IAb ? [number, string] :
	T extends IA ? [number] :
	never;


// [x] Distributed conditional types

type dateOrNumberOrString<T> = 
	T extends Date ? Date :
	T extends number ? Date | number :
	T extends string ? Date | number | string :
	never;
// • If the input parameter is of type Date, then the compareTo parameter may only be of type Date.
// • If the input parameter is of type number, then the compareTo parameter may be either a Date or a number.
// • If the input parameter is of type string, then the compareTo parameter may be either a Date or a number or a string.
// • If the input parameter is not of type Date or number or string, then do not allow this function to be called
function compareDates <T extends string | number | Date | boolean>(
	input: T,
	compareTo: dateOrNumberOrString<T>
) {}


// [x] Conditional type inference

type inferFromPropertyType<T> = T extends { id: infer U } ? U : never;
function testInferFromPropertyType<T>(arg: inferFromPropertyType<T>) {}
testInferFromPropertyType<{ id: string }>("test");
testInferFromPropertyType<{ id: number }>(1);

// function signature: single param "a", returns void
type inferredFromFnParam<T> = T extends (a: infer U) => void
	? U
	: never;
function testInferredFromFnParam<T>(arg: inferredFromFnParam<T>) {}
testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>("test");
type inferredFromFnReturnType<T> = T extends (a: string) => infer U ? U : never;
type inferredTypeFromArray<T> = T extends (infer U)[] ? U : never;


// XXX STANDARD CONDITIONAL TYPES

type ExcludeStringAndNumber = Exclude< // [x] Exclude
	string | number | boolean,
	string | number
>;
let boolValue: ExcludeStringAndNumber = true;

type StringOrNumber = Extract< // [x] Extract
	string | boolean | never,
	string | number>; // only <string> is extracted
let stringValue: StringOrNumber = "test";

type NotNullOrUndef = NonNullable< // [x] NonNullable
	number | undefined | null>;
let numValue: NotNullOrUndef = 1;

