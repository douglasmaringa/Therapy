import { createSlice } from '@reduxjs/toolkit'
import { firestore } from 'firebase'
import { db} from "../base";


// Slice


const slice = createSlice({
  name: 'chatroom',
  initialState: {
    chatroom: false,
    loading:false,
    error:false
  },
  reducers: {
    chatSuccess: (state, action) => {
        state.loading = false;
      state.chatroom = true;
      },
     chatFailed: (state, action) => {
        state.error = true;
       
      },
      
      chatLoading: (state, action) => {
        state.loading = true;
       
      },
  },
});

export default slice.reducer

// Actions

const {chatLoading } = slice.actions

export const createChat = ({user,userID,state}) => async dispatch => {
   
    console.log(state)
    dispatch(chatLoading())

    db.collection('chatroom').add({
        //timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        members:[state.email,user.email],
        messages:[{"sender":"","time":"","message":"Hello I will be able to respond as soon as we verify your details"}],
        lastmessage:"",
        new:false,
    }).then(res=>{
      //adding the user into your friend list
      db.collection('clients').doc(userID[0].id).update({
       friends: firestore.FieldValue.arrayUnion(state.email)
      })
         //chatroom created
        //putting chat room id in current user user's object.
       db.collection('clients').doc(userID[0].id).update({
       chatroom: firestore.FieldValue.arrayUnion(res.id)
     })

     //putting chat room id in other users user's object
     //first we find the users object so we can get its id
    db.collection("users").where("email", "==", state.email)
        .onSnapshot((querySnapshot) => {
           //we now have the id so we can now add the chatroom to that users object
          const id2 = querySnapshot.docs.map(doc=>({ id: doc.id }))
          console.log(id2)
          db.collection('users').doc(id2[0].id).update({
            chatroom: firestore.FieldValue.arrayUnion(res.id)
          })

          //adding yourself into their friend list
      db.collection('users').doc(id2[0].id).update({
        friends: firestore.FieldValue.arrayUnion(res.id)
       })
  
    })
     
    //not neccessary for this but allows us to query the chatroom by id later on in chats page.
     db.collection('chatroom').doc(res.id).update({
      chatID: res.id
    })
     alert("chatroom id added to user object")
    
    })
}
