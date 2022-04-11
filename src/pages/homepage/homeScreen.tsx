import { useSelector } from "react-redux";

import get from "lodash/get";
import PrimaryLayout from "../../common/primaryLayout/primaryLayout";

import UserProgress from "../../components/userProgress";

import requireAuth from "../../hocs/requireAuth";

// Styles
import "./styles.scss";

function HomeScreen() {
  const user = useSelector((state) => get(state, "userState.user"));

  return (
    <PrimaryLayout>
      <UserProgress user={user} isDashboard />
    </PrimaryLayout>
  );
}

export default requireAuth(HomeScreen);
