import { Table  } from "antd";
import React from "react";
import EditModal from "../editModal";
import './createdToDos.css'
import { getTableColumns } from "./createdToDos.helper";
import { connect } from 'react-redux';
import { handleChangeMemoIdAction, handleEditModalAction, handleMemoToBeEditedAction, handleOkButtonAction } from "../store/slice";
import { onlySpaces } from "../helper/helper";
import PropTypes from 'prop-types';

class CreatedToDos extends React.Component{
  //Type checking is done here because of Typo in static class property declaration
  static propTypes ={
    allMemo: PropTypes.array,
    onMemosChange: PropTypes.func,
    onMemoDelete: PropTypes.func,
    handleEditModal: PropTypes.func,
    handleOkButton: PropTypes.func,
    changedMemoId: PropTypes.string,
    handleMemoToBeEdited: PropTypes.func,
    handleChangeMemoId: PropTypes.func,
    memoToBeEdited: PropTypes.object,
    editModalOpen: PropTypes.bool,
    disableOkButton: PropTypes.bool,
  };
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
      const {allMemo, handleEditModal, handleMemoToBeEdited, handleChangeMemoId} = this.props;
      handleEditModal(true);
      const editingMemo = allMemo.find((data) =>{
        if(rowData.memoId === data.memoId){
          return data;
        }
        return null;
      })
      handleMemoToBeEdited(editingMemo);
      handleChangeMemoId(editingMemo.memoId);
    };
    editModalClose = () =>{
      const {handleEditModal} = this.props;
      handleEditModal(false);
    };
    onChangeMemo = (data) => {
      const {handleOkButton, changedMemoId, handleMemoToBeEdited} = this.props
      handleOkButton(false);
      const memoId = changedMemoId
      const text = data.target.value;
      if(text === undefined || onlySpaces(text))
      {
        handleOkButton(true);
      }
      handleMemoToBeEdited({memoId,text});
    };
    saveEditedMemo = () => {
      const {allMemo, onMemosChange, changedMemoId, memoToBeEdited, handleEditModal} = this.props;
      const afterEditedMemos = allMemo.map((value)=>{
        if(value.memoId === changedMemoId){
          var obj = {...value}; // This part is done because it shows Cannot assign to read only property 'text' of object error message
          obj.text = memoToBeEdited.text;
        }
        return obj || value;
      })
      onMemosChange(afterEditedMemos);
      handleEditModal(false);
    };
    uniqueKeyGenerator = () => {
      return `row_${ Math.random()}`
    };
  render(){
    const {allMemo, editModalOpen, memoToBeEdited, disableOkButton} = this.props;
    const columns = getTableColumns(this.editToDo, this.deleteToDo);
    return(
    <div>
      <Table className="memoTable" columns={columns} dataSource={allMemo} rowKey={this.uniqueKeyGenerator}/>
      <EditModal editModalOpen={editModalOpen} memoToBeEdited={memoToBeEdited} closeEditModal={this.editModalClose} onChangeMemo={this.onChangeMemo} onMemosChange={this.handleMemoChange} saveEditedMemo={this.saveEditedMemo} disableOkButton={disableOkButton}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatedToDos);