export enum WordClass {
    Nom = "Nom",
    Adjectif = "Adjectif",
    Verbe = "Verbe",
    Déterminant = "Déterminant",
    Pronom = "Pronom",
    Adverbe = "Adverbe",
    Préposition = "Préposition",
    Conjonction = "Conjonction"
}

export const wordClasses: Array<WordClass> = [
    WordClass.Nom,
    WordClass.Adjectif,
    WordClass.Verbe,
    WordClass.Déterminant,
    WordClass.Pronom,
    WordClass.Adverbe,
    WordClass.Préposition,
    WordClass.Conjonction
];

export const wordClassAbreviations: Record<WordClass, string> = {
    [WordClass.Nom]: "n.",
    [WordClass.Adjectif]: "adj.",
    [WordClass.Verbe]: "v.",
    [WordClass.Déterminant]: "dét.",
    [WordClass.Pronom]: "pron.",
    [WordClass.Adverbe]: "adv.",
    [WordClass.Préposition]: "prép.",
    [WordClass.Conjonction]: "conj."
};
