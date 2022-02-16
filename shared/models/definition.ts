import { isObject, isString } from "../utils/validators";

export interface Definition {
    label: string;
    definition: string;
    example: string;
    author?: string;
    timestamp: Date;
}

export const isValidDefinition = (definition: any): definition is Definition => (
    isObject(definition)
    && isString(definition.label)
    && isString(definition.definition)
    && isString(definition.example)
    && isString(definition.author)
    && isString(definition.timestamp)
);

export const cleanDefinition = (definition: any): Definition => ({
    label: definition.label,
    definition: definition.definition,
    example: definition.example,
    author: definition.author,
    timestamp: definition.timestamp
})