"use strict";
class WithConstructor {
    id;
    // [x] field access modifiers: public, private, protected
    // public id: number;
    // constructor(id: number) {
    //     this.id = id;
    // }
    // readonly properties are only allowed to set within the constructor function
    name;
    // [x] get-set properties
    _property = 0;
    get property() {
        return this._property;
    }
    set property(value) {
        this._property = value;
    }
    constructor(id) {
        this.id = id;
        this.name = "none";
    }
}
let instance = new WithConstructor(10);
console.log(JSON.stringify(instance));
//# sourceMappingURL=tests.js.map