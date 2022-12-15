import { Table  } from "antd";
import React from "react";
import EditModal from "../editModal";
import './createdToDos.css'
import { getTableColumns } from "./CreatedToDos.helper";
import { connect } from 'react-redux';
import { handleChangeMemoIdAction, handleEditModalAction, handleMemoToBeEditedAction, handleOkButtonAction } from "../store/slice";
class CreatedToDos extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
      super(props);
    }
    deleteToDo = (rowData) =>{
      const {allMemo, onMemosChange, onMemoDelete} = this.props;
      onMemoDelete();
      const remainingMemo = allMemo.filter((data)=>{
        if(rowData.memoId !== data.memoId){
          return data
        }
        return null;
      })
      onMemosChange(remainingMemo);
    }
    editToDo = (rowData) => {
      this.props.handleEditModal(true);
      const {allMemo} = this.props;
      const editingMemo = allMemo.find((data) =>{
        if(rowData.memoId === data.memoId){
          return data;
        }
        return null;
      })
      this.props.handleMemoToBeEdited(editingMemo);
      this.props.handleChangeMemoId(editingMemo.memoId);
    };
    editModalClose = () =>{
      this.props.handleEditModal(false);
    };
    onChangeMemo = (data) => {
      const {onlySpaces} = this.props;
      this.props.handleOkButton(false);
      const memoId = this.props.changedMemoId
      const text = data.target.value;
      if(text === undefined || onlySpaces(text))
      {
        this.props.handleOkButton(true);
      }
      this.props.handleMemoToBeEdited({memoId,text});
    };
    saveEditedMemo = () => {
      const {allMemo, onMemosChange} = this.props;
      const afterEditedMemos = allMemo.map((value)=>{
        if(value.memoId === this.props.changedMemoId){
          var obj = {...value}; // This part is done because it shows Cannot assign to read only property 'text' of object error message
          obj.text = this.props.memoToBeEdited.text;
        }
        return obj || value;
      })
      onMemosChange(afterEditedMemos);
      this.props.handleEditModal(false);
    };
    uniqueKeyGenerator = () => {
      return `row_${ Math.random()}`
    };
  render(){
    const {allMemo} = this.props;
    const columns = getTableColumns(this.editToDo, this.deleteToDo);
    return(
    <div>
      <Table className="Memo_Table" columns={columns} dataSource={allMemo} rowKey={this.uniqueKeyGenerator}/>
      <EditModal editModalOpen={this.props.editModalOpen} memoToBeEdited={this.props.memoToBeEdited} closeEditModal={this.editModalClose} onChangeMemo={this.onChangeMemo} onMemosChange={this.handleMemoChange} saveEditedMemo={this.saveEditedMemo} disableOkButton={this.props.disableOkButton}/>
    </div>        
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editModalOpen: state.reducer.editModalOpen,
    memoToBeEdited: state.reducer.memoToBeEdited,
    changedMemoId:state.reducer.changedMemoId,
    disableOkButton: state.reducer.disableOkButton,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEditModal: (value) => dispatch(handleEditModalAction(value)),
    handleMemoToBeEdited: (value) => dispatch(handleMemoToBeEditedAction(value)),
    handleChangeMemoId: (value) => dispatch(handleChangeMemoIdAction(value)),
    handleOkButton: (value) => dispatch(handleOkButtonAction(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatedToDos)