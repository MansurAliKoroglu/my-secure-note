import classes from "./Note.module.css";

const Note = props => {
  return (
    <div
      className={[classes.Note, ...props.className].join(' ')}
      onClick={props.onClick}
    >
      <span>{props.title}</span>
    </div>
  );
};

export default Note;
