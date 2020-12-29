import firebase from '../firebase';

const signUp = async (email, password) => {
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

  return userCredential.user.refreshToken;
};

export default signUp;
