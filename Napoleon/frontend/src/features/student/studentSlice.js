import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  student: {},
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.code !== action.payload);
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    updateStudentMoney: (state, action) => {
      state.student.money = action.payload;
    },
  },
});

export const { setStudents, deleteStudent, setStudent, updateStudentMoney } = studentSlice.actions;

export default studentSlice.reducer;
