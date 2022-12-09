import React from "react";
import './toDoApp.css'
import {Input, Button, Spin } from 'antd';
import CreatedToDos from "../createdToDos";
export default class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: '',
      allMemo: [],
      loader: true,
      deletedMemoCount: 0,
      disableAddButton: true,
    }
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
       this.setState({allMemo: JSON.parse(localMemoData)})
     }
    };
    this.timer = setTimeout(() =>{
      fetchData();
      this.setState({loader: false});
    },3000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleInputChange(event) {
    const {memo} = this.state;
    this.setState({disableAddButton: false});
    this.setState({ memo: event?.target?.value})
    if(memo === undefined || this.onlySpaces(event.target.value))
    {
      this.setState({disableAddButton: true})
    }
  }
  handleMemoCreation () {
    const {allMemo, memo, deletedMemoCount} = this.state
    const memoId = allMemo.length +   1  + deletedMemoCount;
    const text = memo;
    return {memoId, text}
  }
  storeTheMemos() {
    const {allMemo} = this.state
    const memo =this.handleMemoCreation
    localStorage.setItem('MEMO',JSON.stringify([...allMemo,memo()]));
    this.setState({allMemo: [...allMemo,memo()], memo: ''});
  }
  handleMemoChange = (data) => {
    this.setState({allMemo: data });
    localStorage.setItem('MEMO',JSON.stringify(data));
  }
  handleMemoDelete = () => { 
    const {deletedMemoCount} = this.state
    this.setState({deletedMemoCount: deletedMemoCount + 1});
  }
  onlySpaces = (str) => {
    return str.trim().length === 0;
  }
  render() {
    const {memo, loader, allMemo, deletedMemoCount, disableAddButton} = this.state
      return(
      <div>
        {loader ? <Spin /> : 
          <React.Fragment>
            <div className="createToDoContainer">
              <Input className="createToDoInputBox" onChange={this.handleInputChange} value={memo} onPressEnter={this.storeTheMemos}/>
              <Button disabled={disableAddButton} className="Create_ToDo_Button" type="primary" onClick={this.storeTheMemos}>Create Memo</Button>
            </div>
            <CreatedToDos allMemo={allMemo} onMemosChange={this.handleMemoChange} deletedMemoCount={deletedMemoCount} onMemoDelete={this.handleMemoDelete} onlySpaces={this.onlySpaces}/>
          </React.Fragment>
        }
      </div>
      ) };
  }