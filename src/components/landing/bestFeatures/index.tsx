import img1 from "../../../assets/images/landing/f1.png";
import img2 from "../../../assets/images/landing/f2.png";
import img3 from "../../../assets/images/landing/f2.png";


// Styles
import "./styles.scss";
import { Link } from "react-router-dom";

function BestFeatures(props: any) {
  const logoSection = [
    {
      imgUrl: img1,
      title: 'Share in a Group',
      description: 'Make sharing and group studying more simple and effective.'
    },
    {
      imgUrl: img2,
      title: 'Collect your notes',
      description: 'With the collection feature, never lose your notes again.'
    },
    {
      imgUrl: img3,
      title: 'Quick Checklist',
      description: 'Plan, do, mark and make study easy-peasy!'
    }
  ]
  return (
    <div className="best-features-section">
      <div className="head-sec">
        <h4 className="title-l4">Best of features for you</h4>
        <p className="description">We provide many fun features that will help you manage your study needs & boost performance.</p>
        <Link to="/" className='btn-primary-landing'>
          Try for free Now !
        </Link>
      </div>
      <div className="image-sec">
        {logoSection.map((item, index) => (
          <div className="img-item" key={index}>
            <div className="logo-item">
              <img src={item.imgUrl} alt="" className="hero-thumb-style" />
            </div>
            <div className="content">
              <h4 className="title-l5">{item.title}</h4>
              <p className="description">{item.description}</p>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default BestFeatures;
