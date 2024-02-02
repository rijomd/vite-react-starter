
import { TypeOfMenuPages } from '../index';
import CottageIcon from '@mui/icons-material/Cottage';

const icons = { CottageIcon };

export const Dashboard: TypeOfMenuPages = {
    id: 'home',
    title: 'Home',
    // caption: 'Home page',
    type: 'group',
    url: "",
    children: [
        {
            id: 'dashboard1',
            title: 'Dashboard',
            type: 'item',
            icon: icons.CottageIcon,
            url: '/dashboard1',
            breadcrumbs: true
        }
    ]
};
