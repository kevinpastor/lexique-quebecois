import { ReactElement } from "react";
import { Hyperlink } from "./hyperlink";

interface Props {
    value: string;
}

export const Email = ({ value }: Props): ReactElement => (
    <Hyperlink href={`mailto:${value}`}>
        {value}
    </Hyperlink>
);
