import classes from './TextField.module.css';

const TextField = props => {
  return (
    <input
      className={[props.className, classes.TextField].join(' ')}
      placeholder={props.placeholder}
      type={props.type}
      autoFocus={props.autoFocus}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      name={props.name}
    />
  );
};

export default TextField;
