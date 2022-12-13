export const  handleEditModalAction = (value) => {
    return {type:'Edit_Modal', payload: value}
};
export const handleMemoToBeEditedAction = (value) => {
    return {type:'Memo_To_Be_Edited', payload: value}
};
export const handleChangeMemoIdAction = (value) => {
    return {type:'Changed_Memo_Id', payload: value}
}
export const handleOkButtonAction = (value) => {
    return {type:'Ok_Button', payload: value}
};