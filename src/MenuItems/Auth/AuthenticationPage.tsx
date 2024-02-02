
import { TypeOfMenuPages } from '../index';
import CottageIcon from '@mui/icons-material/Cottage';

const icons = { CottageIcon };

export const Auth: TypeOfMenuPages = {
    id: 'auth',
    title: 'Auth',
    type: 'group',
    url: "",
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.CottageIcon,
            children: [
                {
                    id: 'login',
                    title: 'Login',
                    type: 'item',
                    url: '/login',
                    target: true
                }
            ]
        }
    ]
};
