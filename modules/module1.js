"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleFunction = exports.ModuleClass = void 0;
class ModuleClass {
    print() {
        localPrint(`Module1.print() called`);
    }
}
exports.ModuleClass = ModuleClass;
function ModuleFunction() {
    localPrint('Module1.ModuleFunction() called');
}
exports.ModuleFunction = ModuleFunction;
// private scope, inaccessible outside
function localPrint(text) {
    console.log(`localPrint: ${text}`);
}
//# sourceMappingURL=Module1.js.map