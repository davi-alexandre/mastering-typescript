import * as Rx from 'rxjs';
import print from './print';


// [x] takeUntil, takeWhile

let interval = Rx.interval(500);
let timeOut = Rx.timer(2000);

interval.pipe(
    Rx.takeUntil(timeOut),
    Rx.finalize(() => ('complete'))
).subscribe()

let names = Rx.of('Bob', 'Jeff', 'Doug', 'Steve')
names.pipe(
    Rx.takeWhile(name => name != 'Doug')
).subscribe()


// [x] zip

let langs = Rx.of('python', 'javascript', 'C#')
let people = Rx.of('Davi', 'Flint', 'Steve')

let combo = Rx.zip(people, langs)
combo.subscribe(arr => print(arr))

// [x] forkJoin -- juntar os dois últimos

let delayedLangs = Rx.of("Java", "C", "Go")
    .pipe(Rx.delay(2000));
let fork = Rx.forkJoin([delayedLangs, people]);
fork.subscribe(arr => print(arr))


// [x] catch, retry

Rx.of(1, 2, 3, 42, 5).pipe(
    Rx.map(n => {
        if (n === 42) throw 'four!'
        return n
    }),
    Rx.catchError(err => Rx.of('caught'))
).subscribe()