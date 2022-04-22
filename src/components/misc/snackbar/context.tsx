import { createContext } from "react";

import { Props as SnackbarProps } from ".";

export interface SnackbarsContext {
    snackbarsProps: Array<SnackbarProps>;
    push: (snackbarProps: SnackbarProps) => void;
}

export const snackbarsContext = createContext<SnackbarsContext>({
    snackbarsProps: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: (_: SnackbarProps): void => { }
});

snackbarsContext.displayName = "SnackbarsContext";
