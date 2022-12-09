import { Table  } from "antd";
import React from "react";
import EditModal from "../editModal";
import './createdToDos.css'
import { getTableColumns } from "./CreatedToDos.helper";
export default class CreatedToDos extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        editModalOpen: false,
        memoToBeEdited: {},
        changeMemoId:'',
      }
    }
    deleteToDo = (rowData) =>{
      const {allMemo, onMemosChange, onMemoDelete} = this.props;
      onMemoDelete();
      const remainingMemo = allMemo.filter((data)=>{
        if(rowData.memoId !== data.memoId){
          return data
        }
      })
      onMemosChange(remainingMemo);
    }
    editToDo = (rowData) => {
      const {allMemo} = this.props;
      const editingMemo = allMemo.find((data) =>{
        if(rowData.memoId === data.memoId){
          return data;
        }
      })
      this.setState({memoToBeEdited: editingMemo,changeMemoId: editingMemo.memoId,editModalOpen: true })
    };
    editModalClose = () =>{
      this.setState({editModalOpen: false})
    };
    onChangeMemo = (data) => {
      const {changeMemoId } = this.state;
      const memoId = changeMemoId
      const text = data.target.value;
      this.setState({memoToBeEdited: {memoId,text}});
    };
    saveEditedMemo = () => {
      const {changeMemoId, memoToBeEdited} = this.state;
      const {allMemo, onMemosChange} = this.props;
      const afterEditedMemos = allMemo.map((value)=>{
        if(value.memoId === changeMemoId){
          value.text = memoToBeEdited.text;
        }
        return value;
      })
      onMemosChange(afterEditedMemos);
      this.setState({editModalOpen: false});
    };
  render(){
    const {editModalOpen, memoToBeEdited} = this.state
    const {allMemo} = this.props;
    const columns = getTableColumns(this.editToDo, this.deleteToDo);
    return(
    <div>
      <Table className="Memo_Table" columns={columns} dataSource={allMemo} />
      <EditModal editModalOpen={editModalOpen} memoToBeEdited={memoToBeEdited} closeEditModal={this.editModalClose} onChangeMemo={this.onChangeMemo} onMemosChange={this.handleMemoChange} saveEditedMemo={this.saveEditedMemo} />
    </div>        
    )
  }
}