import * as Rx from 'rxjs';

let observable = new Rx.Observable(observer => {
    observer.next('hello')
    observer.next('world')
});

observable.subscribe(val => print(val))







function print(val: any) {
    let el = document.createElement('p')
    el.innerText = val.toString()
    document.body.appendChild(el)
}