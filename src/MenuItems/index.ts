

import { Auth } from './Auth/AuthenticationPage';
import { Dashboard } from './Home/DashBoardPage';

type TypeChip = {
    label: string;
    onDelete?: () => void;
    color?: 'primary' | 'secondary' | 'default';
    variant?: 'filled' | 'outlined';
    avatar: any
}

export type TypeOfMenuPages = {
    id: string,
    title: string,
    caption?: string,
    type: 'group' | 'collapse' | 'item',
    icon?: any, //icon
    separator?:any, // breadcrumbs separator
    children?: any,
    url: string,
    target?: boolean,
    breadcrumbs?: boolean,
    external?: boolean,
    disabled?: boolean,
    chip?: TypeChip,
    titleBottom?:boolean
}

const menuItems = {
    items: [Dashboard, Auth]
};

export default menuItems;
