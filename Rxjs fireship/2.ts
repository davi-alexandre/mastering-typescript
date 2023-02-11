import * as Rx from 'rxjs';
import print from './print';


// OBSERVABLE FROM PROMISES 
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolved!')
    }, 1000)
})
let obsPromise = Rx.from(promise)
obsPromise.subscribe(result => print(result))

// FROM TIMER
let timer = Rx.timer(1000)
timer.subscribe(done => print('timer done'))

// INTERVAL
let interval = Rx.interval(2000);
interval.subscribe(count => print(count))

// (stream) OBSERVABLE OF any data
let dataStream = Rx.of(
    "any static value", ["I", "Want"],
    23, false, { very: "cool", });
dataStream.subscribe((val) => print(val));
