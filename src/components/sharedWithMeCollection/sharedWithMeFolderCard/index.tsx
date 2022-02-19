import { Card, Drawer } from 'antd';
import ROUTES from '../../../router';
import { Link } from 'react-router-dom';
import image from '../../../assets/images/sharedWithMe/image.svg';
import FolderIconSVG from '../../../common/FolderIconSVG';
import EllipsisMenu from '../../ellipsisMenu';
import replace from 'lodash/replace';

import './styles.scss';
import ModalConfirmation from '../../../common/modalConfirmation';
import { useState } from 'react';

function SharedFolderCard(props: any) {
  const { onViewDetails, onRemoveSharedCollection } = props;
  const [isSharedDrawer, setSharedDrawer] = useState(false);
  const [isModalConfirmation, setIsModalConfirmation] = useState(false);
  const modalConfirmationToggle = () => {
    setIsModalConfirmation(!isModalConfirmation);
  };
  const sharedToggleDrawer = () => {
    setSharedDrawer(!isSharedDrawer);
  };

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
                  {props.notes} notes, {props.quizzes} questions
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

      <ModalConfirmation
        visible={isModalConfirmation}
        handleCancel={modalConfirmationToggle}
        handleLeave={modalConfirmationToggle}
        cancelTitle="Cancel"
        confirmTitle="Yes. Leave"
      >
        <div className="confirmation-section">
          <h2>Are you sure you want to leave the</h2>
          <h2 className="theme-color">
            Maths Collection <span>?</span>
          </h2>
        </div>
      </ModalConfirmation>

      {/* Drawer Style here */}
      <Drawer
        title="Shared Information"
        maskClosable={true}
        closable={false}
        className="shared-information-drawer"
        placement="right"
        onClose={sharedToggleDrawer}
        visible={isSharedDrawer}
      >
        <div className="detail-section">
          <div className="flex">
            <div className="folder-icon">
              <FolderIconSVG fillColor={'#6C5ECF'} />
            </div>
            <div className="info-sec">
              <h4 className="title4">Maths</h4>
              <p>20 Notes, 2 quizes</p>
            </div>
          </div>
          <div className="shared-details">
            <div className="name">
              <p>Shared by </p>
              <h4 className="title4">Ayush Parashar</h4>
            </div>
            <div className="date">
              <p>Date</p>
              <h4 className="title4">05/08/2021</h4>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default SharedFolderCard;
