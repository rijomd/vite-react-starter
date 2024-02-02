import { Outlet } from 'react-router-dom';

import { Customization } from '../Customization';

export const AuthLayout = () => (
    <>
        <Outlet />
        <Customization />
    </>
);
