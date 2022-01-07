import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";
import FolderIconSVG from '../../../common/FolderIconSVG';

// Styles
import './styles.scss';

function CollectionCard(props: any) {

	return (
		<div className="collection-card-style">
			<Link to={props.cardHandler}>
				<a className="flex-style">
					<div className="folder-icon">
						<FolderIconSVG withUserStyle={props.withUserStyle} fillColor={props.fillColor} />
					</div>
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