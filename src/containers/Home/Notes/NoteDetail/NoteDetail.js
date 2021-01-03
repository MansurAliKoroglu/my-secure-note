import { useParams } from 'react-router-dom';
import {
  useSelector
} from 'react-redux';
import { Formik, Form } from 'formik';

import classes from "./NoteDetail.module.css";

const NoteDetail = props => {
  const { id } = useParams();
  const note = useSelector(state => state.notes.notes[id]);

  return (
    <div
      className={classes.NoteDetail}
    >
      <Formik
        initialValues={{
          title: note.title,
          note: note.note
        }}
      >
        {
          formik => {
            return (
              <Form
                noValidate
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
