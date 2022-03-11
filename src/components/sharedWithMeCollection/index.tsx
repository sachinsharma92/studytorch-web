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
              folderName={get(folder, 'collection.name')}
              index={index}
              id={get(folder, 'collection.id')}
              folderColor={get(folder, 'collection.color')}
              notes={get(folder, 'collection.note_count')}
              quizzes={get(folder, 'collection.question_count')}
              sharedBy={get(folder, 'shared_by')}
              onViewDetails={() => onViewDetails(folder)}
              onRemoveSharedCollection={() =>
                onRemoveSharedCollection(get(folder, 'collection.id'))
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SharedWithMeCollection;
