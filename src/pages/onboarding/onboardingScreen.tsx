import { Carousel, Button } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { OFF_ONBOARDING } from '../../constants/actions';
import ROUTES from '../../router';
import { Navigate } from 'react-router-dom';
import onboarding1 from '../../assets/images/onboarding/onboarding-card-1.svg';
import onboarding2 from '../../assets/images/onboarding/onboarding-card-2.svg';
import onboarding3 from '../../assets/images/onboarding/onboarding-card-3.svg';

// Styles
import './styles.scss';

/**
 * Props
 */
interface OnboardingScreenProps {}
function OnboardingScreen(props: OnboardingScreenProps) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => get(state, 'userState.isLoggedIn'));
  const showOnBoarding = useSelector((state) =>
    get(state, 'userState.showOnBoarding')
  );

  const onSkip = () => {
    dispatch({
      type: OFF_ONBOARDING,
    });
  };

  const settings = {
    nextArrow: <h2>Next</h2>,
    prevArrow: (
      <Button
        type={'text'}
        onClick={() => {
          alert('button');
        }}
      >
        Skip
      </Button>
    ),
    prev: () => {
      alert('called');
    },
  };

  if (isLoggedIn && !showOnBoarding) {
    return <Navigate to={ROUTES.HOME_SCREEN} />;
  }

  const onChangeIndex = (index: number) => {
    if (index === 2) {
      onSkip();
    }
  };

  return (
    <div className="onboarding-screen-style">
      <div className="card slider-custom">
        <Carousel arrows {...settings} beforeChange={onChangeIndex}>
          <div>
            <img src={onboarding1} />
            <div className="body-content">
              <h3 className="title3">
                Welcome to <span>StudyTorch</span>{' '}
              </h3>
              <p className="description">
                I provide essential stuff for your ui designs every tuesday!
              </p>
            </div>
          </div>
          <div>
            <img src={onboarding2} />
            <div className="body-content">
              <h3 className="title3">
                Welcome to <span>StudyTorch</span>{' '}
              </h3>
              <p className="description">
                I provide essential stuff for your ui designs every tuesday!
              </p>
            </div>
          </div>
          <div>
            <img src={onboarding3} />
            <div className="body-content">
              <h3 className="title3">
                Welcome to <span>StudyTorch</span>{' '}
              </h3>
              <p className="description">
                I provide essential stuff for your ui designs every tuesday!
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default OnboardingScreen;
