// [x] EXPLICIT CASTING (with inferred typing?)
var item1 = <any>{ id: 1, name: "item1" }
item1 = { id: 2 } as any


// [x] LET: vê escopo
// var: não vê escopo => deve ser evitada
var one: number = 1
let two: number = 2
if (one == 1 && two == 2) {
	var one: number = 0
	let two: number = 0
	console.log(`${one}, ${two}`)
}
console.log(`${one}, ${two}`)


// [x] UNION TYPES
function printObject(obj: string | number) {
	console.log(obj)
}
printObject(1)
printObject("string value")

// [x] TYPE GUARDS === type check
function addWithUnion(
	arg1: string | number,
	arg2: string | number) {
	// ERROR: arg1 + arg2;
	if (typeof arg1 === "number" && typeof arg2 === "number") {
		return arg1 + arg2;
	}
	return arg1.toString() + arg2.toString();
}
addWithUnion(1, 2)

// [x] TYPE ALIASES
type stringOrNumber = string | number
(arg: stringOrNumber) => {console.log(typeof arg)}

// [x] ENUM
// use const antes da declaração
// => javascript resultante é a simples substituição peloo valor
// => e não um objeto completo 
const enum DoorState { open, closed }
const enum WorldState {
	open=1,
	closed="closed world",
}



// PRIMITIVES

// for no defined value
undefined; // aparece quando ex.: delete array[0];

// for no value - the defined value of none
null;



// [x] TERNARY OPERATOR / conditional expressions
(1 + 2 == 2) ? 'yes' : 'no'


// [x] CHECK NESTING
function printNestedObject(obj: any) {
	if (obj != undefined &&
		obj.nestedProperty != undefined &&
		obj.nestedProperty.name)
		console.log(`name = ${obj.nestedProperty.name}`);
	else console.log('name not found or undefined');
}
printNestedObject({})

// [x] NULLISH CONDITIONAL / optional chaining
type NullableString = string | null | undefined;
let a : NullableString = printNestedObject?.name;
a = (printNestedObject.name === null ? null : printNestedObject.name);
// com undefined também (por isso null-ish)
function printNestedOptionalChain(obj: any) {
	if (obj?.nestedProperty?.name)
		console.log(`name = ${obj.nestedProperty.name}`);
	else console.log(`name not found or undefined`);
}

// [x] NULLISH COALESCING OPERATOR
let b : number | undefined | null = 42;
console.log(b ?? 'undefined or null');


// DEFINITE ASSIGNMENT ASSERTION == pode usar sem dar valor (não use)
let globalString! : string;


// [x] OBJECT (residual / JSON) type
let structuredObject: object = {
	name: "myObject",
	properties: { id: 1, type: "AnObject" },
};
console.log(JSON.stringify(structuredObject));
// a string, and other primitives, is not an object



// [x] UNKNOWN (type-safe <any>)
// assign it to known types <=> explicit casting
let u: unknown = "an unknown";
u = 1;
let aNumber2: number;
aNumber2 = u as number; // since u can be any type


// NEVER
// atribui qualquer tipo quando a declaração é inalcançável
function alwaysThrows(): never {
	throw new Error("this will always throw");
	// return -1;  ->  -1 not assignable to 'never'
}
enum AnEnum { FIRST, SECOND }
function getEnumValue(enumValue: AnEnum): string {
	switch (enumValue) {
		case AnEnum.FIRST:
			return "First Case";
		case AnEnum.SECOND:
			return "Second Case";
	}
	// só pode atribuir quando é inalcançável
	let returnValue: never = enumValue;
	return returnValue;
}


// [x] OBJECT SPREAD (+ array,tuple spread)
let firstObj: object = { id: 1, name: "firstObj" };
let secondObj: object = { value: "on", ...firstObj };
console.log(`secondObj : ${JSON.stringify(secondObj)}`);


// [x] TUPLE (mutable, fixed)
let tuple: [string, boolean?]; // optional boolean element
tuple = ["msg", true];
tuple = ["optional"];
let [first, second] =  tuple; // unpacking, DESTRUCTURING
// mutable, variable-sized
let variableTuple : [number, ...string[]];
variableTuple = [1];
variableTuple = [1, "string1"];
variableTuple = [1, "string1", "string2"];

// [x] OBJECT DESTRUCTURING (unpacking)
let complexObject = {
	num: 1,
	str: "name",
	bool: true };
var { num, str, bool } = complexObject;
var {
	num: numero, // renaming
	str: msg,
	bool: booleano,
} = complexObject;
console.log(num, numero)




// FUNCTIONS
// [x] default and optional parameters
function concatValues(a: string = "default", b?: string) {
	// concatValues("third") -> thirdundefined
	console.log(`a + b = ${a + b}`);
}
// [x] rest syntax for arbitrary number of parameters
function restArguments(...args: string[] | number[]) {
	for (let i in args)
		console.log(`args[${i}] = ${args[i]}`);
}
restArguments("davi", "alexandre");
// [x] callback functions and function signatures as parameters to ensure the argument is of the expected function type
let callback = function (text: string): void {
	console.log(text);
};
function withCallback(
	message: string,
	callbackFn: (text: string) => void
) {
	console.log(message);
	callbackFn("callback msg");
}
withCallback("func withCallback", callback);

// [x] function overrides - declaring valid signatures
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: any, b: any) { // (invalid)
	return a + b;
}
add("first", "second");
add(1, 2);
// add(true, false) -> ERROR


// [x] LITERALS
// hybrid of enums and type aliases
// set-like types of valid values
// string, number, or boolean
type AllowedStringValues = "one" | "two" | "three";
type AllowedNumericValues = 1 | 20 | 65535;
function withLiteral(input: AllowedStringValues | AllowedNumericValues) {
	console.log(`called with : ${input}`);
}
withLiteral("two");
withLiteral(65535);
// withLiteral("four");
// withLiteral(2);