import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { type ReactElement, type ReactNode, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { type WithToken } from "~/types/with-token";
import { type WordClass, wordClassAbreviations, wordClasses } from "~/types/word-class";
import { type WordRequest } from "~/types/word-request";

export const WordClassPicker = (): ReactNode => {
    const { control } = useFormContext<WithToken<WordRequest>>();

    const id: string = useId();

    return (
        <Controller
            name="wordClasses"
            control={control}
            render={({
                field: { value, onChange: handleChange, onBlur: handleBlur, ref },
                fieldState: { error },
                formState: { isSubmitting }
            }): ReactElement => (
                <FormControl error={error !== undefined}>
                    <InputLabel id={id}>
                        Classe(s)
                    </InputLabel>
                    <Select
                        label="Classe(s)"
                        labelId={id}
                        multiple
                        renderValue={(selected: Array<WordClass>): ReactNode => (
                            selected.map((wordClass: WordClass): string => (
                                wordClassAbreviations[wordClass]
                            )).join(", ")
                        )}
                        value={value}
                        onChange={handleChange}
                        inputRef={ref}
                        onBlur={handleBlur}
                        error={error !== undefined}
                        disabled={isSubmitting}
                    >
                        {wordClasses.map((wordClass: WordClass): ReactNode => (
                            <MenuItem
                                key={wordClass}
                                value={wordClass}
                            >
                                <Checkbox checked={value.includes(wordClass)} />
                                <ListItemText primary={wordClass} />
                            </MenuItem>
                        ))}
                    </Select>
                    {error && (
                        <FormHelperText>
                            {error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};
