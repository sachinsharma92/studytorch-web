import { Menu } from "antd";
import { Link } from "react-router-dom";
import ROUTES from "../../router";

// Icons here
import iconDashboard from "../../assets/images/icons/dashboard.svg";
import iconCollections from "../../assets/images/icons/folder.svg";
import iconShared from "../../assets/images/icons/user.svg";
import iconGroups from "../../assets/images/icons/3user.svg";
import iconPlanner from "../../assets/images/icons/calendar.svg";
import iconChecklist from "../../assets/images/icons/checklist.svg";
import iconQuiz from "../../assets/images/icons/help-circle.svg";
import { CloudDownloadOutlined } from "@ant-design/icons";

// Styles
import "./styles.scss";

export default function MenuLinks(props: any) {
  return (
    <Menu
      mode="inline"
      onClick={props.onClick}
      selectedKeys={props.selectedKeys}
      className="menu-primary-style"
    >
      <Menu.Item
        icon={<img alt="" src={iconDashboard} />}
        key={ROUTES.HOME_SCREEN}
      >
        <Link to={ROUTES.HOME_SCREEN}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        icon={<img alt="" src={iconCollections} />}
        key={ROUTES.COLLECTION_SCREEN}
      >
        <Link to={ROUTES.COLLECTION_SCREEN}>Collections</Link>
      </Menu.Item>
      <Menu.Item
        icon={<img alt="" src={iconShared} />}
        key={ROUTES.SHARED_SCREEN}
      >
        <Link to={ROUTES.SHARED_SCREEN}>Shared with me</Link>
      </Menu.Item>
      <Menu.Item
        icon={<img alt="" src={iconGroups} />}
        key={ROUTES.GROUPS_SCREEN}
      >
        <Link to={ROUTES.GROUPS_SCREEN}>Groups</Link>
      </Menu.Item>
      <Menu.Item
        icon={<img alt="" src={iconPlanner} />}
        key={ROUTES.PLANNER_SCREEN}
      >
        <Link to={ROUTES.PLANNER_SCREEN}>Planner</Link>
      </Menu.Item>
      <Menu.Item
        icon={<img alt="" src={iconChecklist} />}
        key={ROUTES.CHECKLIST_SCREEN}
      >
        <Link to={ROUTES.CHECKLIST_SCREEN}>Checklist</Link>
      </Menu.Item>
      <Menu.Item icon={<img alt="" src={iconQuiz} />} key={ROUTES.QUIZ_SCREEN}>
        <Link to={ROUTES.QUIZ_SCREEN}>Quiz</Link>
      </Menu.Item>

      <Menu.Item icon={<CloudDownloadOutlined />} key={ROUTES.ARCHIVED}>
        <Link to={ROUTES.ARCHIVED}>Archives</Link>
      </Menu.Item>
    </Menu>
  );
}
