import { useParams } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { Formik, Form } from 'formik';

import classes from "./NoteDetail.module.css";

import { updateNote } from '../../../../store/slices/notes';

const NoteDetail = props => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const note = useSelector(state => state.notes.notes[id]);

  let saveChangesTimer;

  const formSubmitHandler = values => {
    clearTimeout(saveChangesTimer);

    saveChangesTimer = setTimeout(() => {
      dispatch(updateNote({
        id: note.id,
        title: values.title,
        note: values.note
      }));
    }, 500);
  };

  return (
    <div
      className={classes.NoteDetail}
    >
      <Formik
        initialValues={{
          title: note.title,
          note: note.note
        }}
        onSubmit={formSubmitHandler}
      >
        {
          formik => {
            return (
              <Form
                noValidate
                onChange={formik.submitForm}
              >
                <input
                  {...formik.getFieldProps('title')}
                  className={classes.Input}
                />
                <textarea
                  {...formik.getFieldProps('note')}
                  className={[classes.Input, classes.NoteField].join(' ')}
                />
              </Form>
            )
          }
        }
      </Formik>
    </div>
  );
};

export default NoteDetail;
