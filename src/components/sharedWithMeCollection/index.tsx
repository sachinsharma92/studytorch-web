import { SharedFolderCardProps } from "../../components/sharedWithMeCollection/sharedWithMeFolderCard";
import SharedFolderCard from "../../components/sharedWithMeCollection/sharedWithMeFolderCard"
import { Col, Row } from 'antd';

import './styles.scss';

interface SharedWithMeCollectionProps {
  timeFilter: string;
  folders: SharedFolderCardProps[]; 
}

function SharedWithMeCollection(props: SharedWithMeCollectionProps) {
  let folders = props.folders;
  return (
    <div className="shared-folder-collection-style">
      <p className="time-divider">{props.timeFilter}</p>
      <Row gutter={[20, 20]}>
        {folders.map((data, index) => (
          <Col key={index}>
            <SharedFolderCard
              folderName={data.folderName}
              folderColor={data.folderColor}
              notes={data.notes}
              quizzes={data.quizzes}
              sharedBy={data.sharedBy}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SharedWithMeCollection;