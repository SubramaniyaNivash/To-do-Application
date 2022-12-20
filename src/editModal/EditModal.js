import { Input, Modal } from "antd";
import React from "react";
import PropTypes from 'prop-types';

export default class EditModal extends React.Component {
    static propTypes = {
        editModalOpen: PropTypes.bool,
        closeEditModal: PropTypes.func,
        saveEditedMemo: PropTypes.func,
        memoToBeEdited: PropTypes.object,
        onChangeMemo: PropTypes.func,
        disableOkButton: PropTypes.bool,
    };
    render() {
        const {editModalOpen, closeEditModal, saveEditedMemo,memoToBeEdited, onChangeMemo, disableOkButton} = this.props;
        return(
            <div>
                <Modal title="Edit Memo" open={editModalOpen} onCancel={closeEditModal} onOk={saveEditedMemo} okButtonProps={{disabled: disableOkButton}}>
                    <Input value={memoToBeEdited.text} onChange={onChangeMemo} onPressEnter={saveEditedMemo}/>
                </Modal>
            </div>
        )
    }
}