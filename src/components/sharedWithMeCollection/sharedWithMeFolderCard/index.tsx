import { Card } from 'antd';
import image from "../../../assets/images/sharedWithMe/image.svg";
import EllipsisMenu from "../../ellipsisMenu"
import CollectionFolder from "../../../common/FolderIconSVG"

import './styles.scss';
import ROUTES from '../../../router';
import { Link } from 'react-router-dom';

export interface SharedFolderCardProps {
  folderName: string,
  folderColor: string,
  notes: string,
  quizzes: string,
  sharedBy: string,
  cardhandler?: any,
}

function SharedFolderCard(props: SharedFolderCardProps) {
  return (
    <div className="shared-folder-card-style">
      <Card>
        <div className="top-card-layer">
          <Link className="top-card-layer-left" to={ROUTES.SHARED_DETAILS_SCREEN}>
            <div className="folder-icon">
              <CollectionFolder withUserStyle fillColor={props.folderColor} />
            </div>
            <div className="collection-details">
              <div className="collection-name">
                <p>{props.folderName}</p>
              </div>
              <div className="collection-notes-quizzes">
                <p>{props.notes} notes, {props.quizzes} quizzes</p>
              </div>
            </div>
          </Link>
          <div className="top-card-layer-right">
            <EllipsisMenu menuItems={[{ name: "View Details", iconName: "infoIcon", }, { name: "Remove from shared", iconName: "deleteIcon" }]} />
          </div>
        </div>
        <hr className="line" />
        <div className="bottom-card-layer">
          <img src={image} />
          <p>Shared by {props.sharedBy}</p>
        </div>
      </Card>
    </div>
  )
}

export default SharedFolderCard;