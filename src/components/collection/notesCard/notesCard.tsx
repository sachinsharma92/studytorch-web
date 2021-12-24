import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";

// Styles
import './styles.scss';

function NotesCard(props: any) {

	return (
		<div className="note-card-style">
			<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					<img src={verticalDot} className="icon-style" />
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

			<div className="button-section">
				<Button className="btn-outline-primary circle" icon={<EditOutlined />} />
				<Button className="btn-outline-primary">Read Note</Button>
			</div>
		</div>
	)
}

export default NotesCard;