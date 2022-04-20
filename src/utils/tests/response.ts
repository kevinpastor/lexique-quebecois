import { NextApiResponse } from "next";

import { RecursivePartial } from "@utils/types/recursive-partial";

interface ResponseStub {
    stub: NextApiResponse;
    status: {
        mock: jest.Mock;
        json: {
            mock: jest.Mock;
        };
        end: {
            mock: jest.Mock;
        };
    };
}

export const createResponseStub = (): ResponseStub => {
    const endMock = jest.fn();
    const jsonMock = jest.fn();
    const statusMock = jest.fn()
        .mockReturnValue({
            end: endMock,
            json: jsonMock
        });

    return {
        stub: {
            status: statusMock
        } as RecursivePartial<NextApiResponse> as NextApiResponse,
        status: {
            mock: statusMock,
            json: {
                mock: jsonMock
            },
            end: {
                mock: endMock
            }
        }
    };
};
