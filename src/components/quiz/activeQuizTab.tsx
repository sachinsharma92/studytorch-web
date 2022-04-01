import { Row, Col, Pagination } from 'antd';
import map from 'lodash/map';
import get from 'lodash/get';
import QuizCard from './quizCard';

const ActiveQuizTab = (props: any) => {
  const { quizzes, onClickPagination, onClickTakeQuiz } = props;
  console.log(
    'ActiveQuizTab quizzes',
    quizzes,
    get(quizzes, 'pagination.total_pages')
  );
  return (
    <div className="card-section">
      <Row gutter={32}>
        {map(get(quizzes, 'data'), (quiz, index) => (
          <Col xs={24} sm={8} key={index}>
            <QuizCard quiz={quiz} btnAddHandler={() => onClickTakeQuiz(quiz)} />
          </Col>
        ))}
      </Row>
      <div className="pagination-section">
        <Pagination
          hideOnSinglePage
          current={get(quizzes, 'pagination.current_page')}
          total={get(quizzes, 'pagination.total')}
          pageSize={get(quizzes, 'pagination.per_page')}
          onChange={(page) => {
            onClickPagination(page);
          }}
        />
      </div>
    </div>
  );
};

export default ActiveQuizTab;
