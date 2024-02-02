import { CircularProgress, Button } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { OverridableStringUnion } from '@mui/types';

import { FormElementsThemes } from "Themes/Components/FormElementsThemes";

export interface TextFieldPropsColorOverrides { }

export type TypesFormButtonField = {
  fullWidth?: boolean;
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  color?: OverridableStringUnion<'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning', TextFieldPropsColorOverrides>;
  [others: string]: any;
};

export const FormButtonField: React.FC<TypesFormButtonField> = (props) => {
  const { fullWidth = true, children, onClick = () => { }, disabled, color, ...others } = props;

  return (
    <ThemeProvider theme={FormElementsThemes}>
      <Button
        variant='contained'
        size="small"
        color={color || "primary"}
        endIcon={disabled && <CircularProgress />}
        fullWidth={fullWidth}
        onClick={onClick}
        disabled={disabled}
        {...others}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};
