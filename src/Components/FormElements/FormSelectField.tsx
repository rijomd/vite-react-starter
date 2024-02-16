
import { InputLabel, FormHelperText, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

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
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event);
    };

    return (
        <FormControl fullWidth={true}>
            <InputLabel id={`form-select-label-${label}`} >{required ? `${label} *` : label}</InputLabel>
            <Select
                color='secondary'
                size='small'
                labelId={`form-select-label-${label}`}
                id={`form-select-name-${name}`}
                autoComplete='off'
                value={value}
                name={name}
                onChange={handleChange}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { onBlur(e) }}
                disabled={disabled}
                fullWidth={true}
                renderValue={(selected) => {
                    return options?.filter(item => {
                        if (item?.value === selected) {
                            return true
                        }
                        return false
                    })[0]?.label
                }}
                error={Boolean(error?.isError)}
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
            <FormHelperText>{error?.errorMsg || ""}</FormHelperText>
        </FormControl>
    )
}
// .css - e276g8 - MuiButtonBase - root - MuiMenuItem - root.Mui - selected