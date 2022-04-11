import { useState } from "react";
import { Spin, Tabs } from "antd";
import CollectionTab from "./CollectionTab";
import NoteTab from "./NoteTab";
import QuestionTab from "./QuestionTab";
import PrimaryLayout from "../../common/primaryLayout/primaryLayout";
// Styles
import "./styles.scss";

const { TabPane } = Tabs;

function ArchiveScreen(props: any) {
  const [loading, setLoading] = useState(false);
  return (
    <PrimaryLayout>
      <Spin spinning={loading}>
        <div className="collection-page-style">
          <h3 className="title3">Archives</h3>

          <div className="tab-section">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Collection" key="1">
                <CollectionTab />
              </TabPane>
              <TabPane tab="Notes" key="2">
                <NoteTab />
              </TabPane>
              <TabPane tab="Question" key="3">
                <QuestionTab />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Spin>
    </PrimaryLayout>
  );
}

export default ArchiveScreen;
