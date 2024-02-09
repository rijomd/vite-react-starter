import React from 'react';
import { Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';

type TypeFormCheckBoxField = {
    required?: boolean;
    disabled?: boolean;
    name: string;
    label?: string;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormCheckBoxField = (props: TypeFormCheckBoxField) => {
    const { required = false, disabled = false, label, checked = false, onChange, name } = props;
    const [selected, setSelected] = React.useState(checked);

    React.useEffect(() => {
        setSelected(checked)
    }, [checked]);

    return (
        <FormGroup>
            <FormControlLabel
                label={<Typography variant='h6'>{label}</Typography>}
                control={
                    <Checkbox
                        name={name}
                        sx={{ height: 10, "& .MuiSvgIcon-root": { height: 16 } }}
                        required={required}
                        disabled={disabled}
                        checked={selected}
                        onChange={onChange}
                    />
                }
            />
        </FormGroup>
    )
}