import { createContext } from "react";

import { Props as SnackbarProps } from ".";

export interface ISnackbarsContext {
    snackbarsProps: Array<SnackbarProps>;
    push: (snackbarProps: SnackbarProps) => void;
}

export const SnackbarsContext = createContext<ISnackbarsContext>({
    snackbarsProps: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: (_: SnackbarProps): void => { }
});

SnackbarsContext.displayName = "SnackbarsContext";
