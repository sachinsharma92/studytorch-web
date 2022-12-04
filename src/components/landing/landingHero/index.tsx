import { Link } from "react-router-dom";
import heroLine from "../../../assets/images/landing/hero-line.svg";
import heroImage from "../../../assets/images/landing/hero-thumb.svg";
import illustration from "../../../assets/images/illustration.svg";


// Styles
import "./styles.scss";

function LandingHeroSection(props: any) {
  return (
    <div className="landing-hero-section">
      <div className="head-sec">
        <h1 className="title1">
          An App for <br /> all your study needs !
        </h1>
        <img src={heroLine} alt="" className="line-style" />
        <p className="description">
          Learning is an essential part of everyday life. Whether you're studying at home or on the go, our apps make learning fun!
        </p>
        <Link to="/" className='btn-free'>
          Try for free Now !
        </Link>
        <div className="hero-illustration-style">
          <img src={illustration} alt="" />
        </div>
      </div>

      <div className="img-section">
        <img src={heroImage} alt="" className="hero-thumb-style" />
      </div>
    </div>
  );
}

export default LandingHeroSection;
