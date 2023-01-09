"use strict";
// XXX DECORATORS
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// [x] dependency injection: a classe precisa de um objeto externo, tipo banco de dados, que não é instanciado internamente com o new(), mas sim externamente e passado ao construtor da classe
// loosely coupled code -> a construção da classe independe da construção das dependências (construidas por um dep. injec. container, um objeto que mapeia, carrega ou constrói as dependências)
// the container is the class' object factory, which will first resolve the dependencies, construct the object and return it
function simpleDecorator(constructor) {
    console.log("simpleDecorator called");
}
function secondDecorator(constructor) {
    console.log(`secondDecorator called`);
}
let ClassWithSimpleDecorator = class ClassWithSimpleDecorator {
};
ClassWithSimpleDecorator = __decorate([
    simpleDecorator // Decorators are only invoked once, when a class is defined
    ,
    secondDecorator // called in the reverse order of their appearance
], ClassWithSimpleDecorator);
// [x] types of decorators: class, property, method, parameter
function classDecorator(constructor) { }
function propertyDecorator(target, propertyKey) { }
function methodDecorator(target, methodName, descriptor) { }
function parameterDecorator(target, methodName, parameterIndex) { }
let ClassWithAllTypesOfDecorators = class ClassWithAllTypesOfDecorators {
    id = 1;
    print() { }
    setId(id) { }
};
__decorate([
    propertyDecorator,
    __metadata("design:type", Number)
], ClassWithAllTypesOfDecorators.prototype, "id", void 0);
__decorate([
    methodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassWithAllTypesOfDecorators.prototype, "print", null);
__decorate([
    __param(0, parameterDecorator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClassWithAllTypesOfDecorators.prototype, "setId", null);
ClassWithAllTypesOfDecorators = __decorate([
    classDecorator
], ClassWithAllTypesOfDecorators);
// [x] decorator with arguments
function decoratorFactory(name) {
    return (constructor) => {
        console.log(`decorator function called with : ${name}`);
    };
}
let ClassWithDecoratorFactory = class ClassWithDecoratorFactory {
};
ClassWithDecoratorFactory = __decorate([
    decoratorFactory("testName")
], ClassWithDecoratorFactory);
// [x] class decorators
function classConstructorDec(constructor) {
    // modify class definition
    constructor.prototype.testProperty = "testProperty_value";
}
let ClassWithConstructor = class ClassWithConstructor {
    constructor(id) { }
};
ClassWithConstructor = __decorate([
    classConstructorDec,
    __metadata("design:paramtypes", [Number])
], ClassWithConstructor);
let classInstance = new ClassWithConstructor(1);
console.log(`classInstance.testProperty = ${classInstance.testProperty}`);
// [x] property decorator
function propertyDec(target, propertyName) {
    // target == class prototype object
    // if (typeof target === "function") // static property
    // 	console.log(`class name : ${target.name}`);
    // else
    // 	console.log(`class name : ` + `${target.constructor.name}`);
    console.log(`class name : ${target.name ?? target.constructor.name}`);
    console.log(`propertyName : ${propertyName}`);
}
class ClassWithPropertyDec {
    nameProperty;
}
__decorate([
    propertyDec,
    __metadata("design:type", Object)
], ClassWithPropertyDec.prototype, "nameProperty", void 0);
class StaticClassWithPropertyDec {
    static staticProperty;
}
__decorate([
    propertyDec,
    __metadata("design:type", String)
], StaticClassWithPropertyDec, "staticProperty", void 0);
// [x] method decorator
function methodDec(target, methodName, descriptor) {
    console.log(`target: ${target}`);
    console.log(`methodName : ${methodName}`);
    console.log(`descriptor : ${JSON.stringify(descriptor)}`);
    console.log(`target[methodName] : ${target[methodName]}`);
}
class ClassWithMethodDec {
    print(output) {
        console.log(`ClassWithMethodDec.print` + `(${output}) called.`);
    }
}
__decorate([
    methodDec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithMethodDec.prototype, "print", null);
// modifying method
function auditLogDec(target, methodName, descriptor) {
    let originalFunction = target[methodName];
    let auditFunction = function () {
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
    print(arg1, arg2) {
        console.log(`3. ClassWithMethodDec.print` + `(${arg1}, ${arg2}) called.`);
    }
}
__decorate([
    auditLogDec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ClassWithAuditDec.prototype, "print", null);
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
require("reflect-metadata");
function reflectParameterDec(target, methodName, parameterIndex) {
    let designType = Reflect.getMetadata("design:type", target, methodName);
    console.log(`design type: ${designType.name}`);
    let designParamTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
    for (let paramType of designParamTypes)
        console.log(`param type : ${paramType.name}`);
    let designReturnType = Reflect.getMetadata("design:returntype", target, methodName);
    console.log(`return type : ${designReturnType.name}`);
}
class ClassWithReflectMetaData {
    print(id, name) {
        return 1000;
    }
}
__decorate([
    __param(0, reflectParameterDec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Number)
], ClassWithReflectMetaData.prototype, "print", null);
//# sourceMappingURL=6%20-%20decorators.js.map