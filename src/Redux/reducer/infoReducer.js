import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash";

const init_state = {
    infoArray: []
}

export const infoSlice = createSlice({
    name: 'infoReducer',
    initialState: init_state,
    reducers: {
        addNewInfoReducer: (state, data) => {
            //console.log("data in info new reducer", JSON.stringify(data))
            const temp = _.cloneDeep(state.infoArray)
            temp.push(data.payload)
            //console.log("temp----", temp)
            return {
                ...state,
                infoArray: temp,

            }
        },
        editInfoReducer: (state, data) => {
            const temp = _.cloneDeep(state.infoArray)
            // console.log("temp editInfoReducer reducer", JSON.stringify(temp))
            // console.log("data editInfoReducer reducer", JSON.stringify(data))
            temp[data.payload.index].firstName = data.payload.firstName
            temp[data.payload.index].lastName = data.payload.lastName
            temp[data.payload.index].dateOfBirth = data.payload.dateOfBirth
            temp[data.payload.index].marritialStatus = data.payload.marritialStatus
            temp[data.payload.index].photoUrl = data.payload.photoUrl
            return {
                ...state,
                infoArray: temp,

            }
        },
        deleteArray: (state, data) => {
            const temp = _.cloneDeep(state.infoArray)
            // console.log("temp deleteArray reducer---", JSON.stringify(temp))
            // console.log("data deleteArray reducer --", JSON.stringify(data))

            const index = _.findIndex(
                temp,
                (obj) => obj.id == data.payload.id
            );
            if (index != -1) {
                temp.splice(index, 1);
            }
            return {
                ...state,
                infoArray: temp,

            }
        }
    }
})

export const { addNewInfoReducer, editInfoReducer, deleteArray } = infoSlice.actions
export default infoSlice.reducer