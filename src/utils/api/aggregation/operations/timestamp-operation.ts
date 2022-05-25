import { Document } from "mongodb";

export const timestampOperation = (): Document => ({
    $toDouble: {
        $toDate: "$_id"
    }
});
