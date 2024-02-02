
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type FormSelectFieldProps = {
    value: string;
    label: string;
    onChange: (data: string) => void;
    options: Item[];
    fullWidth?: boolean;
    name?: string;
}

type Item = {
    label: string,
    value: string | number
}

export const FormSelectField: React.FC<FormSelectFieldProps> = ({ name, value, onChange, label, options = [], fullWidth = true }) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel id={`form-select-label-${label}`} >{label}</InputLabel>
            <Select
                labelId={`form-select-label-${label}`}
                id={`form-select-name-${name}`}
                value={value}
                label={label}
                name={name}
                onChange={handleChange}
                color='secondary'
                size='small'
            >
                {options.length > 0 && options.map((item: Item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}