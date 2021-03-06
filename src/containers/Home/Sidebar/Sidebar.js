import {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faPlusCircle,
  faStar,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

import classes from './Sidebar.module.css';

import { setIsAuthenticatedFalse } from '../../../store/slices/auth';

const Sidebar = props => {
  const notesIconRef = useRef(null);
  const addIconRef = useRef(null);
  const favoriteNotesIconRef = useRef(null);

  const dispatch = useDispatch();

  const [selectedIndicatorStyleState, setSelectedIndicatorStyleState] = useState(null);

  useEffect(() => {
    let selectedIconRef;

    switch (props.selectedIcon) {
      case 'notes':
        selectedIconRef = notesIconRef;
        break;
      case 'create-note':
        selectedIconRef = addIconRef;
        break;
      case 'favorite-notes':
        selectedIconRef = favoriteNotesIconRef;
        break;
      default:
        throw new Error('Incorrect selected icon');
    }

    const selectedIndicatorStyle = {
      height: selectedIconRef.current.offsetHeight,
      top: selectedIconRef.current.offsetTop
    };

    setSelectedIndicatorStyleState(selectedIndicatorStyle);
  }, [props.selectedIcon]);

  const signOut = () => {
    firebase.auth().signOut();

    dispatch(setIsAuthenticatedFalse());
  };

  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContent}>
        <div
          className={classes.SelectedIndicator}
          style={selectedIndicatorStyleState}
        ></div>
        <div
          ref={notesIconRef}
          className={classes.Icon}
          onClick={props.onNotesSelect}
        >
          <FontAwesomeIcon
            icon={faClipboard}
            size="lg"
          />
        </div>
        <div
          ref={addIconRef}
          className={[classes.Icon, classes.AddIcon].join(' ')}
          onClick={props.onAddNoteSelect}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2x"
          />
        </div>
        <div
          ref={favoriteNotesIconRef}
          className={classes.Icon}
          onClick={props.onFavoriteNotesSelect}
        >
          <FontAwesomeIcon
            icon={faStar}
            size="lg"
          />
        </div>
        <div
          className={[classes.Icon, classes.SignOutIcon].join(' ')}
          onClick={signOut}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
