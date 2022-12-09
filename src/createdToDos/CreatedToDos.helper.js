import { Button } from 'antd';
import React from 'react';
export const getTableColumns = (editToDo, deleteToDo) => {
    return [
        {
          title: 'Memo Id',
          dataIndex: 'memoId',
          key: 'memoId',
          render: (memoId) => <span>{memoId}</span>
        },
        {
          title: 'MEMO',
          dataIndex: 'text',
          key: 'text',
          render: (text) => <span>{text}</span>
        },
        {
          title: 'ACTIONS',
          dataIndex: 'actions',
          key: 'actions',
          render: (_,rowData) => <>
          <Button onClick={()=>{editToDo(rowData)}}>Edit</Button>
          <Button onClick={()=>{deleteToDo(rowData)}}>Delete</Button>
          </>
        },
      ];
}