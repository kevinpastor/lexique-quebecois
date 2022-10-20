import { Document } from "mongodb";

export const timestampOperation = (expression: Document | string): Document => ({
    $toDouble: {
        $toDate: expression
    }
});
