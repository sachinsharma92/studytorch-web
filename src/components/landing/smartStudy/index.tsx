import img1 from "../../../assets/images/landing/score1.png";
import img2 from "../../../assets/images/landing/score2.png";
import img3 from "../../../assets/images/landing/score3.png";
import illustration from "../../../assets/images/landing/illustration.svg";
import { Tabs } from "antd";


// Styles
import "./styles.scss";

function SmartStudy(props: any) {

  return (
    <div className="smart-study-section">
      <div className="head-sec">
        <h4 className="title-l4">Smart study tools to keep a perfect score!</h4>
      </div>
      <div className="tab-sec">
        <Tabs centered defaultActiveKey="1">
          <Tabs.TabPane tab="Your  Collections " key="1">
            <img src={img1} alt="" className="tab-img" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Shared with you" key="2">
            <img src={img2} alt="" className="tab-img" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Your Groups" key="3">
            <img src={img3} alt="" className="tab-img" />
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div className="illustration">
        <img src={illustration} alt="" />
      </div>
    </div>
  );
}

export default SmartStudy;
