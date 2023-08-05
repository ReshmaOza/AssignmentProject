import store from "../store";
import { addNewInfoReducer, editInfoReducer, deleteArray } from "../reducer/infoReducer";

const {dispatch} = store

export function addnewInfo(data) {
    //console.log('addnewInfo Action Data',  data);
    dispatch(addNewInfoReducer(data)) 
}

export function editInfo(data) {
    //console.log('editInfo Action Data', data);
    dispatch(editInfoReducer(data))
}

export function deteleArray(data){
    //console.log('deteleArray Action Data', data);
    dispatch(deleteArray(data))
}