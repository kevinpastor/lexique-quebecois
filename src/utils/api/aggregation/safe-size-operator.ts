import { Document } from "mongodb";

export const safeSizeOperator = (expression: Document | string): Document => ({
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
