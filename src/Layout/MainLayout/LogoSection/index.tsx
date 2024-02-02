import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

import { config } from 'Services/Config/Config';
import { Logo } from 'Components/LogoSection/Logo';

import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { setOpenMenuAction, getCustomizationState } from "Themes/Reducer/customizationActions";

export const LogoSection = () => {
  const customization = useAppSelector(getCustomizationState);
  const dispatch = useAppDispatch();
  const defaultId = customization.defaultId;

  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch(setOpenMenuAction(defaultId))} component={Link} to={config.defaultPath}
    >
      <Logo />
    </ButtonBase>
  );
};

