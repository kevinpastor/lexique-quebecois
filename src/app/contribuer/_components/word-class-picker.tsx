import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { ReactElement, ReactNode, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { WithToken } from "~/types/with-token";
import { WordClass, wordClassAbreviations, wordClasses } from "~/types/word-class";
import { WordRequest } from "~/types/word-request";

export const WordClassPicker = (): ReactElement => {
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
                        disabled={isSubmitting}
                        inputRef={ref}
                        onBlur={handleBlur}
                        error={error !== undefined}
                    >
                        {wordClasses.map((wordClass: WordClass): ReactElement => (
                            <MenuItem
                                key={wordClass}
                                value={wordClass}
                            >
                                <Checkbox checked={value.includes(wordClass)} />
                                <ListItemText primary={wordClass} />
                            </MenuItem>
                        ))}
                    </Select>
                    {error &&
                        <FormHelperText>
                            {error.message}
                        </FormHelperText>
                    }
                </FormControl>
            )}
        />
    );
};
