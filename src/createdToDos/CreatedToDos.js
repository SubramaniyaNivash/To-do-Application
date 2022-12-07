import { Button, Table  } from "antd";
import React from "react";
import EditModal from "../editModal/EditModal";
import './createdToDos.css'
export default class CreatedToDos extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        editModalOpen: false,
        memoToBeEdited: {},
        changeMemoId:'',
      }
      this.deleteToDo = this.deleteToDo.bind(this);
      this.editToDo = this.editToDo.bind(this);
      this.editModalClose = this.editModalClose.bind(this);
      this.saveEditedMemo = this.saveEditedMemo.bind(this);
    }
    columns = [
      {
        title: 'SL No',
        dataIndex: 'slNo',
        key: 'slNo',
        render: (slNo) => <span>{slNo}</span>
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
        <Button onClick={()=>{this.editToDo(rowData)}}>Edit</Button>
        <Button onClick={()=>{this.deleteToDo(rowData)}}>Delete</Button>
        </>
      },
    ];
    deleteToDo = (rowData) =>{
      const remainingMemo = this.props.allMemo.filter((data)=>{
        if(rowData.slNo !== data.slNo){
          return data
        }
      })
      this.props.onMemosChange(remainingMemo);
    }
    editToDo = (rowData) => {
      const editingMemo = this.props.allMemo.find((data) =>{
        if(rowData.slNo === data.slNo){
          return data;
        }
      })
      this.setState({memoToBeEdited: editingMemo})
      this.setState({changeMemoId: editingMemo.slNo})
      this.setState({editModalOpen: true});
    };
    editModalClose = () =>{
      this.setState({editModalOpen: false})
    };
    onChangeMemo = (data) => {
      const changeMemoSlNo = this.state.changeMemoId
      const changeMemoText = data.target.value;
      this.setState({memoToBeEdited: {changeMemoSlNo,changeMemoText}});
    };
    saveEditedMemo = () => {
      const afterEditedMemos = this.props.allMemo.map((value)=>{
        if(value.slNo === this.state.changeMemoId){
          value.text = this.state.memoToBeEdited.changeMemoText;
        }
        return value;
      })
      this.props.onMemosChange(afterEditedMemos);
      this.setState({editModalOpen: false});
    };
  render(){
    return(
    <div>
      <Table className="Memo_Table" columns={this.columns} dataSource={this.props.allMemo} />
      <EditModal editModalOpen={this.state.editModalOpen} memoToBeEdited={this.state.memoToBeEdited} closeEditModal={this.editModalClose} onChangeMemo={this.onChangeMemo} onMemosChange={this.handleMemoChange} saveEditedMemo={this.saveEditedMemo} />
    </div>        
    )
  }
}