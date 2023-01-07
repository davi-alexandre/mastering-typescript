// Javascript Runtime is single-threaded
// promises built upon callbacks (aka event handlers)
// chain multiple asynchronous calls = 'fluent syntax'
// async-await = pause the execution flow of our code until the asynchronous function returns

function delayedResponseWithCallback(callback: () => void) {
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
import * as fs from "fs";
fs.readFile("./files/test1.txt", (err, data) => {
	if (err) {
		console.log(`an error occurred : ${err}`);
	} else {
		console.log(`test1.txt contents : ${data}`);
		fs.readFile("./files/test2.txt", (err, data) => {
			if (err) {
				console.log(`an error occurred : ${err}`);
			} else {
				console.log(`test2.txt contents : ${data}`);
				fs.readFile("./files/test3.txt", (err, data) => {
					if (err) {
						console.log(`an error occurred : ${err}`);
					} else {
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
	.then((value) => { // fluent syntax
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
function fnDelayedPromise(
    resolve: () => void,
    reject: () => void
) {
	let afterTimeout = () => { resolve() }
    // async calls here
	setTimeout(afterTimeout, 1000);
}
function delayedResponsePromise(): Promise<void> {
	// type returned from the Promise is void
	return new Promise<void>(fnDelayedPromise);
}

// more practical code
function thePrincePromise(matters?: boolean): Promise<string> {
    return new Promise<string>
    (
        (
            resolve: (msg: string) => void,
            reject: (errCode: number) => void,
        ) => {
            if (!matters) reject(404) // go to catch()
            let msg = "";
            setTimeout(() => {resolve(msg)}, 1000);
        }
    );
}
thePrincePromise(false)
.then((msg) => {
    console.log("Jon Snow");
}).catch((errCode) => {
    console.log("No one, for some fucking reason")
});



// XXX ASYNC AWAIT

function delayedPromise(...names: string[]): Promise<number[]> {
	return new Promise<number[]>(
		(resolve: (names: number[]) => void, reject: () => void) => {
			let lengths = names.map((e) => e.length);
			setTimeout(() => {
				console.log(`2. calling resolve()`);
				resolve(lengths);
			}, 5000);
		}
	);
}

async function callDelayedPromise(wait = true) {
	console.log(`1. before calling delayedPromise`);
	if (wait) {
		try {
			// best practice for await calls
			let values = await delayedPromise("davi", "alexandre");
			console.log(values);
		} catch (err) {}
	} else
		delayedPromise()
			.then(() => {})
			.catch((err) => {});
	console.log(`3. after calling delayedPromise`);
}
callDelayedPromise();