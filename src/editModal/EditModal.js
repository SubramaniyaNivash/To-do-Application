import { Input, Modal } from "antd";
import React from "react";

export default function EditModal (props) {
    const {
        editModalOpen,
        setEditModalOpen,
        memoToBeEdited,
        setMemoToBeEdited,
        memoIdToBeEdited,
        setAllMemos } = props;
    const memoInLocalStorage = JSON.parse(localStorage.getItem('MEMO'));
    const editMemo = (event) => {
        setMemoToBeEdited(event.target.value);
    };
    const saveEditedMemo = () => {
        const editedMemo = memoInLocalStorage.map((localStorageMemo)=>{
            if (memoIdToBeEdited === localStorageMemo.slNo){
                localStorageMemo.memo = memoToBeEdited;
            }
            return localStorageMemo;
          });
          setAllMemos(editedMemo);
          localStorage.setItem('MEMO', JSON.stringify(editedMemo));
          setEditModalOpen(false);
    }; 
    return(
        <div>
            <Modal title="Edit Memo" open={editModalOpen} onCancel={()=>{setEditModalOpen(false)}} onOk={()=>{saveEditedMemo()}}>
                <Input value={memoToBeEdited} onChange={(e)=>{editMemo(e)}}/>
            </Modal>
        </div>
    );
}