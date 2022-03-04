import { Progress } from 'antd';
import get from 'lodash/get';
import ButtonCustom from '../../common/buttons/buttonCustom';
import { RightOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

function QuizReportCard(props: any) {
  const { quiz, group } = props;
  console.log({ quiz, group });
  return (
    <div
      className="quiz-view-card-style"
      onClick={props.onClick}
      style={{
        backgroundImage: `url(${props.backgroundImgae})`,
        backgroundColor: props.bgColor,
      }}
    >
      <div className="card-style">
        <div>
          <h4 className="title4">{get(quiz, 'name')}</h4>
          <p className="description">{get(quiz, 'collection.name')}</p>
          <p className="description sm">{get(quiz, 'date_formatted')}</p>
        </div>
        <div className="progress-section">
          <Progress
            type="circle"
            strokeWidth={10}
            strokeColor={'#66CB9F'}
            percent={get(quiz, 'attendance')}
            width={100}
            // format={percent => `${percent}% ${'Attendance'}`}
            format={(percent) => (
              <div className="progress-text">
                <span className="value">{percent}%</span>{' '}
                <span className="text">Attendance</span>
              </div>
            )}
          />
        </div>
      </div>
      <div className="card-style center">
        <div className="marks-style">
          Avg Marks:{' '}
          <span>
            {get(quiz, 'avg_marks')}/{get(quiz, 'total_question')}
          </span>
        </div>

        <ButtonCustom
          className="btn-custom"
          type="primary"
          href={`/group/${get(group, 'id')}/quiz/${get(quiz, 'id')}`}
          title="See Details"
          icon={<RightOutlined />}
        />
      </div>
    </div>
  );
}

export default QuizReportCard;
