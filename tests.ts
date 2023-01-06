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
function logNumberOrString<T>(input: NumberOrString<T>) {
	console.log(`logNumberOrString : ${input}`);
}
logNumberOrString<number>(1);
logNumberOrString<string>("test");
logNumberOrString<boolean>("boolean does not extend number");