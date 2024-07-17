import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groups: [],
    selectedGrade: '',
    selectedGroup: '',
    classStarted: false,
};

const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setSelectedGrade: (state, action) => {
            state.selectedGrade = action.payload;
        },
        setGroup: (state, action) => {
            state.groups.push(action.payload);
        },
        setSelectedGroup: (state, action) => {
            state.selectedGroup = action.payload;
        },
        setClassStarted: (state, action) => {
            state.classStarted = action.payload;
        },
        resetState: (state) => {
            state.selectedGrade = '';
            state.selectedGroup = '';
            state.classStarted = false;
        },
    },
});

export const { setGroups, setGroup, setSelectedGrade, setSelectedGroup, setClassStarted, resetState } = groupSlice.actions;

export default groupSlice.reducer;
