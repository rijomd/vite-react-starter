import React, { useState, useRef } from "react";

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { Modal, ModalAction } from 'Components/Modals/Modal';

import { UserForm } from "../Components/UserForm";
import { UserTable } from "../Components/UserTable";

const DashBoard = () => {
    const [openModal, setOpenModal] = useState(false);
    const formRef: React.MutableRefObject<any> = useRef(null);

    let actions: ModalAction[] = [
        {
            label: "Save",
            color: 'success',
            onClick: () => { formRef.current.handleSubmit() },
        },
        {
            label: "Clear",
            color: 'info',
            onClick: () => { formRef.current.handleClear() },
        },
        {
            label: "Close",
            color: 'error',
            onClick: () => setOpenModal(false),
        },
    ];

    return (
        <PageOutLine actions={actions} title="Sample Data">
            <>
                <UserTable openAddForm={() => setOpenModal(true)} />
                <Modal actions={actions} title="Add Sample Data" open={openModal} handleClose={() => setOpenModal(false)}>
                    <UserForm formRef={formRef} />
                </Modal>
            </>
        </PageOutLine>
    )
}
export default DashBoard