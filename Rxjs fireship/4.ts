import * as Rx from 'rxjs';
import print from './print';

/** RENAMED OPERATORS
 * do => tap
 * catch => catchError
 * switch => switchAll
 * finally => finalize
 */



// [x] tap, map

let jsonString = '{ "type": "Dog", "breed": "Pug" }'
let apiCall = Rx.of(jsonString)

apiCall
    .pipe(
        Rx.tap(str => print(str + '!')), // do()
        Rx.map(json => JSON.parse(json)),
        Rx.tap(obj => {
            print(obj.type)
            print(obj.breed)
        }),
    ).subscribe()



// filter, first, last
print('\nFILTER')
let numbers = Rx.of(-3, -2, 4, 2, -5)
numbers
    .pipe(
        Rx.filter(n => n >= 0)
    )
    .subscribe(n => print(n))
numbers
    .pipe(
        Rx.first()
    ).subscribe(n => print(`FIRST: ${n}`))
numbers
    .pipe(
        Rx.last()
    ).subscribe(n => print(`LAST: ${n}`))



// [x] debounce, throttle   (avoid excess of events)

let mouseEvents = Rx.fromEvent(document, 'mousemove')
mouseEvents
    .pipe(
        Rx.throttleTime(1000) // first event min delay
    )
    .subscribe(e => 'moving')
mouseEvents
	.pipe(
		Rx.debounceTime(1000) // last event min delay
	)
	.subscribe((e) => 'stopped');


// [x] scan
let clicks = Rx.fromEvent(document, 'click')
clicks
	.pipe(
		Rx.map(() => parseInt((Math.random() * 10).toString())),
		// Rx.tap((generated) => print(generated)),
		Rx.scan((sum, generated) => sum + generated)
	)
	.subscribe((sum) => `Soma Total: ${sum}`);

// [x] switchMap - reinicia cronometragem a cada click
clicks
    .pipe(
        Rx.switchMap(click => {
            return Rx.interval(500)
        })
    )
    .subscribe(i => print(i))
