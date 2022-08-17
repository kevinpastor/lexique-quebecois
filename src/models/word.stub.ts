import { WordClass } from "./classes";
import { Word } from "./word";

export const wordStub: Word = {
    id: "507f1f77bcf86cd799439011",
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin",
    timestamp: 1645120033319,
    slug: "gyu",
    likes: 2,
    isLiked: true,
    dislikes: 0,
    isDisliked: false
};

export const anotherWordStub: Word = {
    id: "00000020f51bb4362eee2a4d",
    label: "quêteux",
    wordClasses: [WordClass.Nom],
    definition: "Expression pour désigner un mendiant.",
    example: "Le quêteux sur le bord de la rue faisait pitié.",
    author: "Kevin",
    timestamp: 1645122767705,
    slug: "queteux",
    likes: 3,
    isLiked: false,
    dislikes: 2,
    isDisliked: true
};
