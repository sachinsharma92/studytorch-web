import img1 from "../../../assets/images/landing/clients/slack.svg";
import img2 from "../../../assets/images/landing/clients/netflix.svg";
import img3 from "../../../assets/images/landing/clients/google.svg";
import img4 from "../../../assets/images/landing/clients/airbnb.svg";
import img5 from "../../../assets/images/landing/clients/uber.svg";


// Styles
import "./styles.scss";

function ClientCard(props: any) {
  const logoSection = [img1, img2, img3, img4, img5]
  return (
    <div className="client-card-section">
      {logoSection.map((item, index) => (
        <div className="logo-item" key={index}>
          <img src={item} alt="" className="hero-thumb-style" />
        </div>
      ))}
    </div>
  );
}

export default ClientCard;
