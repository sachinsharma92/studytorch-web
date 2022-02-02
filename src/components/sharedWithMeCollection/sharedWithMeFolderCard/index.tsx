import { Card } from 'antd';
import ROUTES from '../../../router';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/sharedWithMe/image.svg';
import FolderIconSVG from '../../../common/FolderIconSVG';
import EllipsisMenu from '../../ellipsisMenu';
import replace from 'lodash/replace';

import './styles.scss';

function SharedFolderCard(props: any) {
  const { onViewDetails, onRemoveSharedCollection } = props;
  return (
    <div className="shared-folder-card-style">
      <Card>
        <div className="top-card-layer">
          <Link
            className="top-card-layer-left"
            to={replace(ROUTES.SHARED_DETAILS_SCREEN, ':id', props.id)}
          >
            <div className="folder-icon">
              <FolderIconSVG withUserStyle fillColor={props.folderColor} />
            </div>
            <div className="collection-details">
              <div className="collection-name">
                <p>{props.folderName}</p>
              </div>
              <div className="collection-notes-quizzes">
                <p>
                  {props.notes} notes, {props.quizzes} quizzes
                </p>
              </div>
            </div>
          </Link>
          <div className="top-card-layer-right">
            <EllipsisMenu
              menuItems={[
                {
                  name: 'View Details',
                  iconName: 'infoIcon',
                  onClick: onViewDetails,
                },
                {
                  name: 'Remove from shared',
                  iconName: 'deleteIcon',
                  onClick: onRemoveSharedCollection,
                },
              ]}
            />
          </div>
        </div>
        <hr className="line" />
        <div className="bottom-card-layer">
          <img src={image} />
          <p>Shared by {props.sharedBy}</p>
        </div>
      </Card>
    </div>
  );
}

export default SharedFolderCard;
