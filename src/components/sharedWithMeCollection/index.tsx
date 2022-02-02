import SharedFolderCard from '../../components/sharedWithMeCollection/sharedWithMeFolderCard';
import { Col, Row } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';

import './styles.scss';

function SharedWithMeCollection(props: any) {
  const { onViewDetails, onRemoveSharedCollection } = props;
  return (
    <div className="shared-folder-collection-style">
      <p className="time-divider">{props.timeFilter}</p>
      <Row gutter={[20, 20]}>
        {map(get(props, 'folders', []), (folder, index) => (
          <Col xs={24} sm={6} key={index}>
            <SharedFolderCard
              folderName={get(folder, 'name')}
              id={get(folder, 'id')}
              folderColor={get(folder, 'color')}
              notes={'20'}
              quizzes={'5'}
              sharedBy={get(folder, 'collection_admin.name')}
              onViewDetails={() => onViewDetails(folder)}
              onRemoveSharedCollection={() => onRemoveSharedCollection(folder)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SharedWithMeCollection;
