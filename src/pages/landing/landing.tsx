import { Link } from 'react-router-dom';
import LogoPrimary from "../../assets/images/landing/logo.svg";
import BestFeatures from '../../components/landing/bestFeatures';
import ClientCard from '../../components/landing/clientCard';
import FooterLanding from '../../components/landing/footerLanding';
import GrowBrand from '../../components/landing/growBrand';
import LandingFaq from '../../components/landing/landingFaq';
import LandingHeroSection from '../../components/landing/landingHero';
import OurChamps from '../../components/landing/ourChamps';
import QuizZone from '../../components/landing/quizZone';
import SmartStudy from '../../components/landing/smartStudy';
import StudiePlan from '../../components/landing/studiePlan';

// Styles
import './styles.scss';

/**
 * Props
 */
interface OnboardingScreenProps { }
function LandingScreen(props: OnboardingScreenProps) {
  return (
    <div className="landing-screen">

      <div className='header-section'>
        <div className="header-sec">
          <img src={LogoPrimary} alt="" />
          <div className="action-section">
            <Link to="/" className='btn-sign-in btn'>
              Sign In
            </Link>
            <Link to="/" className='btn-sign-up btn'>
              Sign Up
            </Link>
          </div>
        </div>
        <LandingHeroSection />
      </div>

      <ClientCard />
      <BestFeatures />
      <SmartStudy />
      <QuizZone />
      <StudiePlan />
      <LandingFaq />
      <OurChamps />
      <GrowBrand />

      <FooterLanding />
    </div>
  );
}

export default LandingScreen;
