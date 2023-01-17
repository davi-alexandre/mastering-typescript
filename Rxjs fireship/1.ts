import * as Rx from 'rxjs';
import { print } from './common';


// [x]
let observable = new Rx.Observable((observer) => {
	observer.next("hello");
	observer.next("world");
    observer.complete()
});
observable
    // .pipe(
    //     Rx.tap({
    //         complete: () => { print("COMPLETE") },
    //     })
    // )
    // .subscribe(val => print(val))
    // ===
    .subscribe({
        next: val => print(val),
        complete: () => print("COMPLETE")
    })


// [x]
let clicks = Rx.fromEvent(document, 'click')
clicks.subscribe(click => print(click))


// [x] emit value in sequence every 1 second
let source = Rx.interval(1000);
let example = source.pipe(
	Rx.take(5), //take only the first 5 values
	Rx.finalize(() => print("Sequence complete")) // Execute when the observable completes
);
example.subscribe(val => print(val));



// [x]
let source1 = Rx.interval(100).pipe(    // chamar a cada 100 ms
	Rx.finalize(() => print("[finalize] Called")),
	Rx.tap({
        // configure event states of the observable
		next: () => print("[next] Called"),
		error: () => print("[error] Not called"),
		complete: () => print("[tap complete] Not called"), 
	})
);
 
let sub = source1.subscribe({
  next: x => print(x),
  error: Rx.noop,
  complete: () => print('[complete] Not called')
});

Rx.timer(200).subscribe(                // parar depois de 200 ms
    () => sub.unsubscribe()
);