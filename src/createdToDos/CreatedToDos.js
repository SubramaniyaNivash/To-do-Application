import { Button, Table  } from "antd";
import React, { useState } from "react";
import EditModal from "../editModal/EditModal";
import './CreatedToDos.css'
export default function CreatedToDos (props) {
    const {setAllMemos} = props
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [memoToBeEdited, setMemoToBeEdited] = useState({});
    const [memoIdToBeEdited, setMemoIdToBeEdited] = useState();
    const memoInLocalStorage = JSON.parse(localStorage.getItem('MEMO'));
    const deleteToDo = (rowData) =>{
        const remainingMemo = memoInLocalStorage.filter((localStorageMemo)=>{
          if (rowData.slNo !== localStorageMemo.slNo){
            return localStorageMemo;
          }
        });
        setAllMemos(remainingMemo);
        localStorage.setItem('MEMO', JSON.stringify(remainingMemo));
      }
    const openEditModal = (rowData) => {
      const memoToEdit = memoInLocalStorage.filter((localStorageMemo) => {
        if (localStorageMemo.slNo === rowData.slNo){
          return localStorageMemo;
        }
      });
      setMemoToBeEdited(memoToEdit[0].memo);
      setMemoIdToBeEdited(memoToEdit[0].slNo);
      setEditModalOpen(true);
    };
      const columns = [
        {
          title: 'SL No',
          dataIndex: 'slNo',
          key: 'slNo',
          render: (slNo) => <span>{slNo}</span>
        },
        {
          title: 'MEMO',
          dataIndex: 'memo',
          key: 'memo',
          render: (memo) => <span>{memo}</span>
        },
        {
          title: 'ACTIONS',
          dataIndex: 'actions',
          key: 'actions',
          render: (_,rowData) => <>
          <Button onClick={()=>{openEditModal(rowData)}}>Edit</Button>
          <Button onClick={()=>{deleteToDo(rowData)}}>Delete</Button>
          </>
        },
      ];
    return(
        <div>
            <Table className="Memo_Table" columns={columns} dataSource={memoInLocalStorage} />
            <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} memoToBeEdited={memoToBeEdited} setMemoToBeEdited={setMemoToBeEdited} memoIdToBeEdited={memoIdToBeEdited} setAllMemos={setAllMemos}/>
        </div>
    )
}