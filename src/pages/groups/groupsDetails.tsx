import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Menu,
  Row,
  Popover,
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
import {
  GROUP_SCORE_DETAILS_SCREEN,
  GROUPS_DETAIL_SCREEN,
} from '../../router/routes';
import EmptyState from '../../common/emptyState/emptyState';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import NotesCard from '../../components/collection/notesCard/notesCard';
import FlashCard from '../../components/collection/flashCard/flashCard';
import ShareCollectionModal from '../../components/collection/modals/shareCollection';
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
import QuizCard from '../../components/quiz/quizCard';
import GroupQuizTab from '../../components/groups/groupQuizTab/groupQuizTab';
import {
  fetchGroupCollectionDetails,
  fetchGroupDetails,
} from '../../redux/actions/groupActions';
import { getNameAvatar, replaceMultiple } from '../../utilities/helpers';
import { avatarColors } from '../../constants/groups';
// Images
import filter from '../../assets/images/icons/filter.svg';
import verticalDot from '../../assets/images/icons/vertical-dot.svg';

import folderGray from '../../assets/images/icons/folder-gray.svg';

// Styles
import './styles.scss';
import CreateQuizModal from '../../components/quiz/modals/createQuizModal';
import QuizReportCard from '../../components/quiz/quizReportCard';
import ReportDetailCard from '../../components/groups/drawerCards/reportDetailCard';

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

const quizViewData = [
  {
    quizName: 'QUIZ NAME',
    collectionName: 'Collection name',
    date: '22nd Sep 2021',
    marks: '70%',
  },
  {
    quizName: 'QUIZ NAME',
    collectionName: 'Collection name',
    date: '22nd Sep 2021',
    marks: '70%',
  },
  {
    quizName: 'QUIZ NAME',
    collectionName: 'Collection name',
    date: '22nd Sep 2021',
    marks: '80%',
  },
  {
    quizName: 'QUIZ NAME',
    collectionName: 'Collection name',
    date: '22nd Sep 2021',
    marks: '90%',
  },
];

function GroupDetailScreen(props: any) {
  const [isCollectionModal, setIsCollectionModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [collectionDetails, setCollectionDetails] = useState(false);
  const [groupDetails, setGroupDetails] = useState(false);
  const { id, gid } = useParams();

  //////////new start ///////////
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

  const [isShareModal, setIsShareModal] = useState(false);
  const shareToggleModal = () => {
    setIsShareModal(!isShareModal);
  };

  const [isFlashEditModal, setIsFlashEditModal] = useState(false);
  const flashEditModalTpggleModal = () => {
    setIsFlashEditModal(!isFlashEditModal);
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
                breadcrumbName: get(groupDetails, 'name'),
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
                    <Menu.Item icon={<EditOutlined />}>
                      <a href="#">Edit Group</a>
                    </Menu.Item>
                    <Menu.Item icon={<EditOutlined />}>
                      <a href="#">Show Cover</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={verticalDot} className="icon-style" />
                </a>
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
            <Tabs defaultActiveKey="1">
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
                <div className="inline-button-section mt--20">
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

              <TabPane tab="Quiz" key="5">
                <GroupQuizTab group={groupDetails} />
              </TabPane>

              <TabPane tab="Reports" key="6">
                <Row gutter={24}>
                  <Col xs={12} sm={6}>
                    <div className="card-outline">
                      <div className="gray-box" />
                      <div className="flex">
                        <h3 className="title-md">24</h3>
                        <p className="description">Group Members</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="card-outline">
                      <div className="gray-box" />
                      <div className="flex">
                        <h3 className="title-md">12</h3>
                        <p className="description">Total Collections</p>
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={6}>
                    <div className="card-outline">
                      <div className="gray-box" />
                      <div className="flex">
                        <h3 className="title-md">10</h3>
                        <p className="description">Total Quizes</p>
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={6}>
                    <div className="card-outline">
                      <div className="gray-box" />
                      <div className="flex">
                        <h3 className="title-md">12.5 Hrs</h3>
                        <p className="description">Group Studied</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="card-section report-section">
                  <h3 className="title3">Quiz Reports</h3>
                  <Row gutter={32}>
                    {quizViewData.map((data, index) => (
                      <Col sm={8} key={index}>
                        <QuizReportCard
                          quizName={data.quizName}
                          collectionName={data.collectionName}
                          date={data.date}
                          quizComplete={false}
                          marks={data.marks}
                          btnAddHandler={GROUP_SCORE_DETAILS_SCREEN}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              </TabPane>
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

      {/* Share Modal here */}

      {/* Questions Modal */}
      <CreateQuizModal
        visible={isCreateQuizModal}
        createHandler={createQuizToggleModal}
        cancelHandler={createQuizToggleModal}
        onCancel={createQuizToggleModal}
      />

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
