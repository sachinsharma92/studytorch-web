import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

function NotesCard(props: any) {

	return (
		<div className="collection-card-style">
			<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					<MoreOutlined className="icon-style" />
				</a>
			</Dropdown>
			<Link to={props.cardHandler}>
				<a className="flex-style">
					<div className="content-sec">
						<h4 className="title4">{props.title}</h4>
						<div className="tag-section">
							<Tag className="tag-style">{props.tag}</Tag>
						</div>
						<p className="description">{props.description}</p>
					</div>
				</a>
			</Link>
		</div>
	)
}

export default NotesCard;