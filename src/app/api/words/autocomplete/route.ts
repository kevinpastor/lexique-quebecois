import { NextRequest, NextResponse } from "next/server";

import { Status } from "@models/status";
import { getAutocompletedWords } from "@services/api/words/get-autocompleted-words";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    if (!request.nextUrl.searchParams.has("input")) {
        return NextResponse.json(undefined, { status: Status.BadRequest });
    }

    const input: string = request.nextUrl.searchParams.get("input") as string;
    const words: Array<string> = await getAutocompletedWords(input);

    return NextResponse.json(words);
};
