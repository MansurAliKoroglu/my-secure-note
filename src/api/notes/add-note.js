import firebase from 'firebase';

const addNote = async (title, note) => {
  const user = firebase.auth().currentUser;

  await firebase
    .firestore()
    .collection('user-notes')
    .doc(user.uid)
    .collection('notes')
    .add({
      title,
      note
    });
};

export default addNote;
