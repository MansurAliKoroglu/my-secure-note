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
  faStar
} from '@fortawesome/free-solid-svg-icons';

import classes from './Sidebar.module.css';

const Sidebar = props => {
  const notesIconRef = useRef(null);
  const addIconRef = useRef(null);
  const favoriteNotesIconRef = useRef(null);

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
      </div>
    </div>
  );
};

export default Sidebar;
