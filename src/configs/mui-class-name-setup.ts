import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";

import { isProductionEnvironment } from "@utils/misc/environment";

export const setupClassNameGenerator = (): void => {
    if (!isProductionEnvironment()) {
        return;
    }

    ClassNameGenerator.configure((componentName: string): string => (
        componentName.replace("Mui", "")
    ));
};

