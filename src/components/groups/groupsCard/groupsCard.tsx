import { Dropdown, Avatar } from 'antd';
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

function GroupsCard(props: any) {

	return (
		<div className="groups-card-style" style={{ backgroundImage: `url(${props.backgroundImgae})`, backgroundColor: props.bgColor}}>
			<Link to={props.cardHandler}>
				<div className="flex-style">
					<div className="content-sec">
						<h4 className="title4">{props.title}</h4>
						<p className="description">{props.description}</p>
					</div>

					<div className="avatar-group">
						<Avatar.Group maxCount={5}>
							<Avatar src="https://media.istockphoto.com/photos/happy-hispanic-latin-gen-z-teen-girl-blogger-smiling-face-waving-hand-picture-id1225782570?b=1&k=20&m=1225782570&s=170667a&w=0&h=5ozC3Yy_DB95ShpzQEcUlon_mk0M6rHFP4qmMdJVSqA=" />
							<Avatar src="https://media.istockphoto.com/photos/happy-indian-woman-look-at-webcam-doing-job-interview-videochat-picture-id1198252585?b=1&k=20&m=1198252585&s=170667a&w=0&h=uaxDBZ35kKZfdgqZPql1mAeuLsAEHqjS3bM0Z6w8pJM=" />
							<Avatar src="https://media.istockphoto.com/photos/young-indian-woman-online-teacher-counselor-remote-tutor-or-job-at-picture-id1262282990?b=1&k=20&m=1262282990&s=170667a&w=0&h=WVxE2fsI6DfuL2TMrFQYsEUKVF-HbIJwOiv3BunD5h4=" />
							<Avatar src="https://media.istockphoto.com/photos/modern-woman-working-from-home-picture-id623295134?b=1&k=20&m=623295134&s=170667a&w=0&h=hgfKDsBKSrxC1sbFNDyV3ctMy1ocUYQKqq1Z-PbhCo4=" />
							<Avatar src="https://media.istockphoto.com/photos/smiling-attractive-young-lady-looking-talking-to-camera-at-home-picture-id1189198083?b=1&k=20&m=1189198083&s=170667a&w=0&h=UqbTLIDgMnE7glkhwibe2nzsZAloTZr_IakuzEDVTRE=" />
							<Avatar src="https://media.istockphoto.com/photos/africanamerican-man-talking-on-web-camera-video-call-headshot-picture-id918365128?b=1&k=20&m=918365128&s=170667a&w=0&h=jkB_KrGWA-mehC8upJXU5TMOhlrkSqAms8Sw34-2p4k=" />
						</Avatar.Group>
					</div>
				</div>
			</Link>

			<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					<img src={verticalDot} className="icon-style" />
				</a>
			</Dropdown>
		</div>
	)
}

export default GroupsCard;