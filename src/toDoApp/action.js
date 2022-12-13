export const onChangeMemoAction = (value) => {
  return {type:'Memo_Change', payload: value}  
};
export const loaderStateChangeAction = () =>{
    return {type:'Loader_State_Change'}
};
export const addButtonStateChangeAction = (value) =>{
    return {type:'Add_Button_State_Change', payload: value}
}
export const handleMemoDeleteAction = () =>{
    return {type:'Memo_Delete'};
}
export const handleAllMemoAction = (value) =>{
    return {type:'All_Memo_Handle', payload: value};
};