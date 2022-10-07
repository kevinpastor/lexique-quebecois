import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useFormikContext } from "formik";
import { ReactElement, ReactNode, useId } from "react";

import { WordClass, wordClassAbreviations, wordClasses } from "@models/classes";
import { WordRequest } from "@models/word-request";

export const WordClassPicker = (): ReactElement => {
    const { values, setFieldValue } = useFormikContext<WordRequest>();
    const id: string = useId();

    const handleChange = (event: SelectChangeEvent<Array<WordClass>>): void => {
        setFieldValue("wordClasses", event.target.value);
    };

    return (
        <FormControl>
            <InputLabel id={id}>
                Classe(s)
            </InputLabel>
            <Select
                labelId={id}
                label="Classe(s)"
                multiple
                renderValue={(selected: Array<WordClass>): ReactNode => (
                    selected.map((wordClass: WordClass): string => (
                        wordClassAbreviations[wordClass]
                    )).join(", ")
                )}
                value={values.wordClasses}
                onChange={handleChange}
            >
                {wordClasses.map((wordClass: WordClass): ReactElement => (
                    <MenuItem
                        key={wordClass}
                        value={wordClass}
                    >
                        <Checkbox checked={values.wordClasses.includes(wordClass)} />
                        <ListItemText primary={wordClass} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
