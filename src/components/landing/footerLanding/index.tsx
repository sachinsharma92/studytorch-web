import { Link } from "react-router-dom";
import LogoPrimary from "../../../assets/images/logo-theme.svg";


// Styles
import "./styles.scss";

function FooterLanding(props: any) {
  return (
    <div className="footer-landing-section">
      <img src={LogoPrimary} className="logo" alt="" />
      <div className="link-section">
        <div className="link-items">
          <Link to="/login">Login</Link>
          <Link to="/">Privacy Policy</Link>
        </div>

        <p className="description">Copyright © 2023. . All rights reserved.</p>
      </div>
    </div>
  );
}

export default FooterLanding;
