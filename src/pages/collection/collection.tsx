import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Menu, Row, Popover, Spin } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import replace from 'lodash/replace';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import ROUTES from '../../router';
import { collectionColors } from '../../constants/collections';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import CollectionCard from '../../components/collection/collectionCard/collectionCard';
import CreateCollectionModal from '../../components/collection/modals/createCollection';
import { fetchCollection } from '../../redux/actions/collectionActions';
// Images
import folderGray from '../../assets/images/icons/folder-gray.svg';

// Styles
import './styles.scss';

function CollectionScreen(props: any) {
  const [collectionModal, setCollectionModal] = useState<any>({
    visible: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState(null);
  const rootCollection = useSelector((state) =>
    get(state, 'userState.user.rootCollection')
  );

  const dispatch = useDispatch();
  const toggleCollectionModal = (data = null) => {
    setCollectionModal({
      visible: !get(collectionModal, 'visible'),
      data: data,
    });
  };

  const [isShareModal, setIsShareModal] = useState(false);
  const shareToggleModal = () => {
    setIsShareModal(!isShareModal);
  };

  const [isNoteModal, setIsNoteModal] = useState(false);
  const noteToggleModal = () => {
    setIsNoteModal(!isNoteModal);
  };

  const [isQuestionModal, setIsQuestionModal] = useState(false);
  const questionToggleModal = () => {
    setIsQuestionModal(!isQuestionModal);
  };

  const onCreateSuccess = () => {
    toggleCollectionModal(null);
    fetchCollectionDetails();
  };

  const fetchCollectionDetails = () => {
    setLoading(true);
    dispatch(fetchCollection(get(rootCollection, 'id')))
      .then((result: any) => {
        setCollectionDetails(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCollectionDetails();
  }, []);

  console.log('@@@@@', collectionDetails);
  const toggleData = (
    <div className="toggle-menu">
      <a onClick={() => toggleCollectionModal()}>New Collection</a>
    </div>
  );

  return (
    <PrimaryLayout>
      <Spin spinning={loading}>
        <div className="collection-page-style">
          <h3 className="title3">My Collection</h3>

          {get(collectionDetails, 'subCollections', []).length === 0 ? (
            <div className="state-center">
              <EmptyState
                imgUrl={folderGray}
                title="Create your Collection"
                description=" Your Collection can be the folder underwhich all the study material is kept"
                buttonText="Add Collection"
                buttonType="primary"
                buttonHandler={() => toggleCollectionModal()}
              />
            </div>
          ) : (
            <div className="card-section">
              <Row gutter={{ xs: 0, sm: 32, md: 32, lg: 32 }}>
                {map(
                  get(collectionDetails, 'subCollections', []),
                  (collection, index) => (
                    <Col sm={6} key={index}>
                      <CollectionCard
                        setLoading={setLoading}
                        id={get(collection, 'id')}
                        title={get(collection, 'name')}
                        description={'data.description'}
                        imgUrl={get(
                          find(collectionColors, [
                            'value',
                            get(collection, 'color'),
                          ]),
                          'image'
                        )}
                        cardHandler={replace(
                          ROUTES.COLLECTION_DETAILS_SCREEN,
                          ':id',
                          get(collection, 'id')
                        )}
                        onEditCollection={() => {
                          toggleCollectionModal(collection);
                        }}
                        onSuccess={fetchCollectionDetails}
                      />
                    </Col>
                  )
                )}
              </Row>
            </div>
          )}
        </div>
      </Spin>
      {/* Collection Modal here */}
      <CreateCollectionModal
        visible={get(collectionModal, 'visible')}
        onCancel={() => toggleCollectionModal()}
        onSuccess={onCreateSuccess}
        edit={get(collectionModal, 'data') ? true : false}
        initialValue={get(collectionModal, 'data')}
        collection={rootCollection}
      />

      <Popover content={toggleData} placement="topRight">
        <Button
          className="button-add-circle"
          shape="circle"
          type="primary"
          icon={<PlusOutlined />}
        />
      </Popover>
    </PrimaryLayout>
  );
}

export default CollectionScreen;
