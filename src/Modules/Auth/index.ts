import AuthSlice from './Reducer/AuthSlice';
import Routes from './Router';

const containers = {
    "reducer": AuthSlice,
    "router": Routes,
    "moduleName": "Auth",
    "parentModuleName": "Authentication"
}

export default containers