import { ReactElement } from "react";

import { Button } from "@components/form/button";

interface Props {
    title: string;
    content?: string;
    isOpened: boolean;
    onDismiss?: () => void;
}

export const Alert = ({
    title,
    content,
    isOpened,
    onDismiss
}: Props): ReactElement | null => {
    const handleDismiss = (): void => {
        if (onDismiss) {
            onDismiss();
        }
    };

    if (!isOpened) {
        return null;
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center backdrop-blur">
            <div className="container mx-auto p-4 flex justify-center items-center">
                <section className="bg-slate-800 rounded-lg p-8 space-y-8 shadow-xl w-full lg:w-1/2">
                    <div className="space-y-4">
                        <div className="text-4xl font-bold text-white font-serif">
                            {title}
                        </div>
                        {content &&
                            <div className="text-white font-medium">
                                {content}
                            </div>
                        }
                    </div>
                    <div className="flex flex-row-reverse">
                        <Button
                            onClick={handleDismiss}
                            label="OK"
                            ariaLabel="OK"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};
