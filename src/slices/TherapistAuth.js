import { createSlice } from '@reduxjs/toolkit'
import firebase from "firebase"
import { auth,db} from "../base";

// Slice

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const slice = createSlice({
  name: 'therapist',
  initialState: {
    user: initialUser,
    loading:false,
    error:false
  },
  reducers: {
    registerSuccess: (state, action) => {
        state.loading = false;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginSuccess: (state, action) => {
        state.loading = false;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    registerLoading: (state, action) => {
        state.loading = true;
        
      },
      registerFailed: (state, action) => {
        state.error = true;
       
      },
    logoutSuccess: (state, action) =>  {
      state.user = null;
      localStorage.removeItem('user')
    },
  },
});

export default slice.reducer

// Actions

const { registerSuccess,loginSuccess,registerLoading,registerFailed, logoutSuccess } = slice.actions

export const register = ({name,email,password,gender,city,ethnicity,about,education,away,image,insurance,focus,online,person,title }) => async dispatch => {
  if(away){
  try {
    dispatch(registerLoading())
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((auth )=>{
     
         db.collection('users').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            email:email,
            name:name,
            id:auth.user.uid,
            chatroom:[],
            friends:[],
            city:city,
            specialty:focus,
            gender:gender,
            ethnicity:ethnicity,
            about:about,
            education:education,
            away:away,
            image:image,
            insurance:insurance,
            online:online,
            person:person,
            title:title
           })
           db.collection('timeslots').add({
             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            dateTime:[{"slot":"","Booked":""}],
             email:email,
             bookings:[{"slot":"","email":""}],
            })
        
            dispatch(registerSuccess(auth.user))
    })
    .catch(e=> alert(e.message))
    dispatch(registerFailed())
    
  } catch (e) {
    return console.error(e.message);
  }
}else{
  alert("please fill out all fields")
}
}

export const login = ({email,password}) => async dispatch => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then((auth)=>{
        // logged in, redirect to home
        dispatch(loginSuccess(auth.user))
    }).catch(e => alert(e.message))
   
}

  

export const logout = () => async dispatch => {
  try {
    // await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}