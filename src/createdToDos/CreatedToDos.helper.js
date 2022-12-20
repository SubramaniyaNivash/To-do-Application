import { Tooltip } from 'antd';
import './createdToDos.css';
import {FormOutlined, DeleteOutlined} from '@ant-design/icons';
import React from 'react';
export const getTableColumns = (editToDo, deleteToDo) => {
    return [
        {
          title: 'MEMO ID',
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
          <Tooltip title='Edit'>
            <FormOutlined className='Edit_Icon' onClick={()=>{editToDo(rowData)}}/>
          </Tooltip>
          <Tooltip title='Delete'>
            <DeleteOutlined className='Delete_Icon' onClick={()=>{deleteToDo(rowData)}}/>
          </Tooltip>
          </>
        },
      ];
}