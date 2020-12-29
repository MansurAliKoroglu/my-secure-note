import firebase from 'firebase';

const listNotes = async () => {
  const user = firebase.auth().currentUser;

  const userNotes = [];

  const query = await firebase
    .firestore()
    .collection('user-notes')
    .doc(user.uid)
    .collection('notes')
    .get();

  return new Promise((resolve) => {
    query.forEach(note => userNotes.push(note.data()));

    resolve(userNotes);
  });
};

export default listNotes;
