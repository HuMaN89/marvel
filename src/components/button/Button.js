const Button = (props) => {
  if (props.charEnded) {
    return null;
  }
  return (
    <button className="button button__main button__long">
      <div className="inner" onClick={props.onRequest}>
        load more
      </div>
    </button>
  );
};
export default Button;
