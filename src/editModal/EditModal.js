import { Input, Modal } from "antd";
import React from "react";
export default class EditModal extends React.Component {
    render() {
        const {editModalOpen, closeEditModal, saveEditedMemo,memoToBeEdited, onChangeMemo} = this.props;
        return(
            <div>
                <Modal title="Edit Memo" open={editModalOpen} onCancel={closeEditModal} onOk={saveEditedMemo}>
                    <Input value={memoToBeEdited.text} onChange={onChangeMemo} onPressEnter={saveEditedMemo}/>
                </Modal>
            </div>
        )
    }
}