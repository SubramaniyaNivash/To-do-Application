import React from "react";
import './toDoApp.css'
import {Input, Button, Spin } from 'antd';
import CreatedToDos from "../createdToDos";
import { connect } from 'react-redux';
class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.timer = () => {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMemoCreation = this.handleMemoCreation.bind(this);
    this.storeTheMemos = this.storeTheMemos.bind(this);
  }
  componentDidMount(){
    const fetchData = () => {
      const localMemoData = localStorage.getItem('MEMO')
      if(!localMemoData){
       localStorage.setItem('MEMO', JSON.stringify([]));
     }
     else {
       this.props.handleAllMemo(JSON.parse(localMemoData));
     }
    };
    this.timer = setTimeout(() =>{
      fetchData();
      this.props.loaderStateChange();
    },3000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleInputChange(event) { 
    this.props.addButtonStateChange(false);
    this.props.onChangeMemo(event?.target?.value);
    if(this.props.memo === undefined || this.onlySpaces(event.target.value))
    {
      this.props.addButtonStateChange(true);
    }
  }
  handleMemoCreation () {
    const memoId = this.props.allMemo.length +   1  + this.props.deletedMemoCount;
    const text = this.props.memo;
    return {memoId, text}
  }
  storeTheMemos() {
    const memo =this.handleMemoCreation
    localStorage.setItem('MEMO',JSON.stringify([...this.props.allMemo,memo()]));
    this.props.handleAllMemo([...this.props.allMemo,memo()])
    this.props.onChangeMemo('');
    this.props.addButtonStateChange(true);
  }
  handleMemoChange = (data) => {
    this.props.handleAllMemo(data);
    localStorage.setItem('MEMO',JSON.stringify(data));
  }
  onlySpaces = (str) => {
    return str.trim().length === 0;
  }
  render() {
      return(
      <div>
        {this.props.loader ? <div className="loader"><Spin /></div> : 
          <React.Fragment>
            <div className="createToDoContainer">
              <Input className="createToDoInputBox" onChange={this.handleInputChange} value={this.props.memo} onPressEnter={this.storeTheMemos}/>
              <Button disabled={this.props.disableAddButton} className="Create_ToDo_Button" type="primary" onClick={this.storeTheMemos}>Create Memo</Button>
            </div>
            <CreatedToDos allMemo={this.props.allMemo} onMemosChange={this.handleMemoChange} deletedMemoCount={this.props.deletedMemoCount} onMemoDelete={this.props.handleMemoDelete} onlySpaces={this.onlySpaces}/>
          </React.Fragment>
        }
      </div>
      )
    };
  }

  const mapStateToProps = (state) => {
    return {
      number: state.number,
      memo: state.memo,
      loader: state.loader,
      disableAddButton: state.disableAddButton,
      deletedMemoCount: state.deletedMemoCount,
      allMemo: state.allMemo
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onChangeMemo: (value) => dispatch({type:'Memo_Change', payload: value}),
      loaderStateChange: () => dispatch({type:'Loader_State_Change'}),
      addButtonStateChange: (value) => dispatch({type:'Add_Button_State_Change', payload: value}),
      handleMemoDelete: () => dispatch({type:'Memo_Delete'}),
      handleAllMemo: (value) => dispatch({type:'All_Memo_Handle', payload: value}),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps )(ToDoApp);