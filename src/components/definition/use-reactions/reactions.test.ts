/**
 * @jest-environment jsdom
 */
import { Method } from "~types/method";

import { like, removeLike, dislike, removeDislike } from "./reactions";

const fetchMock = jest.fn()
    .mockResolvedValue({
        ok: true
    } as Partial<Response> as Response);
global.fetch = fetchMock;

const slug: string = "gyu";

describe("like", (): void => {
    beforeEach((): void => {
        fetchMock.mockClear();
    });

    it("should like", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: true
            } as Partial<Response> as Response);

        await like(slug);

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/like`,
            expect.objectContaining({
                method: Method.PUT
            })
        );
    });

    it("should throw when unsuccessful", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: false
            } as Partial<Response> as Response);

        await expect(like(slug)).rejects.toBeDefined();

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/like`,
            expect.objectContaining({
                method: Method.PUT
            })
        );
    });
});

describe("removeLike", (): void => {
    beforeEach((): void => {
        fetchMock.mockClear();
    });

    it("should remove like", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: true
            } as Partial<Response> as Response);

        await removeLike(slug);

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/like`,
            expect.objectContaining({
                method: Method.DELETE
            })
        );
    });

    it("should throw when unsuccessful", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: false
            } as Partial<Response> as Response);

        await expect(removeLike(slug)).rejects.toBeDefined();

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/like`,
            expect.objectContaining({
                method: Method.DELETE
            })
        );
    });
});

describe("dislike", (): void => {
    beforeEach((): void => {
        fetchMock.mockClear();
    });

    it("should dislike", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: true
            } as Partial<Response> as Response);

        await dislike(slug);

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/dislike`,
            expect.objectContaining({
                method: Method.PUT
            })
        );
    });

    it("should throw when unsuccessful", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: false
            } as Partial<Response> as Response);

        await expect(dislike(slug)).rejects.toBeDefined();

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/dislike`,
            expect.objectContaining({
                method: Method.PUT
            })
        );
    });
});

describe("removeDislike", (): void => {
    beforeEach((): void => {
        fetchMock.mockClear();
    });

    it("should remove dislike", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: true
            } as Partial<Response> as Response);

        await removeDislike(slug);

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/dislike`,
            expect.objectContaining({
                method: Method.DELETE
            })
        );
    });

    it("should throw when unsuccessful", async (): Promise<void> => {
        fetchMock
            .mockResolvedValue({
                ok: false
            } as Partial<Response> as Response);

        await expect(removeDislike(slug)).rejects.toBeDefined();

        expect(fetchMock).toBeCalledWith(
            `/api/words/${slug}/dislike`,
            expect.objectContaining({
                method: Method.DELETE
            })
        );
    });
});
