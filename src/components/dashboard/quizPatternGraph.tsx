import { Card } from 'antd';
import ScoreHighchartChart from '../charts/scoreHighchartChart';
import arrowIcon2 from '../../assets/images/icons/arrow-down2.svg';

const QuizPatternGraph = (props: any) => {
  return (
    <section className="quiz-section">
      <h3 className="title3">Quiz Score Analysis</h3>
      <div className="arrow-icon">
        <p className="description">01 - 21 March, 2021</p>
        <img src={arrowIcon2} alt="" />
      </div>

      <Card className="score-chart-card">
        <ScoreHighchartChart />
      </Card>
    </section>
  );
};

export default QuizPatternGraph;
