// [x] bind, call, apply - override 'this'

class MyBoundClass {
	name: string = "defaultNameValue";
    unchanged: number = 42;
	printName(description: string) {
        console.log(`this.name: ${this.name}`);
        console.log(`this.unchanged: ${this.unchanged}`);
		console.log(`description : ${description}`);
	}
}
let testBoundClass = new MyBoundClass();
testBoundClass.printName("testDescr");
console.log('');
testBoundClass.printName.call({ name: `call override` }, `whoa !`);
console.log('');
testBoundClass.printName.apply({ name: `apply override` }, ["whoa !!"]); //array



// Arrow functions do not get their own copy of the this property;
// they use the outer value of the this property.
class NoImplicitThisClass {
	id: number = 1;
	printAfterWait() {
        // BAD IMPLEMENTATION: copied this as any
		let callback0 = function () {
			// [x] "noImplicitThis": true -> ERROR
            // ===> this.id == undefined && typeof this === any
			console.log(`this.id : ${(this).id}`);
		};
        setTimeout(callback0, 1000, this);

        // one solution - refer to this
        let callback1 = function (_this:any) {
			console.log(`_this.id : ${_this.id}`);
		};
		setTimeout(callback1, 1000, this);


        // BEST solution
        let callback = () => {
			console.log(`this.id : ${this.id}`);
		};
		setTimeout(callback, 1000);
	}
}
let _classInstance = new NoImplicitThisClass();
_classInstance.printAfterWait();
