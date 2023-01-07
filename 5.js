"use strict";
// Javascript Runtime is single-threaded
// promises built upon callbacks (aka event handlers)
// chain multiple asynchronous calls = 'fluent syntax'
// async-await = pause the execution flow of our code until the asynchronous function returns
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
function delayedResponseWithCallback(callback) {
    function executeAfterTimeout() {
        // +1 callback
        console.log(`5. executeAfterTimeout()`);
        callback();
    }
    console.log(`2. calling setTimeout`);
    setTimeout(executeAfterTimeout, 3000); // only one async call, queued
    console.log(`3. after calling setTimeout`);
}
function callDelayedAndWait() {
    function afterWait() {
        // +1 callback
        console.log(`6. afterWait()`);
    }
    console.log(`1. calling delayedResponseWithCallback`);
    delayedResponseWithCallback(afterWait);
    console.log(`4. after calling delayedResponseWithCallback`);
}
callDelayedAndWait();
// [x] "callback hell"
const fs = __importStar(require("fs"));
fs.readFile("./files/test1.txt", (err, data) => {
    if (err) {
        console.log(`an error occurred : ${err}`);
    }
    else {
        console.log(`test1.txt contents : ${data}`);
        fs.readFile("./files/test2.txt", (err, data) => {
            if (err) {
                console.log(`an error occurred : ${err}`);
            }
            else {
                console.log(`test2.txt contents : ${data}`);
                fs.readFile("./files/test3.txt", (err, data) => {
                    if (err) {
                        console.log(`an error occurred : ${err}`);
                    }
                    else {
                        console.log(`test3.txt contents : ${data}`);
                    }
                });
            }
        });
    }
});
// XXX PROMISES
// then() is called when the asynchronous function returns
fs.promises
    .readFile("./files/test1.txt")
    .then((value) => {
    console.log(`ps test1.txt read : ${value}`);
    return fs.promises.readFile("./files/test2.txt");
})
    .then((value) => {
    console.log(`ps test2.txt read : ${value}`);
    return fs.promises.readFile("./files/test3.txt");
})
    .then((value) => {
    console.log(`ps test3.txt read : ${value}`);
})
    .catch((error) => {
    console.log(`an error occurred : ${error}`);
});
// [x] custom promises
/** A Promise is an instance of a new Promise class whose
 * constructor requires a function signature that accepts
 * two callback functions, generally named resolve() and reject()
 ** Both callbacks must return void, and only have a single argument
 * resolve() arg type is the same as the generic type;
 * reject() arg type can be any type
**/
function fnDelayedPromise(resolve, reject) {
    let afterTimeout = () => { resolve(); };
    // async calls here
    setTimeout(afterTimeout, 1000);
}
function delayedResponsePromise() {
    // type returned from the Promise is void
    return new Promise(fnDelayedPromise);
}
// more practical code
function thePrincePromise(matters) {
    return new Promise((resolve, reject) => {
        if (!matters)
            reject(404); // go to catch()
        let msg = "";
        setTimeout(() => { resolve(msg); }, 1000);
    });
}
thePrincePromise(false)
    .then((msg) => {
    console.log("Jon Snow");
}).catch((errCode) => {
    console.log("No one, for some fucking reason");
});
// XXX ASYNC AWAIT
function delayedPromise(...names) {
    return new Promise((resolve, reject) => {
        let lengths = names.map((e) => e.length);
        setTimeout(() => {
            console.log(`2. calling resolve()`);
            resolve(lengths);
        }, 5000);
    });
}
async function callDelayedPromise(wait = true) {
    console.log(`1. before calling delayedPromise`);
    if (wait) {
        try {
            // best practice for await calls
            let values = await delayedPromise("davi", "alexandre");
            console.log(values);
        }
        catch (err) { }
    }
    else
        delayedPromise()
            .then(() => { })
            .catch((err) => { });
    console.log(`3. after calling delayedPromise`);
}
callDelayedPromise();
//# sourceMappingURL=5.js.map