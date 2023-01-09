// XXX DECORATORS

// [x] dependency injection: a classe precisa de um objeto externo, tipo banco de dados, que não é instanciado internamente com o new(), mas sim externamente e passado ao construtor da classe
// loosely coupled code -> a construção da classe independe da construção das dependências (construidas por um dep. injec. container, um objeto que mapeia, carrega ou constrói as dependências)
// the container is the class' object factory, which will first resolve the dependencies, construct the object and return it

function simpleDecorator(constructor: Function) {
	console.log("simpleDecorator called");
}
function secondDecorator(constructor: Function) {
	console.log(`secondDecorator called`);
}
@simpleDecorator // Decorators are only invoked once, when a class is defined
@secondDecorator // called in the reverse order of their appearance
class ClassWithSimpleDecorator {}

// [x] types of decorators: class, property, method, parameter
function classDecorator(constructor: Function) {}
function propertyDecorator(target: any, propertyKey: string) {}
function methodDecorator(
	target: any,
	methodName: string,
	descriptor?: PropertyDescriptor
) {}
function parameterDecorator(
	target: any,
	methodName: string,
	parameterIndex: number
) {}

@classDecorator
class ClassWithAllTypesOfDecorators {
	@propertyDecorator id: number = 1;
	@methodDecorator print() {}
	setId(@parameterDecorator id: number) {}
}

// [x] decorator with arguments
function decoratorFactory(name: string) {
	return (constructor: Function) => {
		console.log(`decorator function called with : ${name}`);
	};
}
@decoratorFactory("testName")
class ClassWithDecoratorFactory {}


// [x] class decorators

function classConstructorDec(constructor: Function) {
    // modify class definition
	constructor.prototype.testProperty = "testProperty_value";
}
@classConstructorDec
class ClassWithConstructor {
	constructor(id: number) {}
}

let classInstance = new ClassWithConstructor(1);
console.log(
	`classInstance.testProperty = ${(<any>classInstance).testProperty}`
);



// [x] property decorator

function propertyDec(target: any, propertyName: string) {
    // target == class prototype object

	// if (typeof target === "function") // static property
	// 	console.log(`class name : ${target.name}`);
	// else
	// 	console.log(`class name : ` + `${target.constructor.name}`);
    console.log(`class name : ${target.name ?? target.constructor.name}`);
	console.log(`propertyName : ${propertyName}`);
}

class ClassWithPropertyDec {
	@propertyDec nameProperty: string | undefined;
}
class StaticClassWithPropertyDec {
	@propertyDec static staticProperty: string;
}


// [x] method decorator

function methodDec(
	target: any,
	methodName: string,
	descriptor?: PropertyDescriptor
) {
	console.log(`target: ${target}`);
	console.log(`methodName : ${methodName}`);
	console.log(`descriptor : ${JSON.stringify(descriptor)}`);
	console.log(`target[methodName] : ${target[methodName]}`);
}
class ClassWithMethodDec {
	@methodDec print(output: string) {
		console.log(`ClassWithMethodDec.print` + `(${output}) called.`);
	}
}

// modifying method
function auditLogDec(
	target: any,
	methodName: string,
	descriptor?: PropertyDescriptor
) {
	let originalFunction = target[methodName];
	let auditFunction = function (this: any) { // wrapper
		// n faço ideia do pq tem esse "this"
		console.log(`1. auditLogDec : overide of ${methodName} called`);
		for (let i = 0; i < arguments.length; i++)
			console.log(`2. arg : ${i} = ${arguments[i]}`);
		originalFunction.apply(this, arguments);
	};
	target[methodName] = auditFunction;
	return target;
}
class ClassWithAuditDec {
	@auditLogDec print(arg1: string, arg2: string) {
		console.log(
			`3. ClassWithMethodDec.print` + `(${arg1}, ${arg2}) called.`
		);
	}
}
let auditClass = new ClassWithAuditDec();
auditClass.print("test1", "test2");


// [x] decorator metadata

// tsconfig.json >
//      "experimentalDecorators": true,
//      "emitDecoratorMetadata": true,  
/** metadata added to generated .JS:
 * __metadata("design:type", Function),
 * __metadata("design:paramtypes", [Number, String]),
 * __metadata("design:returntype", void 0)
 */

// npm install reflect-metadata
// read metadata at runtime
import "reflect-metadata";

function reflectParameterDec(
	target: any,
	methodName: string,
	parameterIndex: number
) {
	let designType = Reflect.getMetadata(
        "design:type", target, methodName);
	console.log(`design type: ${designType.name}`);

	let designParamTypes = Reflect.getMetadata(
		"design:paramtypes", target, methodName);
	for (let paramType of designParamTypes)
		console.log(`param type : ${paramType.name}`);
    
	let designReturnType = Reflect.getMetadata(
		"design:returntype", target, methodName);
	console.log(`return type : ${designReturnType.name}`);
}
class ClassWithReflectMetaData {
	print(@reflectParameterDec id: number, name: string): number {
		return 1000;
	}
}