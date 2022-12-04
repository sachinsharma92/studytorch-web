import { useState } from "react";
import img1 from "../../../assets/images/landing/quiz1.png";
import img2 from "../../../assets/images/landing/quiz2.png";
import handImage from "../../../assets/images/landing/hand.svg";

// Styles
import "./styles.scss";


function QuizZone(props: any) {

  const [tabNav, setTabNav] = useState(0)

  return (
    <div className="quiz-zone-section">
      <div className="tab-content-sec">
        {!tabNav ?
          <div className="img-box">
            <img src={img1} alt="" className="tab-img" />
          </div>
          :
          <div className="img-box">
            <img src={img2} alt="" className="tab-img" />
          </div>
        }

        {tabNav === 0 && <div className="with-hand">
          <img src={handImage} alt="" />
        </div>}
      </div>

      <div className="tab-sec">
        <div className="right-section">
          <h4 className="title-l4">Step into the Quiz Zone</h4>
          <p className="description">Study Torch enables teachers quickly find and create fun quizzes that meet the student's curriculum. And our little genius to seal their learning deal with exclusive quizzes.</p>
        </div>

        <div className="tab-button-sec">
          <button className={`nav-section ${tabNav === 0 && "tab-active"}`} onClick={() => setTabNav(0)}>
            <div className="heading">
              <div className="number">1</div>
              <h4 className="title-l4">Create quizzes</h4>
            </div>
            <p className="description">Study Torch enables teachers quickly find and create fun quizzes that meet the student's curriculum. And our little genius to seal their learning deal with exclusive quizzes.</p>
          </button>

          <button className={`nav-section ${tabNav === 1 && "tab-active"}`} onClick={() => setTabNav(1)}>
            <div className="heading">
              <div className="number">2</div>
              <h4 className="title-l4">Quiz for Students</h4>
            </div>
            <p className="description">Study Torch enables teachers quickly find and create fun quizzes that meet the student's curriculum. And our little genius to seal their learning deal with exclusive quizzes.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizZone;
