import { Dropdown } from 'antd';
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";

// Styles
import './styles.scss';
import { Link } from 'react-router-dom';

function CollectionCard(props: any) {

	return (
		<div className="collection-card-style">
			<Link to={props.cardHandler}>
				<a className="flex-style">
					<img className='img-style' src={props.imgUrl} alt="" />
					<div className="content-sec">
						<h4 className="title4">{props.title}</h4>
						<p className="description">{props.description}</p>
					</div>
				</a>
			</Link>

			<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					<img src={verticalDot} className="icon-style" />
				</a>
			</Dropdown>
		</div>
	)
}

export default CollectionCard;