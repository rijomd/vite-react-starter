import { PageOutLine, TypeAction } from "Components/OutLine/PageOutLine";
import { UserTable } from "../Components/UserTable";

const DashBoard = () => {
    let actions: TypeAction[] = [
        {
            label: "Add",
            color: 'primary',
            onClick: () => { },
        },
        {
            label: "Save",
            color: 'warning',
            onClick: () => { },
        },
        {
            label: "Delete",
            color: 'success',
            onClick: () => { },
        },
        {
            label: "Close",
            color: 'error',
            onClick: () => { },
        },
    ];

    return (
        <PageOutLine title="Sample Page Layout" actions={actions}>
            <UserTable />
        </PageOutLine>
    )
}
export default DashBoard