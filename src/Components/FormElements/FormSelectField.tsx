
import { InputLabel, FormHelperText, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type TypeAutoOptions = {
    label: string,
    value: string | number
}

type FormSelectFieldProps = {
    name: string;
    value: string;
    label: string;
    onChange: (data: SelectChangeEvent) => void;
    options: TypeAutoOptions[];
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
    error?: { isError: boolean; errorMsg: string | any };
    disabled?: boolean;
    required?: boolean;
}

export const FormSelectField: React.FC<FormSelectFieldProps> = ({ name, value, onChange, onBlur = () => { }, label, options = [], error,
    disabled = false, required = false }) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event);
    };

    return (
        <>
            <FormControl fullWidth={true} size='small' error={Boolean(error?.isError)}>
                <InputLabel id={`form-select-label-${name}`} >{required ? `${label} *` : label}</InputLabel>
                <Select
                    color='secondary'
                    id={`form-select-name-${name}`}
                    labelId={`form-select-label-${name}`}
                    autoComplete='off'
                    value={value}
                    label={required ? `${label} *` : label}
                    name={name}
                    onChange={handleChange}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { onBlur(e) }}
                    disabled={disabled}
                    size='small'
                    sx={{
                        "& .Mui-selected": {
                            backgroundColor: 'red',
                        },
                    }}
                >
                    {options.length > 0 && options.map((item: TypeAutoOptions, index: number) => {
                        return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    })}
                </Select>
                <FormHelperText >{error?.errorMsg || ""}</FormHelperText>
            </FormControl></>
    )
}