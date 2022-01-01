import { Row, Col, Tag, Progress } from 'antd';
import ButtonCustom from '../../common/buttons/buttonCustom';

// Styles
import './styles.scss';

function QuizCard(props: any) {

	return (
		<div className="quiz-view-card-style" style={{ backgroundImage: `url(${props.backgroundImgae})`, backgroundColor: props.bgColor }}>
			<div className="card-style">
				<div>
					<h4 className="title4">{props.quizName}</h4>
					<p className="description">{props.collectionName}</p>
					<p className="description sm">{props.date}</p>
				</div>
				<div className="tag-section">
					{!props.quizComplete ?
						<Tag className="tag-green">In-progress</Tag>
						:
						<Tag className="tag-blue">Completed</Tag>
					}
				</div>
			</div>
			<div className="card-style">
				{!props.quizComplete ?
					<div className="prgress-primary-section">
						<Progress percent={30} />
					</div>
					:
					<div className="scrore-sec">
						Score : 2
					</div>
				}

				{!props.quizComplete ?
					<ButtonCustom type='primary' onClick={props.btnAddHandler} title="Take quiz" />
					:
					<ButtonCustom type='primary' onClick={props.btnAddHandler} title="Check Solution" />}
			</div>
		</div>
	)
}

export default QuizCard;