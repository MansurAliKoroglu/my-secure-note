import firebase from 'firebase';

const signIn = async (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

export default signIn;
