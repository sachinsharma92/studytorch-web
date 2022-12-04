import calendarIcon from "../../../assets/images/landing/calendar-icon.svg";
import calendarImage from "../../../assets/images/landing/calendar.png";

// Styles
import "./styles.scss";

function StudiePlan(props: any) {
  return (
    <div className="studie-plan-section">
      <img src={calendarIcon} alt="" className="icon-img" />
      <h4 className="title-l4">Plan your studies in advance</h4>
      <div className="calendar-image">
        <img src={calendarImage} alt="" />
      </div>
    </div>
  );
}

export default StudiePlan;
