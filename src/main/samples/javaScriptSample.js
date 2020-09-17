import {TypeScriptClass} from "./typeScriptSample";
import {randomPerson} from "../infrastructure/swapi/SwApiCalls";

export class JavaScriptClass {

    constructor(variable1, variable2, variable3) {
        if (typeof variable1 === 'undefined' || typeof (variable1.value) === 'undefined') {
            throw new TypeError('Invalid variable1 argument!')
        }
        if (typeof variable2 !== 'number') {
            throw new TypeError('Invalid variable2 argument!')
        }
        if (typeof variable3 !== 'string' && (variable3 !== 'Coders' || variable3 !== 'Camp')) {
            throw new TypeError('Invalid variable3 argument!')
        }
        this.variable1 = variable1;
        this.variable2 = variable2;
        this.variable3 = variable3;
    }

}

export function test() {

    const typeScriptObjectValid = new TypeScriptClass(
        {
            value: 'Test'
        },
        10,
        "Coders"
    );
    console.log(typeScriptObjectValid);

    const typeScriptObjectInvalid = new TypeScriptClass(
        {
            value: 'Test'
        },
        10,
        "CC"
    );
    console.log(typeScriptObjectInvalid);

    randomPerson()
        .then(person => console.log("Random person:", person));
}

