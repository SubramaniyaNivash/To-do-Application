import { Button, Table  } from "antd";
import React from "react";
import './CreatedToDos.css'
export default function CreatedToDos () {
    const memoInLocalStorage = JSON.parse(localStorage.getItem('MEMO'));
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
          render: () => <>
          <Button>Edit</Button>
          <Button>Delete</Button>
          </>
        },
      ];
    return(
        <div>
            <Table className="Memo_Table" columns={columns} dataSource={memoInLocalStorage} />
        </div>
    )
}