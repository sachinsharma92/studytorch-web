import PrimaryLayout from "../../common/primaryLayout/primaryLayout";
import SharedWithMeCollection from "../../components/sharedWithMeCollection";
import { useEffect, useState } from "react";
import { Drawer, message, Spin, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import filter from "lodash/filter";
import get from "lodash/get";
import map from "lodash/map";
import moment from "moment";
import FolderIconSVG from "../../common/FolderIconSVG";
import ModalConfirmation from "../../common/modalConfirmation";
import EmptyState from "../../common/emptyState/emptyState";
import {
  fetchSharedCollections,
  leaveShareCollection,
} from "../../redux/actions/collectionActions";
import { COLLECTION_LEAVE_SUCCESS } from "../../constants/messages";
import folderGray from "../../assets/images/icons/folder-gray.svg";
import "./styles.scss";

const { confirm } = Modal;

const getSortedCollections = (collections: any): any => {
  const today = filter(
    collections,
    (c) => get(c, "shared_period.isToday") === true
  );
  const lastWeek = filter(
    collections,
    (c) => get(c, "shared_period.isLastWeek") === true
  );
  const old = filter(
    collections,
    (c) => get(c, "shared_period.isOld") === true
  );
  const returnObj = [];
  if (today.length > 0) {
    returnObj.push({
      time: "Today",
      folders: today,
    });
  }
  if (lastWeek.length > 0) {
    returnObj.push({
      time: "Last Week",
      folders: lastWeek,
    });
  }
  if (old.length > 0) {
    returnObj.push({
      time: "Old",
      folders: old,
    });
  }
  return returnObj;
};

function SharedWithMeScreen() {
  const [sharedDrawer, setSharedDrawer] = useState({
    visible: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [sharedCollection, setSharedCollection] = useState([]);
  const dispatch = useDispatch();

  const getSharedCollections = () => {
    setLoading(true);
    dispatch(fetchSharedCollections())
      .then((result: any) => {
        setSharedCollection(getSortedCollections(result));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSharedCollections();
  }, []);

  const toggleSharedDrawer = (data = null) => {
    setSharedDrawer({
      visible: !get(sharedDrawer, "visible"),
      data,
    });
  };

  const [isModalConfirmation, setIsModalConfirmation] = useState(false);
  const modalConfirmationToggle = () => {
    setIsModalConfirmation(!isModalConfirmation);
  };

  const onRemoveSharedCollection = (collectionId: any) => {
    setLoading(true);
    dispatch(leaveShareCollection(collectionId))
      .then((result: any) => {
        message.success(COLLECTION_LEAVE_SUCCESS);
        getSharedCollections();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = (collectionId: any) => {
    confirm({
      title: "Are you sure,You want to leave this collection?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onRemoveSharedCollection(collectionId);
      },
      onCancel() {},
    });
  };

  const onViewDetails = (collection: any) => {
    toggleSharedDrawer(collection);
  };
  console.log("sharedDrawer======>", sharedDrawer);
  return (
    <>
      <PrimaryLayout>
        <Spin spinning={loading}>
          <div className="shared-page-style">
            <h3 className="title3">Shared with me</h3>

            {sharedCollection.length === 0 && (
              <div className="state-center">
                <EmptyState
                  imgUrl={folderGray}
                  title=""
                  description="No shared Collections"
                  buttonType="primary"
                />
              </div>
            )}
            {map(sharedCollection, (sc, index) => (
              <SharedWithMeCollection
                key={index}
                timeFilter={get(sc, "time")}
                folders={get(sc, "folders", [])}
                onViewDetails={onViewDetails}
                onRemoveSharedCollection={onConfirmDelete}
              />
            ))}
          </div>

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
            onClose={() => toggleSharedDrawer()}
            visible={get(sharedDrawer, "visible")}
          >
            <div className="detail-section">
              <div className="flex">
                <div className="folder-icon">
                  <FolderIconSVG
                    withUserStyle
                    fillColor={get(sharedDrawer, "data.collection.color")}
                  />
                </div>
                <div className="info-sec">
                  <h4 className="title4">
                    {get(sharedDrawer, "data.collection.name")}
                  </h4>
                  <p>20 Notes, 2 quizes</p>
                </div>
              </div>
              <div className="shared-details">
                <div className="name">
                  <p>Shared by </p>
                  <h4 className="title4">
                    {get(sharedDrawer, "data.shared_by.name")}
                  </h4>
                </div>
                <div className="date">
                  <p>Date</p>
                  <h4 className="title4">
                    {get(sharedDrawer, "data.updated_at_formatted")}
                  </h4>
                </div>
              </div>
            </div>
          </Drawer>
        </Spin>
      </PrimaryLayout>
    </>
  );
}

export default SharedWithMeScreen;
