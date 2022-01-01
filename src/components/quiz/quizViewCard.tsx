import { Row, Col, Tag, Progress } from 'antd';
import ButtonCustom from '../../common/buttons/buttonCustom';

// Styles
import './styles.scss';

function QuizViewCard(props: any) {

	return (
		<div className="quiz-view-card-style" style={{ backgroundImage: `url(${props.backgroundImgae})`, backgroundColor: props.bgColor }}>
			<div className="card-style">
				<div>
					<h4 className="title4">{props.quizName}</h4>
					<p className="description">{props.collectionName}</p>
					<p className="description sm">{props.date}</p>
				</div>
				<div className="tag-section">
					<Tag className="tag-green">In-progress</Tag>
				</div>
			</div>
			<div className="card-style">
				<div className="prgress-primary-section">
					<Progress percent={30} />
				</div>
				<ButtonCustom type='primary' onClick={props.btnAddHandler} title="Take quiz" />
			</div>
		</div>
	)
}

export default QuizViewCard;