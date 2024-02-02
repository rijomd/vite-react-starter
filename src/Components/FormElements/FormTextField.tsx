import React, { ChangeEvent } from "react";
import { TextField, InputAdornment } from '@mui/material';

export type TextInterface = {
  label?: string;
  placeholder?: string;
  error?: { isError: boolean; errorMsg: string | undefined };
  value: string | number;
  onChange: (data: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
  required?: boolean;
  type?: string;
  fullWidth?: boolean;
  name: string;
  endAdornment?: any;
  startAdornment?: any;
  [others: string]: any;
}

export const FormTextField: React.FC<TextInterface> = (props) => {
  const { label, placeholder, error, onChange = () => { }, value, required, type, fullWidth, name, endAdornment, startAdornment, ...others } = props;

  return (
    <TextField
      variant="outlined"
      size="small"
      color={"secondary"}
      type={type}
      fullWidth={fullWidth}
      name={name}
      value={value}
      label={label}
      placeholder={placeholder}
      required={required}
      error={error?.isError}
      helperText={error?.isError ? error.errorMsg : ""}
      onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e)}
      InputProps={{
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
