import firebase from 'firebase';

const signUp = async (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};

export default signUp;
