class WithConstructor {
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
	constructor(public id: number) {
        this.name = "none";
    }
}
let instance = new WithConstructor(10);
console.log(JSON.stringify(instance))