import { Row, Col, Pagination } from 'antd';
import map from 'lodash/map';
import get from 'lodash/get';
import QuizCard from './quizCard';

const CompleteQuizTab = (props: any) => {
  const { quizzes, onClickPagination, toggleCheckSolution } = props;
  return (
    <div className="card-section">
      <Row gutter={32}>
        {map(get(quizzes, 'data', []), (quiz, index) => (
          <Col sm={8} key={index}>
            <QuizCard
              quiz={quiz}
              onClick={() => {
                toggleCheckSolution(quiz);
              }}
            />
          </Col>
        ))}
      </Row>
      <div className="pagination-section">
        <Pagination
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

export default CompleteQuizTab;
