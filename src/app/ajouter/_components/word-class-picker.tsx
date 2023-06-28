import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { ReactElement, ReactNode, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { WordClass, wordClassAbreviations, wordClasses } from "@models/classes";
import { WithCaptchaToken } from "@models/with-captcha-token";
import { WordRequest } from "@models/word-request";

export const WordClassPicker = (): ReactElement => {
    const { control } = useFormContext<WithCaptchaToken<WordRequest>>();

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
                        labelId={id}
                        label="Classe(s)"
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