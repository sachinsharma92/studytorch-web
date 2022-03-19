import { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Menu,
  Row,
  Popover,
  Tabs,
  Select,
  PageHeader,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import get from 'lodash/get';
import map from 'lodash/map';

import replace from 'lodash/replace';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QUIZ_SCREEN } from '../../router/routes';
import { fetchCollection } from '../../redux/actions/collectionActions';
import EventsSocket from '../../components/eventSocket';

// Custom Component and Modal
import ROUTES from '../../router';
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
import RevisionModeModal from '../../components/collection/modals/revisionModeModal';
import CollectionCard from '../../components/collection/collectionCard/collectionCard';
import CreateQuizModal from '../../components/quiz/modals/createQuizModal';

// Images
import filter from '../../assets/images/icons/filter.svg';
import folderGray from '../../assets/images/icons/folder-gray.svg';
// Styles
import './styles.scss';
import McqQuestionModal from '../../components/collection/modals/mcqQuestionModal';
import ModalConfirmation from '../../common/modalConfirmation';

const { TabPane } = Tabs;

const { Option } = Select;

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
    breadcrumbName: 'Maths',
  },
];

function CollectionDetails(props: any) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState(null);
  const [collectionModal, setCollectionModal] = useState<any>({
    visible: false,
    data: null,
  });

  const [isModalConfirmation, setIsModalConfirmation] = useState(false);
  const modalConfirmationToggle = () => {
    setIsModalConfirmation(!isModalConfirmation);
  };

  const [isShareModal, setIsShareModal] = useState(false);

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

  const [flashModal, setFlashModal] = useState({
    visible: false,
    data: null,
  });

  const [isRevisionModeModal, setIsRevisionModeModal] = useState(false);
  const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
  const toggleCollectionModal = (data = null) => {
    setCollectionModal({
      visible: !get(collectionModal, 'visible'),
      data: data,
    });
  };

  const shareToggleModal = () => {
    setIsShareModal(!isShareModal);
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

  const toggleFlashModal = (data = null) => {
    setFlashModal({
      visible: !get(flashModal, 'visible'),
      data: data,
    });
  };

  const revisionModeToggle = () => {
    setIsRevisionModeModal(!isRevisionModeModal);
  };

  const fetchCollectionDetails = () => {
    setLoading(true);
    dispatch(fetchCollection(id))
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
      <a onClick={() => toggleFlashModal()}>Flash Card</a>
    </div>
  );

  const onNotesSuccess = () => {
    toggleNoteModal();
    fetchCollectionDetails();
  };

  const onCollecitonSuccess = () => {
    toggleCollectionModal(null);
    fetchCollectionDetails();
  };

  const createQuizToggleModal = () => {
    setIsCreateQuizModal(!isCreateQuizModal);
  };

  return (
    <PrimaryLayout>
      <div className="collection-page-style">
        <PageHeader
          className="site-page-header header-back"
          onBack={() => navigate(-1)}
          title={get(collectionDetails, 'name')}
          breadcrumb={{ routes }}
          extra={[
            <Button
              icon={<ShareAltOutlined />}
              onClick={shareToggleModal}
              shape="round"
              type="primary"
              key="1"
            >
              Share
            </Button>,
          ]}
        />
        <Spin spinning={loading}>
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
                              onSuccess={fetchCollectionDetails}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </div>
                )}
              </TabPane>
              <TabPane tab="Question" key="3">
                {get(collectionDetails, 'questions', []).length > 0 && (
                  <div className="inline-button-section mt--20 mb--30">
                    <ButtonCustom
                      className="round-primary"
                      onClick={createQuizToggleModal}
                      title="Take a Quiz"
                    />
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
                      title="Create your Questions"
                      description="Quizzes will depend on questions you create here"
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
                                question={question}
                                collection={collectionDetails}
                                setLoading={setLoading}
                                onSuccess={fetchCollectionDetails}
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
                            setLoading={setLoading}
                            collection={collectionDetails}
                            onSuccess={fetchCollectionDetails}
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
            </Tabs>
          </div>
        </Spin>
      </div>
      {get(collectionDetails, 'id') && (
        <EventsSocket
          time={30}
          type="collection"
          uuid={get(collectionDetails, 'id')}
        />
      )}
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
      {isShareModal && (
        <ShareCollectionModal
          visible={isShareModal}
          collection={collectionDetails}
          onCancel={shareToggleModal}
          doneHandler={shareToggleModal}
          cancelHandler={shareToggleModal}
        />
      )}

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
            fetchCollectionDetails();
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
          fetchCollectionDetails();
        }}
        addButtonHandler={() => {
          setIsQuestionAddedModal({
            visible: false,
            edit: false,
          });
          toggleQuestionModal();
        }}
      />

      <CreateQuizModal
        visible={isCreateQuizModal}
        collections={[collectionDetails]}
        type="individual"
        onSuccess={(quiz: any) => {
          createQuizToggleModal();
          navigate(`${QUIZ_SCREEN}?uuid=${get(quiz, 'id')}`, {
            replace: true,
          });
        }}
        onCancel={createQuizToggleModal}
      />

      <ModalConfirmation
        visible={isModalConfirmation}
        handleCancel={modalConfirmationToggle}
        handleLeave={modalConfirmationToggle}
        cancelTitle="Cancel"
        confirmTitle="Yes. Delete"
        wrapClassName="delete-modal-style"
      >
        <div className="confirmation-section">
          <h2>Are you sure you want to delete this item!</h2>
        </div>
      </ModalConfirmation>

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

export default CollectionDetails;
