import * as Rx from 'rxjs';
import { connect } from 'rxjs/operators';
import print from './print';


// [x] COLD observable = data created inside [unicast]
var cold1 = new Rx.Observable<number>(observer => {
    observer.next(Math.random())
});
// rand num gerado na inscrição => dois numeros diferentes
print('COLD')
cold1.subscribe((a) => print(`Subscriber A: ${a}`));
cold1.subscribe((b) => print(`Subscriber B: ${b}`));

// [x] HOT observable [multicast]
let aux = Math.random()
let hot1 = new Rx.Observable<number>(observer => {
    observer.next(aux)
});

print('\nHOT 1')
hot1.subscribe((a) => print(`Subscriber A: ${a}`));
hot1.subscribe((b) => print(`Subscriber B: ${b}`));



// [x] from cold
print('\nHOT FROM COLD')
let kold = new Rx.Observable(observer => {
    observer.next(Math.random())
})
const tick$ = Rx.connectable(
    kold,
    { connector: () => new Rx.Subject(), }
);
tick$.subscribe(count => print(`- A. ${count}`))
tick$.subscribe(count => print(`- B. ${count}`));
kold.subscribe((n) => print(`A. ${n}`));
kold.subscribe((n) => print(`B. ${n}`));
tick$.connect()


// [x] HOT FROM COLD 2
// Every Subject is an Observable and an Observer
print("\nCOLD MADE HOT");
const cold = new Rx.Observable((subscriber) => {
	subscriber.next(Math.random());
});
cold.subscribe((val) => print(`Cold 1: \n${val}`));
cold.subscribe((val) => print(`Cold 2: \n${val}`));
const hot3 = new Rx.Subject();
hot3.subscribe((val) => print(`- Hot1 A: ${val}`));
hot3.subscribe((val) => print(`- Hot1 B: ${val}`));
const hot4 = new Rx.Subject();
hot4.subscribe((val) => print(`Hot2 A: ${val}`));
hot4.subscribe((val) => print(`Hot2 B: ${val}`));
cold.subscribe(hot3);
cold.subscribe(hot4);
