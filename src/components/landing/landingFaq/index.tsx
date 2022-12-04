import { Collapse } from "antd";

// Styles
import "./styles.scss";

const { Panel } = Collapse;


function LandingFaq(props: any) {
  const panelData = [
    {
      title: 'How much time does it take?'
    },
    {
      title: 'What is your class naming convention?'
    },
    {
      title: 'How do you communicate?'
    },
    {
      title: 'I have a bigger project. Can you handle it?'
    },
    {
      title: 'What is your class naming convention?'
    }
  ]

  return (
    <div className="landing-faq-section">
      <div className="left-sec">
        <h4 className="title-l4">Frequently Asked Questions</h4>
      </div>
      <div className="right-sec">
        <Collapse accordion bordered={false} defaultActiveKey={['0']}>
          {panelData.map((item, index) => (
            <Panel header={<div className="nav-setting"><span className="index-number">0{index}</span> {item.title}</div>} key={index}>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Panel>
          ))}
        </Collapse>
      </div>

    </div>
  );
}

export default LandingFaq;
