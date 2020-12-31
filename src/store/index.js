import { configureStore } from '@reduxjs/toolkit';

import auth from './slices/auth';
import notes from './slices/notes';

export default configureStore({
  reducer: {
    auth,
    notes
  }
});
