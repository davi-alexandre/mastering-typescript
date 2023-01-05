export class ModuleClass {
	print(): void {
		localPrint(`Module1.print() called`);
	}
}
export function ModuleFunction() {
    localPrint('Module1.ModuleFunction() called');
}

// private scope, inaccessible outside
function localPrint(text: string) {
	console.log(`localPrint: ${text}`);
}
