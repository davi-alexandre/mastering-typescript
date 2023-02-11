export default function print(val: any) {
	let el = document.createElement("p");
	el.innerText = val.toString();
	document.body.appendChild(el);
}
