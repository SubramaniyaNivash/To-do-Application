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

const reducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case 'Memo_Change':
            newState.memo = action.payload;
            break;
        case 'Loader_State_Change':
            newState.loader = action.payload;
            break;
        case 'Add_Button_State_Change':
            newState.disableAddButton = action.payload;
            break;
        case 'Memo_Delete':
            newState.deletedMemoCount = newState.deletedMemoCount + 1;
            break;
        case 'All_Memo_Handle':
            newState.allMemo = action.payload;
            break;
        case 'Edit_Modal':
            newState.editModalOpen = action.payload;
            break;
        case 'Memo_To_Be_Edited':
            newState.memoToBeEdited = action.payload;
            break;
        case 'Changed_Memo_Id':
            newState.changedMemoId = action.payload;
            break;
        case 'Ok_Button':
            newState.disableOkButton= action.payload;
            break;
        default:
            break;
    }
    return newState;
};

export default reducer;