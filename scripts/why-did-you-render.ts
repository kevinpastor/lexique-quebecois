import * as MuiModule from "@mui/material";
import * as MuiStylesModule from "@mui/material/styles";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import React from "react";

const muiComponentsName = Object.keys(MuiModule)
    .filter((moduleName) => (/^[A-Z]/.test(moduleName)));
const muiStylesComponentsName = Object.keys(MuiStylesModule)
    .filter((moduleName) => (/^[A-Z]/.test(moduleName)));

const componentsNameToExclude = [
    ...muiComponentsName,
    ...muiStylesComponentsName,
    "EmotionGlobal",
    "Insertion"
]
    .map((componentName) => {
        const prefix = "Experimental_";
        if (!componentName.startsWith(prefix)) {
            return componentName;
        }

        return [
            componentName,
            componentName.slice(prefix.length)
        ];
    })
    .flat()
    .map((componentName) => ([
        componentName,
        `${componentName}Component`
    ]))
    .flat();

whyDidYouRender(React, {
    // Necessary for a compatibility bug with Next.js.
    include: [/./],
    exclude: [
        ...componentsNameToExclude.map((moduleName) => (new RegExp(`^${moduleName}$`))),
        /^Mui/,
        /^Motion/,
        /^PresenceChild$/,
        /^SpeedInsights/,
        /^HotReload$/,
        /^OuterLayoutRouter$/,
        /^RenderFromTemplateContext$/,
        /^ScrollAndFocusHandler$/
    ]
});
