import { describe, expect, it } from "vitest";

import { type WithToken } from "~/types/with-token";
import { WordClass } from "~/types/word-class";
import { type WordRequest, cleanWordRequestWithToken, isWordRequestWithToken } from "~/types/word-request";

const wordRequestWithTokenStub: WithToken<WordRequest> = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin",
    token: "token"
};

describe("isWordRequestWithToken", (): void => {
    describe("when given undefined", (): void => {
        it("should not be considered valid", (): void => {
            const value: unknown = undefined;

            const result: boolean = isWordRequestWithToken(value);

            expect(result).toBe(false);
        });
    });

    describe("when given an empty object", (): void => {
        it("should not be considered valid", (): void => {
            const value: unknown = {};

            const result: boolean = isWordRequestWithToken(value);

            expect(result).toBe(false);
        });
    });

    describe("when given a word request with token", (): void => {
        describe("which has an invalid label", (): void => {
            it.each([
                [""],
                [" "],
                ["  "],
                ["   "],
                ["a"],
                ["1"],
                ["&"],
                ["😀"],
                ["gyu😀"],
                ["😀gyu"],
                ["abcdefghijklmnopqrstuvwxyzabcdefg"] // More than 32 characters.
            ])("should not consider \"%s\" valid", (label: string): void => {
                const value: WithToken<WordRequest> = {
                    ...wordRequestWithTokenStub,
                    label
                };

                const result: boolean = isWordRequestWithToken(value);

                expect(result).toBe(false);
            });
        });

        describe("which has missing word classes", (): void => {
            it("should not be considered valid", (): void => {
                const result: boolean = isWordRequestWithToken({
                    ...wordRequestWithTokenStub,
                    wordClasses: undefined
                });

                expect(result).toBe(false);
            });
        });

        describe("which has an invalid word class", (): void => {
            it("should not be considered valid", (): void => {
                const result: boolean = isWordRequestWithToken({
                    ...wordRequestWithTokenStub,
                    wordClasses: ["foo"]
                });

                expect(result).toBe(false);
            });
        });

        it.each([
            ["abrier"],
            ["adon"],
            ["apanier"],
            ["apanya"],
            ["apanyae"],
            ["asteur"],
            ["asti"],
            ["awaye"],
            ["aweille"],
            ["bécosse"],
            ["ben"],
            ["beu"],
            ["bibitte"],
            ["bin"],
            ["bleuet"],
            ["bobépine"],
            ["boeufs"],
            ["bœufs"],
            ["bouette"],
            ["bs"],
            ["câlice"],
            ["câlisse"],
            ["capoter"],
            ["cave"],
            ["char"],
            ["chicken"],
            ["chum"],
            ["criss"],
            ["crisse"],
            ["crouser"],
            ["cruiser"],
            ["donper"],
            ["dumper"],
            ["écoeurant"],
            ["écœurant"],
            ["écrapouti"],
            ["enwaye"],
            ["enweille"],
            ["esti"],
            ["fak"],
            ["faque"],
            ["fouarer"],
            ["fourrer"],
            ["frette"],
            ["garnotte"],
            ["gibelotte"],
            ["giblotte"],
            ["giu"],
            ["gosse"],
            ["gosser"],
            ["gratteux"],
            ["gyu"],
            ["habitant"],
            ["icitte"],
            ["jaser"],
            ["kétaine"],
            ["kid kodak"],
            ["kleenex"],
            ["laite"],
            ["laveuse"],
            ["licher"],
            ["magasiner"],
            ["maringouin"],
            ["minoune"],
            ["mtl"],
            ["noob"],
            ["noub"],
            ["od"],
            ["osti"],
            ["pantoute"],
            ["patente"],
            ["pédé"],
            ["pentoute"],
            ["pet sauce"],
            ["peter"],
            ["pisser"],
            ["poundi"],
            ["pundi"],
            ["quétaine"],
            ["quêteux"],
            ["quoi cou beh"],
            ["quoi kou beh"],
            ["quoicoubeh"],
            ["quoikoubeh"],
            ["roteux"],
            ["roulotte"],
            ["sacrament"],
            ["sacre"],
            ["sapoud"],
            ["smat"],
            ["tabarnac"],
            ["tabarnak"],
            ["tabarnaque"],
            ["tabarnouche"],
            ["tabarouette"],
            ["tannant"],
            ["tokébak"],
            ["tokébakicitte"],
            ["tokébec"],
            ["tokébecicitte"],
            ["tokébek"],
            ["tokébekicitte"],
            ["toquébak"],
            ["toquébakicitte"],
            ["toquébec"],
            ["toquébecicitte"],
            ["torcher"],
            ["toune"],
            ["tourtière"],
            ["usagé"],
            ["vidange"],
            ["vidangeur"]
        ])("should consider \"%s\" as a valid label", (label: string): void => {
            const value: WithToken<WordRequest> = {
                ...wordRequestWithTokenStub,
                label
            };

            const result: boolean = isWordRequestWithToken(value);

            expect(result).toBe(true);
        });

        it("should be considered valid", (): void => {
            const result: boolean = isWordRequestWithToken(wordRequestWithTokenStub);

            expect(result).toBe(true);
        });
    });
});

describe("cleanWordRequestWithToken", (): void => {
    describe("when given a word request", (): void => {
        it("should not cleanup anything", (): void => {
            const result: WordRequest = cleanWordRequestWithToken(wordRequestWithTokenStub);

            expect(result).toEqual(wordRequestWithTokenStub);
        });
    });

    describe("when given an empty author", (): void => {
        it("should remove the author", (): void => {
            const value: WithToken<WordRequest> = {
                ...wordRequestWithTokenStub,
                author: ""
            };

            const result: WordRequest = cleanWordRequestWithToken(value);

            expect(result).not.toEqual(value);
            expect(result.author).toBeUndefined();
        });
    });

    describe("when given attributes with extra whitespaces", (): void => {
        it("should trim the attributes", (): void => {
            const value: WithToken<WordRequest> = {
                ...wordRequestWithTokenStub,
                author: "   John Doe   "
            };

            const result: WordRequest = cleanWordRequestWithToken(value);

            expect(result).not.toEqual(value);
            expect(result.author).toBeDefined();
        });
    });
});
