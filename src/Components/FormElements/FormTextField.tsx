import React, { ChangeEvent } from "react";
import { TextField, InputAdornment } from '@mui/material';

export type TypeFormTextField = {
  name: string;
  value: string | number;
  onChange: (data: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
  label?: string;
  placeholder?: string;
  error?: { isError: boolean; errorMsg: string | any };
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
  required?: boolean;
  type?: string;
  endAdornment?: any;
  startAdornment?: any;
  [others: string]: any;
}

export const FormTextField: React.FC<TypeFormTextField> = (props) => {
  const { label, placeholder, error, onChange, onBlur = () => { }, value, required, type, name, endAdornment = null, startAdornment = null, ...others } = props;

  return (
    <TextField
      variant="outlined"
      size="small"
      color="secondary"
      id={`form-text-name-${name}`}
      autoComplete='off'
      type={type}
      fullWidth={true}
      name={name}
      value={value}
      label={label}
      placeholder={placeholder}
      required={required}
      error={Boolean(error?.isError)}
      helperText={error?.errorMsg || ""}
      onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e)}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => { onBlur(e) }}
      InputProps={startAdornment || startAdornment && {
        startAdornment: (
          <InputAdornment position="start">
            {startAdornment}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {endAdornment}
          </InputAdornment>
        ),
      }}
      {...others}
    />
  );
};
