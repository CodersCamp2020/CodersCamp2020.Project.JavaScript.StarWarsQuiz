import {JavaScriptClass} from "./javaScriptSample";

export type TypeScript1Type = {
    value: string
}

export type CodersCamp = "Coders" | "Camp";

export class TypeScriptClass {
    readonly variable1: TypeScript1Type;
    variable2: number;
    variable3: CodersCamp;

    constructor(variable1: TypeScript1Type, variable2: number, variable3: CodersCamp = "Camp") {
        this.variable1 = variable1;
        this.variable2 = variable2;
        this.variable3 = variable3;
    }

}

export const typeScriptObject = new TypeScriptClass(
    {
        value: 'Test'
    },
    10,
    "Coders"
);

export const javaScriptObject = new JavaScriptClass(
    {
        value: 'Test'
    },
    10,
    "Coders"
);
