import homeSlice from './Reducer/HomeSlice';
import Routes from './Router';

const containers = {
    "reducer": homeSlice,
    "router": Routes,
    "moduleName": "Home",
    "parentModuleName": "Home",
}

export default containers;