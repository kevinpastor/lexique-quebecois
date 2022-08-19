import { WordClass } from "./classes";
import { WordDocument } from "./word-document";

export const wordDocumentStub: WordDocument = {
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

export const anotherWordDocumentStub: WordDocument = {
    label: "quêteux",
    wordClasses: [WordClass.Nom],
    definition: "Expression pour désigner un mendiant.",
    example: "Le quêteux sur le bord de la rue faisait pitié.",
    author: "Kevin",
    slug: "queteux",
    isApproved: true,
    ip: "127.0.0.1",
    likes: [],
    dislikes: []
};
