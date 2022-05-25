import { Document } from "mongodb";

export const countArrayOperation = (expression: Document | string): Document => ({
    $cond: {
        if: {
            $isArray: expression
        },
        then: {
            $size: expression
        },
        else: 0
    }
});
