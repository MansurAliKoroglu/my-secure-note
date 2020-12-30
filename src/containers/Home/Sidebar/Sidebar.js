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
  return (
    <div className={classes.Sidebar}>
      <FontAwesomeIcon icon={faClipboard} size="lg" className={classes.Icon} />
      <FontAwesomeIcon icon={faPlusCircle} size="2x" className={[classes.Icon, classes.AddIcon].join(' ')} />
      <FontAwesomeIcon icon={faStar} size="lg" className={classes.Icon} />
    </div>
  );
};

export default Sidebar;
