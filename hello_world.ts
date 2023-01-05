// XXX INTERFACES
interface IdName {
	id: number;
	name?: string; // optional
}
let idObject: IdName = { id: 2 };
// weak type == interface with only optional fields

// [x] in operator - check property in interface
if ('id' in idObject) console.log(idObject)

// [x] keyof operator - iter property names of a type
interface IPerson { id: number; name: string; }
type PersonProperty = keyof IPerson; // "id" | "name"
function getProperty(
    property: PersonProperty,
    person: IPerson
) {
	console.log(`${property} = ${person[property]}`);
}
getProperty("id", { id: 1, name: "firstName" });
getProperty("name", { id: 2, name: "secondName" });
// getProperty("telephone", { id: 3, name: "thirdName" });



// XXX CLASSES

interface IPrint {
    print(): void;
}
function printClass(a: IPrint) {
    a.print();
}

class SimplerClass { two!: number; }
class SimpleClass
    extends SimplerClass
    implements IPrint
{
	one: number | undefined; // since no constructor
	print(): void {
		console.log(`one=${this.one}`);
		console.log(`two=${this.two}`);
	}
}
class DuckClass {
    // doesn't implement IPrint
    // but duck typing makes it work
    print(): string {
        console.log("quacks like a duck")
        return ""
    }
}

let myInstance = new SimpleClass();
myInstance.one = 1;
printClass(myInstance)
let myDuck = new DuckClass();
printClass(myDuck)

// [x] constructors
