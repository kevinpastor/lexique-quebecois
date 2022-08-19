import { WordClass } from "@models/classes";
import { WordDocument } from "@models/word-document";
import { getSlug } from "@models/word-request";

const wordDocumentStub: WordDocument = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin",
    slug: "gyu",
    ip: "127.0.0.1",
    isApproved: false,
    likes: [],
    dislikes: []
};

describe("getSlug", (): void => {
    it("should get slug", (): void => {
        const { label, slug }: WordDocument = wordDocumentStub;

        const result: string = getSlug(label);

        expect(result).toEqual(slug);
    });
});
