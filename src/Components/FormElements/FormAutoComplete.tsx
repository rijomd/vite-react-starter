import { useMemo, useState } from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { FormCheckBoxField } from './FormCheckBoxField';

export type TypeOptions = {
    label: string,
    value: string | number
}

type TypeFormAutoComplete = {
    label: string;
    name: string;
    options: TypeOptions[];
    required?: boolean;
    placeholder?: string;
    value: number | string | number[] | string[]; // single :- 3 or "apple"  multiple :- [1,2,3] or ["a","b"]
    multiple?: boolean | undefined;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
    onChange: (data: any) => void;
    error?: { isError: boolean; errorMsg: string | any };
    [others: string]: any;
}

export const FormAutoComplete = (props: TypeFormAutoComplete) => {
    const { options = [], multiple, value, disabled, label, name,
        onBlur = () => { }, error, placeholder, required, onChange, ...others } = props;

    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');

    const multiValue = (value: any, type: string) => {
        if (options?.length > 0 && value) {
            if (type === 'multi') {
                let multiValues;
                multiValues = value?.length > 0 ? options.filter((item: TypeOptions) => {
                    return value?.some((value: number | string) => item?.value === value);
                }) : []
                return multiValues;
            }
            else {
                return options.filter((item: TypeOptions) => item.value === value)?.[0] || '';
            }
        }
        return null;
    }

    const selectedValues = useMemo(
        () => multiple ? multiValue(value, 'multi') : multiValue(value, 'single'),
        [value]);

    const handleChange = (newValue: any) => {
        if (multiple) {
            onChange(newValue.map((item: TypeOptions) => item.value) || []);
        }
        else {
            onChange(newValue?.value);
        }
    }

    return (
        <Autocomplete
            size="small"
            disablePortal
            noOptionsText="No item found"
            autoHighlight
            limitTags={2}
            color="secondary"
            fullWidth={true}
            options={options}
            multiple={multiple || false}
            disabled={disabled}
            onBlur={onBlur}
            value={selectedValues || null}
            inputValue={inputValue}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue) => handleChange(newValue)}
            onInputChange={(event: React.SyntheticEvent<Element, Event>, newInputValue) => setInputValue(newInputValue)}
            getOptionLabel={(option) => option?.label || ''}
            renderTags={(value, getTagProps) =>
                value.map((option: any, index: number) => (
                    <Chip
                        label={option.label}
                        {...getTagProps({ index })}
                        sx={{
                            fontSize:'.875rem',
                            backgroundColor: theme.palette.secondary.dark,
                            color: '#fff',
                        }}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    label={label}
                    name={name}
                    helperText={error?.errorMsg || ""}
                    error={Boolean(error?.isError)}
                    required={required}
                    placeholder={placeholder}
                    autoComplete='off'
                    color="secondary"
                />
            )}
            renderOption={(props, option, { selected }) => {
                return (
                    <Box component="li"  {...props}>
                        {multiple && (
                            <FormCheckBoxField
                                name='autoComplete'
                                checked={selected}
                                isSmallIcon
                            />
                        )}
                        {option?.label}
                    </Box>
                );
            }}
            sx={{
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                    { backgroundColor: theme.palette.secondary.light, },
            }}
            {...others}
        />
    )
}