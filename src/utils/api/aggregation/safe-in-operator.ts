import { Document } from "mongodb";

export const safeInOperator = (expression: Document | string, element: unknown): Document => ({
    $cond: {
        if: {
            $isArray: expression
        },
        then: {
            $in: [
                element,
                expression
            ]
        },
        else: false
    }
});
