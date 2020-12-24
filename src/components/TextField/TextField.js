import classes from './TextField.module.css';

const TextField = props => {
  return (
    <input
      className={[props.className, classes.TextField].join(' ')}
      placeholder={props.placeholder}
      type={props.type}
      autoFocus={props.autoFocus}
    />
  );
};

export default TextField;
