import * as yup from "yup";

import { isValid, cleanup } from "./validation";

const validationSchema = yup
    .object({
        foo: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(32, "Ce champ ne peut pas dépasser 32 caractères.")
            .required("Ce champ est requis."),
        bar: yup
            .string()
            .trim()
            .min(2, "Ce champ ne peut pas avoir moins de 2 caractères.")
            .max(32, "Ce champ ne peut pas dépasser 32 caractères.")
            .optional()
            .transform((value: unknown): unknown | undefined => (
                value === "" ? undefined : value
            ))
    })
    .noUnknown();

describe("isValid", (): void => {
    it("should not be valid", (): void => {
        const value: unknown = {
            foo: ""
        };

        expect(isValid(value, validationSchema)).toBeFalsy();
    });

    it("should be valid", (): void => {
        const value: unknown = {
            foo: "bar",
            bar: "baz"
        };

        expect(isValid(value, validationSchema)).toBeTruthy();
    });
});

describe("cleanup", (): void => {
    it("should not cleanup anything", (): void => {
        const value: unknown = {
            foo: "bar",
            bar: "baz"
        };

        const result: unknown = cleanup(value, validationSchema);

        expect(result).toEqual(value);
    });

    it("should cleanup", (): void => {
        const value: unknown = {
            foo: "bar  ",
            bar: "  baz"
        };

        const result: unknown = cleanup(value, validationSchema);

        expect(result).not.toEqual(value);
    });
});
