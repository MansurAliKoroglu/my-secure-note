import firebase from 'firebase';

const updateNote = async note => {
  const user = firebase.auth().currentUser;

  await firebase
    .firestore()
    .collection('user-notes')
    .doc(user.uid)
    .collection('notes')
    .doc(note.id)
    .update({
      title: note.title,
      note: note.note
    });
};

export default updateNote;
