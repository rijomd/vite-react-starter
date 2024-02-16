import React from 'react';
import { Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';

type TypeFormCheckBoxField = {
    name: string;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSmallIcon?: boolean;
}

export const FormCheckBoxField = (props: TypeFormCheckBoxField) => {
    const { required = false, disabled = false, label, checked = false, onChange, name, isSmallIcon = false } = props;
    const [selected, setSelected] = React.useState(checked);

    React.useEffect(() => {
        setSelected(checked)
    }, [checked]);

    const sx = isSmallIcon ? { height: 10, "& .MuiSvgIcon-root": { height: 16 } } : {}

    return (
        <FormGroup>
            <FormControlLabel
                label={<Typography variant='h6'>{label}</Typography>}
                id={`form-check-name-${name}`}
                control={
                    <Checkbox
                        name={name}
                        size='small'
                        sx={sx}
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