import { Button, Dropdown, Tag, Radio } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Images
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";

// Styles
import './styles.scss';

function QuestionCard(props: any) {

	return (
		<div className="question-style">
			<div className="content-sec">

				<div>
					{props.tag && <div className="tag-section">
						<Tag className="tag-style">{props.tag}</Tag>
					</div>}

					{props.questionTitle &&
						<div className="title-section">
							<div className="question-tag">Q</div>
							<h4 className="title4">{props.questionTitle}</h4>
						</div>
					}
				</div>

				<div className="button-menu">
					<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							<img src={verticalDot} />
						</a>
					</Dropdown>
				</div>
			</div>

			{props.description ?
				<div className="description-sec"><p className="description">{props.description}</p></div>
				:
				<div className="list-section">
					<Radio.Group defaultValue="a">
						<Radio.Button value="a"><span>A.</span> Hangzhou</Radio.Button>
						<Radio.Button value="b"><span>B.</span> Shanghai</Radio.Button>
						<Radio.Button value="c"><span>C.</span> Beijing</Radio.Button>
						<Radio.Button value="d"><span>D.</span> Chengdu</Radio.Button>
					</Radio.Group>
				</div>
			}


			<div className="button-section">
				<Button className="btn-outline-primary circle" icon={<EditOutlined />} />
				<Button className="btn-outline-primary circle" icon={<DeleteOutlined />} />
			</div>
		</div>
	)
}

export default QuestionCard;