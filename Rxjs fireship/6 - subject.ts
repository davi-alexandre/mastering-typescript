import * as Rx from 'rxjs';
import print from './print';


let subject = new Rx.Subject()

let subA = subject.subscribe(val => print(val))

subject.next('Hello')
setTimeout(() => {
    subject.next('World')
}, 1000)