import React from "react";
import './toDo.css'
import {Input, Button } from 'antd';
import CreatedToDos from "../createdToDos/CreatedToDos";
export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: '',
      allMemo: [],
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.storeTheMemos = this.storeTheMemos.bind(this);
  }
  componentDidMount(){
     const localMemoData = localStorage.getItem('MEMO')
     if(!localMemoData){
      localStorage.setItem('MEMO', JSON.stringify([]));
    }
    else {
      this.setState({allMemo: JSON.parse(localMemoData)})
    }
  }
  onInputChange(event) {
   this.setState({ memo: event?.target?.value})
  }
  storeTheMemos() {
    const slNo = this.state.allMemo.length + 1 ;
    const text = this.state.memo;
    localStorage.setItem('MEMO',JSON.stringify([...this.state.allMemo,{slNo,text}]));
    this.setState({allMemo: [...this.state.allMemo,{slNo,text}]});
    this.setState({memo: ''});
  }
  handleMemoChange = (data) => {
    this.setState({allMemo: data });
    localStorage.setItem('MEMO',JSON.stringify(data));
  }
  render() {
      return(
      <>
        <div className="createToDoContainer">
          <Input className="createToDoInputBox" onChange={this.onInputChange} value={this.state.memo} onPressEnter={this.storeTheMemos}/>
          <Button disabled={!Boolean(this.state.memo)} className="Create_ToDo_Button" type="primary" onClick={this.storeTheMemos}>Create Memo</Button>
        </div>
        <CreatedToDos allMemo={this.state.allMemo} onMemosChange={this.handleMemoChange}/>
      </>
      ) };
  }