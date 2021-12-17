import { Carousel } from 'antd';
import onboarding1 from "../../assets/images/onboarding/onboarding-card-1.svg"
import onboarding2 from "../../assets/images/onboarding/onboarding-card-2.svg"
import onboarding3 from "../../assets/images/onboarding/onboarding-card-3.svg"

// Styles
import './styles.scss';

/**
 * Props
 */
interface OnboardingScreenProps {

}
function OnboardingScreen(props: OnboardingScreenProps) {

	const settings = {
		nextArrow: <h2>Next</h2>,
		prevArrow: <h2>Skip</h2>
	}

	return (
		<div className="onboarding-screen-style">
			<div className="card">
				<Carousel arrows {...settings}>
					<div>
						<img src={onboarding1} />
						<div className="body-content">
							<h3 className="title3">Welcome to <span>StudyTorch</span> </h3>
							<p className="description">
								I provide essential stuff for your
								ui designs every tuesday!
							</p>
						</div>
					</div>
					<div>
						<img src={onboarding2} />
						<div className="body-content">
							<h3 className="title3">Welcome to <span>StudyTorch</span> </h3>
							<p className="description">
								I provide essential stuff for your
								ui designs every tuesday!
							</p>
						</div>
					</div>
					<div>
						<img src={onboarding3} />
						<div className="body-content">
							<h3 className="title3">Welcome to <span>StudyTorch</span> </h3>
							<p className="description">
								I provide essential stuff for your
								ui designs every tuesday!
							</p>
						</div>
					</div>
				</Carousel>
			</div>
		</div>
	)
}

export default OnboardingScreen;
