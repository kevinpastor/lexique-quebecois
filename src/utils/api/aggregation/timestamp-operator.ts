import { type Document } from "mongodb";

export const timestampOperator = (expression: Document | string): Document => ({
    $toDouble: {
        $toDate: expression
    }
});
