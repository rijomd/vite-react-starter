import React from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

type TypeFormCheckBoxField = {
    required?: boolean;
    disabled?: boolean;
    label: string;
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormCheckBoxField = (props: TypeFormCheckBoxField) => {
    const { required = false, disabled = false, label, checked = false, onChange } = props;

    return (
        <FormGroup>
            <FormControlLabel
                label={label}
                control={
                    <Checkbox
                        required={required}
                        disabled={disabled}
                        checked={checked}
                        onChange={onChange}
                    />
                }
            />
        </FormGroup>
    )
}