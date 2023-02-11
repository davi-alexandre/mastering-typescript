import print from './print';
import * as rx from 'rxjs';


let clicks = rx.fromEvent(document, 'click').pipe(
    rx.tap(_ => print('Do One Time!'))
)

// DO NOT
// let subA = clicks.subscribe(a => print(a))
// let subB = clicks.subscribe(a => print(a))

// DO
// tapping observable not being affected by the number of subscriptions
// 100 clicks => 100 prints
let clicks$ = rx.connectable(clicks, {
    connector: () => new rx.Subject()
})

clicks$.subscribe(a => print(a))
clicks$.subscribe(a => print(a));
clicks$.connect()
