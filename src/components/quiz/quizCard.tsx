import { Tag, Progress, Dropdown } from 'antd';
import get from 'lodash/get';
import ButtonCustom from '../../common/buttons/buttonCustom';
import verticalDot from '../../assets/images/icons/vertical-dot.svg';

// Styles
import './styles.scss';

function QuizCard(props: any) {
  const { quiz } = props;

  const isQuizCompleted = get(quiz, 'status.value') === 0 ? false : true;
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
        <div className="tag-section">
          {!isQuizCompleted ? (
            <div className="tag-flex">
              <Tag className="tag-green">In-progress</Tag>
              {props.menuData && (
                <Dropdown
                  overlayClassName="collection-dropdown"
                  overlay={props.menuData}
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img src={verticalDot} className="icon-style" />
                  </a>
                </Dropdown>
              )}
            </div>
          ) : (
            <Tag className="tag-blue">Completed</Tag>
          )}
        </div>
      </div>
      <div className="card-style">
        {!isQuizCompleted ? (
          <div className="prgress-primary-section">
            <Progress percent={30} />
          </div>
        ) : (
          <div className="scrore-sec">
            Score : {get(quiz, 'correct_answer')}
          </div>
        )}

        {!isQuizCompleted ? (
          <ButtonCustom
            type="primary"
            onClick={props.btnAddHandler}
            title="Take quiz"
          />
        ) : (
          <ButtonCustom
            type="primary"
            onClick={props.btnAddHandler}
            title="Check Solution"
          />
        )}
      </div>
    </div>
  );
}

export default QuizCard;
