// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'

export type TypeConfig = {
    basename: string,
    defaultPath: string,
    fontFamily: string,
    borderRadius: number,
}

export const config: TypeConfig = {
    basename: '/starter',
    defaultPath: '/dashboard1',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 4
};

export const REACT_APP_VERSION: string = "Version - 1.0";
