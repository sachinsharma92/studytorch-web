import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Menu,
  Row,
  Popover,
  Modal,
  Tabs,
  PageHeader,
  Dropdown,
  Avatar,
  Drawer,
  Spin,
  Tooltip,
} from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Custom Component and Modal
import { GROUPS_DETAIL_SCREEN } from '../../router/routes';
import EmptyState from '../../common/emptyState/emptyState';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import NotesCard from '../../components/collection/notesCard/notesCard';
import FlashCard from '../../components/collection/flashCard/flashCard';
import CreateCollectionModal from '../../components/collection/modals/createCollection';
import ButtonCustom from '../../common/buttons/buttonCustom';
import QuestionCard from '../../components/collection/questionCard/questionCard';
import NoteModalCard from '../../components/collection/modals/noteModalCard';
import QuestionModal from '../../components/collection/modals/questionModal';
import QuestionAddedModal from '../../components/collection/modals/questionAddedModal';
import FlashEditModal from '../../components/collection/modals/flashEditModal';
import CollectionCard from '../../components/collection/collectionCard/collectionCard';
import RevisionModeModal from '../../components/collection/modals/revisionModeModal';
import JoinedDropDown from '../../components/groups/joinedDropDown';
import GroupBanner from '../../components/groups/groupBanner/groupBanner';
import GroupMembers from '../../components/groups/groupMembers';
import GroupCreateModal from '../../components/groups/modals/groupCreateModal';
import GroupQuizTab from '../../components/groups/groupQuizTab/groupQuizTab';
import GroupReportTab from '../../components/groups/groupReportTab';
import {
  fetchGroupCollectionDetails,
  fetchGroupDetails,
} from '../../redux/actions/groupActions';
import { getNameAvatar, replaceMultiple } from '../../utilities/helpers';
import { avatarColors } from '../../constants/groups';
// Images
import filter from '../../assets/images/icons/filter.svg';
import heroBackground from '../../assets/images/banner-group.png';
import verticalDot from '../../assets/images/icons/vertical-dot.svg';

import folderGray from '../../assets/images/icons/folder-gray.svg';

// Styles
import './styles.scss';
import CreateQuizModal from '../../components/quiz/modals/createQuizModal';
import CheckSolutionModal from '../../components/quiz/modals/checkSolutionModal';
import ReportDetailCard from '../../components/groups/drawerCards/reportDetailCard';

const { TabPane } = Tabs;

const menu = (
  <Menu>
    <Menu.Item icon={<EditOutlined />}>Edit</Menu.Item>
    <Menu.Item icon={<DeleteOutlined />}>Delete</Menu.Item>
  </Menu>
);

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
];

function GroupDetailScreen(props: any) {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<any>({
    previewImage: null,
    previewVisible: false,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [collectionDetails, setCollectionDetails] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const { id, gid } = useParams();

  //////////new start ///////////
  const [groupModal, setGroupModal] = useState<any>({
    visible: false,
    data: null,
  });

  const toggleGroupModal = (data = null) => {
    setGroupModal({
      data,
      visible: !get(groupModal, 'visible'),
    });
  };

  const [collectionModal, setCollectionModal] = useState<any>({
    visible: false,
    data: null,
  });

  const [noteModal, setNoteModal] = useState({
    visible: false,
    data: null,
  });

  const [questionModal, setQuestionModal] = useState({
    visible: false,
    data: null,
  });

  const [isQuestionAddedModal, setIsQuestionAddedModal] = useState({
    visible: false,
    edit: false,
  });
  //////////new ENd ///////////

  const [checkSolutionModal, setCheckSolutionModal] = useState({
    visible: false,
    data: null,
  });

  const [flashModal, setFlashModal] = useState({
    visible: false,
    data: null,
  });
  const toggleFlashModal = (data = null) => {
    setFlashModal({
      visible: !get(flashModal, 'visible'),
      data: data,
    });
  };

  const [isRevisionModeModal, setIsRevisionModeModal] = useState(false);
  const revisionModeToggle = () => {
    setIsRevisionModeModal(!isRevisionModeModal);
  };

  const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
  const createQuizToggleModal = () => {
    setIsCreateQuizModal(!isCreateQuizModal);
  };

  // Drawer Function
  const [isInfoDrawer, setInfoDrawer] = useState(false);
  const infoDrawerToggle = () => {
    setInfoDrawer(!isInfoDrawer);
  };

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

  const getGroupCollectionDetails = () => {
    setLoading(true);
    dispatch(fetchGroupCollectionDetails(id))
      .then((result: any) => {
        setCollectionDetails(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getGroupDetails = () => {
    setLoading(true);
    dispatch(fetchGroupDetails(gid))
      .then((result: any) => {
        setGroupDetails(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  //////////new start ///////////
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

  const onCollecitonSuccess = () => {
    toggleCollectionModal(null);
    getGroupCollectionDetails();
  };

  const onNotesSuccess = () => {
    toggleNoteModal();
    getGroupCollectionDetails();
  };
  //////////new END ///////////

  useEffect(() => {
    getGroupCollectionDetails();
    getGroupDetails();
  }, [id]);

  const toggleCheckSolution = (data = null) => {
    setCheckSolutionModal({
      visible: !get(checkSolutionModal, 'visible'),
      data,
    });
  };

  console.log({ groupDetails });

  return (
    <PrimaryLayout>
      <div className="group-page-style detail-page-style">
        <GroupBanner
          setLoading={setLoading}
          groupDetails={groupDetails}
          onSuccessUpload={getGroupDetails}
        />

        <PageHeader
          className="site-page-header header-back"
          onBack={() => navigate(-1)}
          title={get(collectionDetails, 'name')}
          breadcrumb={{
            routes: [
              {
                path: 'index',
                breadcrumbName: 'Group',
              },
              {
                path: 'first',
                breadcrumbName: get(groupDetails, 'name', ''),
              },
            ],
          }}
          extra={[
            <div className="btn-section-top">
              <JoinedDropDown
                groupDetails={groupDetails}
                setLoading={setLoading}
              />
              {get(groupDetails, 'is_group_admin') && (
                <GroupMembers
                  groupDetails={groupDetails}
                  refreshGroupDetails={getGroupDetails}
                />
              )}

              <Dropdown
                overlayClassName="collection-dropdown"
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        toggleGroupModal(groupDetails);
                      }}
                      icon={<EditOutlined />}
                    >
                      Edit Group
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        setImagePreview({
                          previewImage: get(groupDetails, 'banner_image')
                            ? get(groupDetails, 'banner_image_url')
                            : heroBackground,
                          previewVisible: true,
                        });
                      }}
                      icon={<EditOutlined />}
                    >
                      Show Cover
                    </Menu.Item>
                  </Menu>
                }
              >
                <img alt="" src={verticalDot} className="icon-style" />
              </Dropdown>
            </div>,
          ]}
        />
        <Spin spinning={loading}>
          <div className="avatar-group">
            <Avatar.Group maxCount={5}>
              {map(get(groupDetails, 'group_members', []), (member, i: any) => {
                if (get(member, 'image')) {
                  return (
                    <Tooltip title={get(member, 'username')}>
                      <Avatar src={get(member, 'image_url')} />
                    </Tooltip>
                  );
                }
                return (
                  <Tooltip title={get(member, 'username')}>
                    {getNameAvatar(
                      get(member, 'name'),
                      30,
                      avatarColors[i % 4]
                    )}
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </div>

          <div className="tab-section">
            <Tabs defaultActiveKey="1" destroyInactiveTabPane>
              <TabPane tab="Collection" key="1">
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
                    <Row gutter={32}>
                      {map(
                        get(collectionDetails, 'subCollections', []),
                        (collection, index) => (
                          <Col sm={6} key={index}>
                            <CollectionCard
                              id={get(collection, 'id')}
                              hideEditDelete={
                                !get(groupDetails, 'is_group_admin')
                              }
                              parentCollection={collectionDetails}
                              color={get(collection, 'color')}
                              title={get(collection, 'name')}
                              setLoading={setLoading}
                              description={`${get(
                                collection,
                                'note_count'
                              )} Notes, ${get(
                                collection,
                                'question_count'
                              )} Quesitions`}
                              cardHandler={replaceMultiple(
                                GROUPS_DETAIL_SCREEN,
                                {
                                  ':id': get(collection, 'id'),
                                  ':gid': gid,
                                }
                              )}
                              onEditCollection={() => {
                                toggleCollectionModal(collection);
                              }}
                              onSuccess={getGroupCollectionDetails}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </div>
                )}
              </TabPane>
              <TabPane tab="Notes" key="2">
                {get(collectionDetails, 'notes', []).length === 0 ? (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      title="Create your Notes"
                      description=" Your Notes contains content of your study material "
                      buttonText="Add Notes"
                      buttonType="primary"
                      buttonHandler={() => toggleNoteModal()}
                    />
                  </div>
                ) : (
                  <div className="card-section note-section">
                    <Row gutter={32}>
                      {map(
                        get(collectionDetails, 'notes', []),
                        (note, index) => (
                          <Col sm={8} key={index}>
                            <NotesCard
                              title={get(note, 'title')}
                              hideEditDelete={
                                !get(groupDetails, 'is_group_admin')
                              }
                              collection={collectionDetails}
                              id={get(note, 'id')}
                              setLoading={setLoading}
                              description={get(note, 'description')}
                              menuData={menu}
                              cardHandler="/"
                              tags={get(note, 'tags')}
                              onEditNote={() => {
                                toggleNoteModal(note);
                              }}
                              onSuccess={getGroupCollectionDetails}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </div>
                )}
              </TabPane>
              <TabPane tab="Question" key="3">
                <div className="inline-button-section mt--20 mb--30">
                  <ButtonCustom className="round-primary" title="Take a Quiz" />
                  <ButtonCustom
                    className="round-primary"
                    icon={<img src={filter} alt="" />}
                    title="Filter"
                  />
                </div>
                {get(collectionDetails, 'questions', []).length === 0 ? (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      title="Create your Questions"
                      description=" Quizzes will be depend on question your create here"
                      buttonText="Add Questions"
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
                                hideEditDelete={
                                  !get(groupDetails, 'is_group_admin')
                                }
                                question={question}
                                collection={collectionDetails}
                                setLoading={setLoading}
                                onSuccess={getGroupCollectionDetails}
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
                {get(collectionDetails, 'flashCards', []).length > 0 && (
                  <div className="inline-button-section mt--20">
                    <ButtonCustom
                      className="round-primary"
                      onClick={revisionModeToggle}
                      title="Revision Mode"
                    />
                  </div>
                )}
                <RevisionModeModal
                  visible={isRevisionModeModal}
                  closeHandler={revisionModeToggle}
                  flashCards={get(collectionDetails, 'flashCards', [])}
                />
                {get(collectionDetails, 'flashCards', []).length === 0 && (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      title="Create your flash card"
                      buttonText="Add Flash card"
                      buttonType="primary"
                      buttonHandler={() => toggleFlashModal()}
                    />
                  </div>
                )}
                <div className="card-section note-section">
                  <Row gutter={32}>
                    {map(
                      get(collectionDetails, 'flashCards', []),
                      (flashCard, index) => (
                        <Col sm={8} key={index}>
                          <FlashCard
                            flashCard={flashCard}
                            hideEditDelete={
                              !get(groupDetails, 'is_group_admin')
                            }
                            setLoading={setLoading}
                            collection={collectionDetails}
                            onSuccess={getGroupCollectionDetails}
                            onEditFlashCard={(data: any) => {
                              toggleFlashModal(data);
                            }}
                          />
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              </TabPane>

              <TabPane tab="Quiz" key="5">
                <GroupQuizTab
                  group={groupDetails}
                  toggleCheckSolution={toggleCheckSolution}
                  collectionDetails={collectionDetails}
                />
              </TabPane>

              {get(groupDetails, 'is_group_admin') && (
                <TabPane tab="Reports" key="6">
                  <GroupReportTab group={groupDetails} />
                </TabPane>
              )}
            </Tabs>
          </div>
        </Spin>
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
      {/* GroupCreateModal Modal here */}
      <GroupCreateModal
        visible={get(groupModal, 'visible')}
        onCancel={() => toggleGroupModal()}
        onSuccess={() => {
          toggleGroupModal();
          getGroupDetails();
        }}
        edit={get(groupModal, 'data') ? true : false}
        initialValue={get(groupModal, 'data')}
      />

      {/* Note Modal here */}
      {get(noteModal, 'visible') && (
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
      )}

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
          getGroupCollectionDetails();
        }}
        addButtonHandler={() => {
          setIsQuestionAddedModal({
            visible: false,
            edit: false,
          });
          toggleQuestionModal();
        }}
      />

      {get(checkSolutionModal, 'visible') && (
        <CheckSolutionModal
          visible={get(checkSolutionModal, 'visible')}
          quiz={get(checkSolutionModal, 'data')}
          onCancel={() => {
            toggleCheckSolution();
          }}
        />
      )}

      {get(flashModal, 'visible') && (
        <FlashEditModal
          visible={get(flashModal, 'visible')}
          initialValue={get(flashModal, 'data')}
          edit={get(flashModal, 'data') ? true : false}
          btnAddHandler={toggleFlashModal}
          cancelHandler={toggleFlashModal}
          backHandler={toggleFlashModal}
          collection={collectionDetails}
          onSuccess={() => {
            toggleFlashModal();
            getGroupCollectionDetails();
          }}
        />
      )}

      {/* Share Modal here */}

      {/* Questions Modal */}
      <CreateQuizModal
        visible={isCreateQuizModal}
        createHandler={createQuizToggleModal}
        cancelHandler={createQuizToggleModal}
        onCancel={createQuizToggleModal}
      />
      <Modal
        visible={get(imagePreview, 'previewVisible')}
        footer={null}
        onCancel={() => {
          setImagePreview({
            previewVisible: false,
            previewImage: null,
          });
        }}
      >
        <img
          alt="example"
          style={{ width: '100%' }}
          src={get(imagePreview, 'previewImage')}
        />
      </Modal>
      {get(groupDetails, 'is_group_admin') && (
        <Popover content={toggleData} placement="topRight">
          <Button
            className="button-add-circle"
            shape="circle"
            type="primary"
            icon={<PlusOutlined />}
          />
        </Popover>
      )}

      <Drawer
        width={450}
        closable={false}
        onClose={infoDrawerToggle}
        maskClosable={true}
        visible={isInfoDrawer}
      >
        <ReportDetailCard />
      </Drawer>
    </PrimaryLayout>
  );
}

export default GroupDetailScreen;
