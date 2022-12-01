import React, { useEffect, useState } from "react";
import './CreateToDo.css'
import {Input, Button } from 'antd';
import CreatedToDos from "../createdToDos/CreatedToDos";
export default function CreateToDo() {
  const [memo, setMemo] = useState('');
  const [allMemo, setAllMemos] = useState([]);
  const onInputChange = (event) =>{
   setMemo(event?.target?.value);
  }
  useEffect(()=>{
    const localMemoData = localStorage.getItem('MEMO')
    if(!localMemoData){
      localStorage.setItem('MEMO', JSON.stringify([]));
    }
    else {
      setAllMemos(JSON.parse(localMemoData));
    }
  },[])
  const storeTheMemos = () =>{
    const slNo = allMemo.length + 1 ;
    localStorage.setItem('MEMO',JSON.stringify([...allMemo,{slNo,memo}]));
    setAllMemos([...allMemo,{slNo,memo}]);
    setMemo('');
  }
    return(
      <>
        <div className="Create_ToDo_Container">
          <Input className="Create_ToDo_Input_Box" onChange={(event)=>onInputChange(event)} value={memo}/>
          <Button disabled={!Boolean(memo)} className="Create_ToDo_Button" type="primary" onClick={storeTheMemos}>Create Memo</Button>
        </div>
        <CreatedToDos/>
      </>
    )
}