import React from "react";
import './toDoApp.css'
import {Input, Button, Spin } from 'antd';
import CreatedToDos from "../createdToDos";
import { connect } from 'react-redux';
import { addButtonStateChangeAction, handleAllMemoAction, handleMemoDeleteAction, loaderStateChangeAction, onChangeMemoAction } from "../store/slice";
import { onlySpaces } from "../helper/helper";
import PropTypes from 'prop-types';
class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.timer = () => {};
  }
  componentDidMount(){
    const {handleAllMemo, loaderStateChange} = this.props;
    const fetchData = () => {
      const localMemoData = localStorage.getItem('MEMO')
      if(!localMemoData){
       localStorage.setItem('MEMO', JSON.stringify([]));
     }
     else {
       handleAllMemo(JSON.parse(localMemoData));
     }
    };
    const myPromise = new Promise((resolve, reject) => {
      this.timer = setTimeout(() => {
        resolve(fetchData,loaderStateChange);
      }, 3000);
    });
    
    myPromise
      .then((res) => {res(); loaderStateChange();})
      .catch(()=>{console.log('Failed to load')})
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleInputChange = (event) => { 
    const {addButtonStateChange, onChangeMemo, memo} = this.props;
    addButtonStateChange(false);
    onChangeMemo(event?.target?.value);
    if(memo === undefined || onlySpaces(event.target.value))
    {
      addButtonStateChange(true);
    }
  }
  handleMemoCreation = () => {
    const {allMemo, deletedMemoCount, memo} = this.props;
    const memoId = allMemo.length +   1  + deletedMemoCount;
    const text = memo;
    return {memoId, text}
  }
  storeTheMemos = () => {
    const {allMemo, handleAllMemo, onChangeMemo, addButtonStateChange} = this.props;
    const memo =this.handleMemoCreation
    if(!onlySpaces(memo().text)){
      localStorage.setItem('MEMO',JSON.stringify([...allMemo,memo()]));
      handleAllMemo([...allMemo,memo()])
      onChangeMemo('');
      addButtonStateChange(true);
    }
  }
  handleMemoChange = (data) => {
    const {handleAllMemo} = this.props;
    handleAllMemo(data);
    localStorage.setItem('MEMO',JSON.stringify(data));
  }
  render() {
    const {memo, disableAddButton, allMemo, deletedMemoCount, handleMemoDelete, loader} = this.props
      return(
      <div>
        {loader ? <div className="loader"><Spin /></div> : 
          <React.Fragment>
            <div className="createToDoContainer">
              <Input className="createToDoInputBox" onChange={this.handleInputChange} value={memo} onPressEnter={this.storeTheMemos}/>
              <Button disabled={disableAddButton} type="primary" onClick={this.storeTheMemos}>Create Memo</Button>
            </div>
            <CreatedToDos allMemo={allMemo} onMemosChange={this.handleMemoChange} deletedMemoCount={deletedMemoCount} onMemoDelete={handleMemoDelete}/>
          </React.Fragment>
        }
      </div>
      )
    };
  }

  const mapStateToProps = (state) => {
    return {
      number: state.reducer.number,
      memo: state.reducer.memo,
      loader: state.reducer.loader,
      disableAddButton: state.reducer.disableAddButton,
      deletedMemoCount: state.reducer.deletedMemoCount,
      allMemo: state.reducer.allMemo
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onChangeMemo: (value) => dispatch(onChangeMemoAction(value)),
      loaderStateChange: () => dispatch(loaderStateChangeAction()),
      addButtonStateChange: (value) => dispatch(addButtonStateChangeAction(value)),
      handleMemoDelete: () => dispatch(handleMemoDeleteAction()),
      handleAllMemo: (value) => dispatch(handleAllMemoAction(value)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps )(ToDoApp);

  ToDoApp.propTypes = {
    handleAllMemo: PropTypes.func,
    loaderStateChange: PropTypes.func,
    addButtonStateChange: PropTypes.func,
    onChangeMemo:PropTypes.func,
    memo:PropTypes.string,
    allMemo:PropTypes.array,
    deletedMemoCount:PropTypes.number,
    loader: PropTypes.bool,
  };
