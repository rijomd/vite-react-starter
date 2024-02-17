import React, { useState, useRef } from "react";

import { PageOutLine, PageActions } from "Components/OutLine/PageOutLine";
import { Modal } from 'Components/Modals/Modal';

import { UserForm } from "../Components/UserForm";
import { UserTable } from "../Components/UserTable";

const DashBoard = () => {
    const [openModal, setOpenModal] = useState(false);
    const formRef: React.MutableRefObject<any> = useRef(null);

    const onAction = (name: string) => {
        name === 'success' ? formRef.current.handleSubmit() : formRef.current.handleClear()
    }

    return (
        <PageOutLine>
            <>
                <UserTable openAddForm={() => setOpenModal(true)} />
                <Modal title="Add Sample Data" open={openModal} handleClose={() => setOpenModal(false)} onAction={onAction}>
                    <UserForm formRef={formRef} />
                </Modal>
            </>
        </PageOutLine>
    )
}
export default DashBoard