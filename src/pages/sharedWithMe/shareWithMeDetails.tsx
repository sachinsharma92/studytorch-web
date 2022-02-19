import { useState, useEffect } from 'react';
import {
  Col,
  Menu,
  Row,
  Tabs,
  Skeleton,
  PageHeader,
  Popover,
  Avatar,
  Button,
  Dropdown,
} from 'antd';
import { useDispatch } from 'react-redux';
import {
  EditOutlined,
  DeleteOutlined,
  LoginOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import get from 'lodash/get';
import map from 'lodash/map';
import replace from 'lodash/replace';
import { useNavigate, useParams } from 'react-router-dom';

// Custom Component and Modal
import CreateCollectionModal from '../../components/collection/modals/createCollection';
import CollectionCard from '../../components/collection/collectionCard/collectionCard';

import ROUTES from '../../router';
import { SHARED_SCREEN } from '../../router/routes';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import NotesCard from '../../components/collection/notesCard/notesCard';
import FlashCard from '../../components/collection/flashCard/flashCard';
import ShareCollectionModal from '../../components/collection/modals/shareCollection';
import MasterCollectionModal from '../../components/collection/modals/masterCollection';
import ButtonCustom from '../../common/buttons/buttonCustom';
import QuestionCard from '../../components/collection/questionCard/questionCard';
import NoteModalCard from '../../components/collection/modals/noteModalCard';
import QuestionModal from '../../components/collection/modals/questionModal';
import RevisionModeModal from '../../components/collection/modals/revisionModeModal';
import QuestionAddedModal from '../../components/collection/modals/questionAddedModal';
import FlashEditModal from '../../components/collection/modals/flashEditModal';
import { fetchSharedCollection } from '../../redux/actions/collectionActions';
import EmptyState from '../../common/emptyState/emptyState';
// Images
import filter from '../../assets/images/icons/filter.svg';
import Users3 from '../../assets/images/icons/3-user.svg';
import arrowDown from '../../assets/images/icons/arrow-down.svg';
import folderGray from '../../assets/images/icons/folder-gray.svg';

// Styles
import './styles.scss';
import SharedWithMeCollection from '../../components/sharedWithMeCollection';

const { TabPane } = Tabs;

const menu = (
  <Menu>
    <Menu.Item icon={<EditOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Edit
      </a>
    </Menu.Item>
    <Menu.Item icon={<DeleteOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Delete
      </a>
    </Menu.Item>
  </Menu>
);

const routes = [
  {
    path: 'index',
    breadcrumbName: 'Collections',
  },
  {
    path: 'first',
    breadcrumbName: 'Maths Group',
  },
];

const flashCardData = [
  {
    title: 'Headline label',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...',
    tag: 'Tag 1',
  },
  {
    title: 'Headline label',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...',
    tag: 'Tag 1',
  },
  {
    title: 'Headline label',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...',
    tag: 'Tag 1',
  },
];

function ShareWithMeDetails(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({
    hasAccessToSubcollection: false,
    canEditCollection: false,
  });

  const [collectionModal, setCollectionModal] = useState<any>({
    visible: false,
    data: null,
  });

  const [noteModal, setNoteModal] = useState({
    visible: false,
    data: null,
  });

  const [isQuestionAddedModal, setIsQuestionAddedModal] = useState({
    visible: false,
    edit: false,
  });

  const [questionModal, setQuestionModal] = useState({
    visible: false,
    data: null,
  });

  const [collectionDetails, setCollectionDetails] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isCollectionModal, setIsCollectionModal] = useState(false);

  const [isShareModal, setIsShareModal] = useState(false);

  const shareToggleModal = () => {
    setIsShareModal(!isShareModal);
  };

  const toggleCollectionModal = (data = null) => {
    setCollectionModal({
      visible: !get(collectionModal, 'visible'),
      data: data,
    });
  };

  const toggleNoteModal = (data = null) => {
    setNoteModal({
      visible: !get(noteModal, 'visible'),
      data: data,
    });
  };

  const toggleQuestionModal = (data = null) => {
    setQuestionModal({
      visible: !get(questionModal, 'visible'),
      data: data,
    });
  };

  const [isFlashEditModal, setIsFlashEditModal] = useState(false);

  const flashEditModalTpggleModal = () => {
    setIsFlashEditModal(!isFlashEditModal);
  };
  const [isRevisionModeModal, setIsRevisionModeModal] = useState(false);
  const revisionModeToggle = () => {
    setIsRevisionModeModal(!isRevisionModeModal);
  };

  //////

  const fetchSharedCollectionDetails = () => {
    setLoading(true);
    dispatch(fetchSharedCollection(id))
      .then((result: any) => {
        setCollectionDetails(result);

        setPermissions({
          hasAccessToSubcollection: get(result, 'share.subfolders_shared')
            ? true
            : false,
          canEditCollection:
            get(result, 'share.permission') === 2 ? true : false,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSharedCollectionDetails();
  }, [id]);

  const toggleData = (
    <div className="toggle-menu">
      <a
        onClick={() => {
          toggleCollectionModal();
        }}
      >
        New Collection
      </a>
      <a onClick={() => toggleNoteModal()}>Notes</a>
      <a onClick={() => toggleQuestionModal()}>Question</a>
    </div>
  );

  const onNotesSuccess = () => {
    toggleNoteModal();
    fetchSharedCollectionDetails();
  };

  const onCollecitonSuccess = () => {
    toggleCollectionModal(null);
    fetchSharedCollectionDetails();
  };

  const canEditCollection = get(collectionDetails, 'edit_persmission');
  const canAccessSubCollection = get(collectionDetails, 'subfolder_shared');

  if (!collectionDetails) {
    return <Skeleton />;
  }

  return (
    <PrimaryLayout>
      <div className="share-detail-page-style">
        <PageHeader
          className="site-page-header header-back"
          onBack={() => navigate(-1)}
          title={get(collectionDetails, 'name')}
          breadcrumb={{ routes }}
          extra={[
            <div className="btn-section-top">
              <div className="user-flex-icon">
                <Avatar shape="circle" size="small" icon={<UserOutlined />} />
                Shared by {get(collectionDetails, 'collection_admin.name')}
              </div>
              <Dropdown
                placement="bottomRight"
                overlayClassName="collection-dropdown"
                overlay={
                  <Menu>
                    <Menu.Item icon={<DeleteOutlined />}>
                      <a target="_blank" rel="noopener noreferrer" href="#">
                        Delete Group
                      </a>
                    </Menu.Item>
                    <Menu.Item icon={<LoginOutlined />}>
                      <a>Leave Group</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a
                  className="ant-dropdown-link btn-outline-primary"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={Users3} className="icon-style" />
                  Joined
                  <img src={arrowDown} className="icon-style" />
                </a>
              </Dropdown>
            </div>,
          ]}
        />

        <div className="tab-section">
          <Tabs>
            {canAccessSubCollection && (
              <TabPane tab="Collection" key="1">
                {get(collectionDetails, 'subCollections', []).length === 0 ? (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      title={
                        get(permissions, 'canEditCollection')
                          ? 'Create your Collection'
                          : 'No Sub collection present in this colleciton'
                      }
                      description=" Your Collection can be the folder underwhich all the study material is kept"
                      buttonText={
                        get(permissions, 'canEditCollection')
                          ? 'Add Collection'
                          : null
                      }
                      buttonType="primary"
                      buttonHandler={() => toggleCollectionModal()}
                    />
                  </div>
                ) : (
                  <div className="card-section">
                    <Row gutter={32}>
                      {map(
                        get(collectionDetails, 'subCollections', []),
                        (collection, index) => (
                          <Col sm={6} key={index}>
                            <CollectionCard
                              id={get(collection, 'id')}
                              hideEditDelete={!canEditCollection}
                              color={get(collection, 'color')}
                              title={get(collection, 'name')}
                              setLoading={setLoading}
                              withUserStyle
                              description={`${get(
                                collection,
                                'note_count'
                              )} Notes, ${get(
                                collection,
                                'question_count'
                              )} Quesitions`}
                              parentCollection={collectionDetails}
                              cardHandler={replace(
                                ROUTES.SHARED_DETAILS_SCREEN,
                                ':id',
                                get(collection, 'id')
                              )}
                              onEditCollection={() => {
                                toggleCollectionModal(collection);
                              }}
                              onSuccess={fetchSharedCollectionDetails}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </div>
                )}
              </TabPane>
            )}
            <TabPane tab="Notes" key="2">
              {get(collectionDetails, 'notes', []).length === 0 ? (
                <div className="state-center">
                  <EmptyState
                    imgUrl={folderGray}
                    title={
                      get(permissions, 'canEditCollection')
                        ? 'Create your Notes'
                        : 'No Notes present in this collection'
                    }
                    description=" Your Notes contains content of your study material "
                    buttonText={
                      get(permissions, 'canEditCollection') ? 'Add Notes' : null
                    }
                    buttonType="primary"
                    buttonHandler={() => toggleNoteModal()}
                  />
                </div>
              ) : (
                <div className="card-section note-section">
                  <Row gutter={32}>
                    {map(get(collectionDetails, 'notes', []), (note, index) => (
                      <Col sm={8} key={index}>
                        <NotesCard
                          title={get(note, 'title')}
                          id={get(note, 'id')}
                          setLoading={setLoading}
                          description={get(note, 'description')}
                          menuData={menu}
                          hideEditDelete={!canEditCollection}
                          cardHandler="/"
                          collection={collectionDetails}
                          tags={get(note, 'tags')}
                          onEditNote={() => {
                            toggleNoteModal(note);
                          }}
                          onSuccess={fetchSharedCollectionDetails}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </TabPane>
            <TabPane tab="Question" key="3">
              {get(collectionDetails, 'questions', []).length > 0 && (
                <div className="inline-button-section mt--20 mb--30">
                  <ButtonCustom className="round-primary" title="Take a Quiz" />
                  <ButtonCustom
                    className="round-primary"
                    icon={<img src={filter} alt="" />}
                    title="Filter"
                  />
                </div>
              )}

              {get(collectionDetails, 'questions', []).length === 0 ? (
                <div className="state-center">
                  <EmptyState
                    imgUrl={folderGray}
                    title={
                      get(permissions, 'canEditCollection')
                        ? 'Create your Questions'
                        : 'No Question Present in this collection'
                    }
                    description=" Quizzes will be depend on question your create here"
                    buttonText={
                      get(permissions, 'canEditCollection')
                        ? 'Add Questions'
                        : null
                    }
                    buttonType="primary"
                    buttonHandler={() => toggleQuestionModal()}
                  />
                </div>
              ) : (
                <div className="card-section note-section">
                  <Row gutter={32}>
                    {map(
                      get(collectionDetails, 'questions', []),
                      (question, i) => {
                        return (
                          <Col sm={12} key={i}>
                            <QuestionCard
                              question={question}
                              collection={collectionDetails}
                              hideEditDelete={!canEditCollection}
                              setLoading={setLoading}
                              onSuccess={fetchSharedCollectionDetails}
                              onEditQuestion={() => {
                                toggleQuestionModal(question);
                              }}
                            />
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </div>
              )}
            </TabPane>
            <TabPane tab="Flash Card" key="4">
              <div className="inline-button-section mb--20">
                <ButtonCustom
                  className="round-primary"
                  onClick={revisionModeToggle}
                  title="Revision Mode"
                />
              </div>
              <RevisionModeModal
                visible={isRevisionModeModal}
                closeHandler={revisionModeToggle}
              />
              <div className="card-section note-section">
                <Row gutter={32}>
                  {flashCardData.map((data, index) => (
                    <Col sm={8} key={index}>
                      <FlashCard
                        title={data.title}
                        description={data.description}
                        menuData={
                          <Menu>
                            <Menu.Item icon={<EditOutlined />}>
                              <a onClick={flashEditModalTpggleModal}>Edit</a>
                            </Menu.Item>
                            <Menu.Item icon={<DeleteOutlined />}>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="#"
                              >
                                Delete
                              </a>
                            </Menu.Item>
                          </Menu>
                        }
                      />
                    </Col>
                  ))}
                </Row>

                <FlashEditModal
                  visible={isFlashEditModal}
                  btnAddHandler={flashEditModalTpggleModal}
                  cancelHandler={flashEditModalTpggleModal}
                  backHandler={flashEditModalTpggleModal}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* Collection Modal here */}
      <CreateCollectionModal
        visible={get(collectionModal, 'visible')}
        onCancel={() => toggleCollectionModal()}
        onSuccess={onCollecitonSuccess}
        edit={get(collectionModal, 'data') ? true : false}
        initialValue={get(collectionModal, 'data')}
        collection={collectionDetails}
      />

      {/* Share Modal here */}
      <ShareCollectionModal
        visible={isShareModal}
        onCancel={shareToggleModal}
        doneHandler={shareToggleModal}
        cancelHandler={shareToggleModal}
      />

      {/* Note Modal here */}
      <NoteModalCard
        visible={get(noteModal, 'visible')}
        collection={collectionDetails}
        onCancel={() => {
          toggleNoteModal();
        }}
        edit={get(noteModal, 'data') ? true : false}
        initialValue={get(noteModal, 'data')}
        onSuccess={onNotesSuccess}
      />

      {/* Questions Modal */}
      {get(questionModal, 'visible') && (
        <QuestionModal
          visible={get(questionModal, 'visible')}
          edit={get(questionModal, 'data') ? true : false}
          initialValue={get(questionModal, 'data')}
          onSuccess={(edit = false) => {
            toggleQuestionModal();
            setIsQuestionAddedModal({
              visible: true,
              edit,
            });
          }}
          collection={collectionDetails}
          cancelHandler={() => {
            toggleQuestionModal();
          }}
        />
      )}

      <QuestionAddedModal
        visible={get(isQuestionAddedModal, 'visible')}
        edit={get(isQuestionAddedModal, 'edit')}
        buttonDoneHandler={() => {
          setIsQuestionAddedModal({
            visible: false,
            edit: false,
          });
          fetchSharedCollectionDetails();
        }}
        addButtonHandler={() => {
          setIsQuestionAddedModal({
            visible: false,
            edit: false,
          });
          toggleQuestionModal();
        }}
      />
      {canEditCollection && (
        <Popover content={toggleData} placement="topRight">
          <Button
            className="button-add-circle"
            shape="circle"
            type="primary"
            icon={<PlusOutlined />}
          />
        </Popover>
      )}
    </PrimaryLayout>
  );
}

export default ShareWithMeDetails;
