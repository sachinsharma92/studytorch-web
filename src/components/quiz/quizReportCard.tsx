import { Progress } from 'antd';
import ButtonCustom from '../../common/buttons/buttonCustom';
import { RightOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

function QuizReportCard(props: any) {

	return (
		<div className="quiz-view-card-style" onClick={props.onClick} style={{ backgroundImage: `url(${props.backgroundImgae})`, backgroundColor: props.bgColor }}>
			<div className="card-style">
				<div>
					<h4 className="title4">{props.quizName}</h4>
					<p className="description">{props.collectionName}</p>
					<p className="description sm">{props.date}</p>
				</div>
				<div className="progress-section">
					<Progress type="circle"
						strokeWidth={10}
						strokeColor={'#66CB9F'}
						percent={70} width={100}
						// format={percent => `${percent}% ${'Attendance'}`}
						format={percent => <div className='progress-text'><span className='value'>{percent}%</span> <span className='text'>Attendance</span></div>}
					/>
				</div>
			</div>
			<div className="card-style center">
				<div className="marks-style">
					Avg Marks: <span>{props.marks}</span>
				</div>

				<ButtonCustom className="btn-custom" type='primary' href={props.btnAddHandler} title="See Details" icon={<RightOutlined />} />
			</div>
		</div>
	)
}

export default QuizReportCard;