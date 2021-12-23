import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tag, Button } from 'antd';
import { MoreOutlined, EditOutlined } from '@ant-design/icons';

// Images
import shareIcon from "../../../assets/images/icons/external-link.svg";
import quickIcon from "../../../assets/images/icons/quick.svg";

// Styles
import './styles.scss';

function FlashCard(props: any) {

	return (
		<div className="flash-card-style">

			<div className="flex-style">
				<div className="content-sec">
					<div className="title-section">
						<img src={quickIcon} alt="" />
						<h4 className="title4">{props.title}</h4>
					</div>

					<div className="button-section">
						<Link to="/"><img src={shareIcon} alt="" /></Link>
						<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
							<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
								<MoreOutlined className="icon-style" />
							</a>
						</Dropdown>
					</div>
				</div>
				<p className="description">{props.description}</p>
			</div>
		</div>
	)
}

export default FlashCard;