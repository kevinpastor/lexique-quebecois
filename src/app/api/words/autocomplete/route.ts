import { type NextRequest, NextResponse } from "next/server";

import { Status } from "~/types/status";

import { getAutocompletedWords } from "./get-autocompleted-words";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const input: string | null = request.nextUrl.searchParams.get("input");
    if (input === null) {
        return NextResponse.json(undefined, { status: Status.BadRequest });
    }

    const words: Array<string> = await getAutocompletedWords(input);

    return NextResponse.json(words);
};
