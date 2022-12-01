import { Button, Table  } from "antd";
import React from "react";
import './CreatedToDos.css'
export default function CreatedToDos (props) {
    const {setAllMemos} = props
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
          <Button>Edit</Button>
          <Button onClick={()=>{deleteToDo(rowData)}}>Delete</Button>
          </>
        },
      ];
    return(
        <div>
            <Table className="Memo_Table" columns={columns} dataSource={memoInLocalStorage} />
        </div>
    )
}