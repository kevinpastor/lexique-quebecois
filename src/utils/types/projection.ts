/* eslint-disable @typescript-eslint/indent */
import { Document as MongoDBDocument, InferIdType, WithId } from "mongodb";

export type ExclusiveProjection<Document, Type> = Record<
    keyof Omit<WithId<Document>, keyof Type>,
    0
>;

type IdProjection<Document, Type> = Type extends { _id: InferIdType<Document> }
    ? { _id: 1 }
    : { _id: 0 };

type ConversionProjection<Document, Type> = Record<
    keyof Omit<Type, keyof Document>,
    MongoDBDocument
>;

export type InclusiveProjection<Document, Type> =
    Record<
        keyof Document & keyof Type,
        1 | MongoDBDocument
    >
    & ConversionProjection<Document, Type>
    & IdProjection<Document, Type>;
