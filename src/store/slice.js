import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    memo: '',
    loader: true,
    disableAddButton:true,
    deletedMemoCount: 0,
    allMemo: [],
    editModalOpen: false,
    memoToBeEdited: {},
    changedMemoId:'',
    disableOkButton : true,
};

const toDoAppSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        onChangeMemoAction: (state, {payload}) => {
            state.memo = payload;
        },
        loaderStateChangeAction: (state) => {
            state.loader = false;
        },
        addButtonStateChangeAction: (state, {payload}) => {
            state.disableAddButton = payload;
        },
        handleMemoDeleteAction: (state, {payload}) => {
            state.deletedMemoCount = state.deletedMemoCount + 1;
        },
        handleAllMemoAction: (state, {payload}) => {
            state.allMemo = payload;
        },
        handleEditModalAction: (state, {payload}) => {
            state.editModalOpen = payload;
        },
        handleMemoToBeEditedAction: (state, {payload}) => {
            state.memoToBeEdited = payload;
        },
        handleChangeMemoIdAction: (state, {payload}) => {
            state.changedMemoId = payload;
        },
        handleOkButtonAction: (state, {payload}) => {
            state.disableOkButton = payload;
        },
    }
})

export const {onChangeMemoAction, loaderStateChangeAction, addButtonStateChangeAction, handleMemoDeleteAction, handleAllMemoAction, handleEditModalAction, handleMemoToBeEditedAction, handleChangeMemoIdAction, handleOkButtonAction} = toDoAppSlice.actions;

export default toDoAppSlice.reducer;