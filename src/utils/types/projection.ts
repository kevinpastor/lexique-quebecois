/* eslint-disable @typescript-eslint/indent */
import { WithId } from "mongodb";

export type Projection<Document, Type> = Record<
    keyof Omit<
        WithId<Document>, keyof Type
    >, 0
>;
