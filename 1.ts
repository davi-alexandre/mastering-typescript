var msg = 'world'
console.log(`hell ${msg}`)

// TYPE ANNOTATION
var bool : boolean = true
var num : number = 1234;
var strArr : string[] = ['first', 'second']

// INFERRED TYPING
var inferred = "strong string"

// DUCK TYPING (bijeção)
// same type if they have the same properties and methods
var nameIdObject = { id: 1, name: "myName", print() {} };
nameIdObject = { id: 2, name: "anotherName", print() {} };

var obj1 = { id: 1, print() {} };
var obj2 = { id: 2, print() {}, select() {} };
obj1 = obj2;
// ERRO: obj2 = obj1;


// JSDoc comments
/** Faz uma operação
 * 
 * @param a numero qualquer
 * @param b outro
 * @param c anoutro
 * @returns o resultado
 */
function calculate(a: number, b: number, c: number): number {
	return a * b + c;
}