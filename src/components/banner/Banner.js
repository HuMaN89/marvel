import "./Banner.scss";
import Avengers from "../../img/Avengers.png";
import Logo from "../../img/Avengers_logo.png";

const Banner = () => {
  return (
    <div className="app__banner">
      <img src={Avengers} alt="Avengers" />
      <div className="app__banner-text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img src={Logo} alt="Avengers logo" />
    </div>
  );
};

export default Banner;
