import { Input, Modal } from "antd";
import React from "react";
export default class EditModal extends React.Component {
    render() {
        return(
            <div>
                <Modal title="Edit Memo" open={this.props.editModalOpen} onCancel={this.props.closeEditModal} onOk={this.props.saveEditedMemo}>
                    <Input value={this.props.memoToBeEdited.text} onChange={this.props.onChangeMemo}/>
                </Modal>
            </div>
        )
    }
}