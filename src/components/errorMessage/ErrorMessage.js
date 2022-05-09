import "./ErrorMessage.scss";
import img from "./error.gif";
const ErrorMessage = () => {
  // return <img src={`${process.env.PUBLIC_URL}/error.gif`} />;
  return <img className="error" src={img} alt="Error image" />;
};

export default ErrorMessage;
