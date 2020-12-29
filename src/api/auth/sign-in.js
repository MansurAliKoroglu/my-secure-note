import firebase from '../firebase';

const signIn = async (email, password) => {
  const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

  return userCredential.user.refreshToken;
};

export default signIn;
