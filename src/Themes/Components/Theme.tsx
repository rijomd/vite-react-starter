import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import colors from 'Assets/scss/themes-vars.module.scss';

import ComponentStyleOverrides from './CompStyleOverride';
import ThemePalette from './Palette';
import ThemeTypography from './Typography';

import { TypesCustomization } from '../Reducer/customizationSlice';

export const Themes = (customization: TypesCustomization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: ThemePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      },
    },
    typography: ThemeTypography(themeOption)
  };

  const themes: Theme = createTheme(themeOptions);
  themes.components = ComponentStyleOverrides(themeOption);

  return themes;
};

export default Themes;
