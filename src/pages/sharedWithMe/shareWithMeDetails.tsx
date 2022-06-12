import { useState, useEffect } from "react";
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
  Spin,
  Modal,
  Breadcrumb,
  message,
  Pagination,
} from "antd";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  LoginOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import get from "lodash/get";
import map from "lodash/map";
import replace from "lodash/replace";
import { useNavigate, useParams } from "react-router-dom";
import { ExclamationCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
// Custom Component and Modal
import CreateCollectionModal from "../../components/collection/modals/createCollection";
import CollectionCard from "../../components/collection/collectionCard/collectionCard";
import { COLLECTION_LEAVE_SUCCESS } from "../../constants/messages";
import { SHARED_SCREEN } from "../../router/routes";
import ROUTES from "../../router";
import EventsSocket from "../../components/eventSocket";

import PrimaryLayout from "../../common/primaryLayout/primaryLayout";
import NotesCard from "../../components/collection/notesCard/notesCard";
import FlashCard from "../../components/collection/flashCard/flashCard";
import ShareCollectionModal from "../../components/collection/modals/shareCollection";

import ButtonCustom from "../../common/buttons/buttonCustom";
import QuestionCard from "../../components/collection/questionCard/questionCard";
import NoteModalCard from "../../components/collection/modals/noteModalCard";
import QuestionModal from "../../components/collection/modals/questionModal";
import RevisionModeModal from "../../components/collection/modals/revisionModeModal";
import CreateMultipleNoteModal from "../../components/collection/modals/createMultipleNoteModal";
import QuestionAddedModal from "../../components/collection/modals/questionAddedModal";
import FlashEditModal from "../../components/collection/modals/flashEditModal";
import CreateQuizModal from "../../components/quiz/modals/createQuizModal";
import {
  fetchSharedCollection,
  leaveShareCollection,
} from "../../redux/actions/collectionActions";
import EmptyState from "../../common/emptyState/emptyState";
import { getPaginatedData } from "../../utilities/helpers";
// Images
import filter from "../../assets/images/icons/filter.svg";
import Users3 from "../../assets/images/icons/3-user.svg";
import arrowDown from "../../assets/images/icons/arrow-down.svg";
import folderGray from "../../assets/images/icons/folder-gray.svg";

// Styles
import "./styles.scss";

const { confirm } = Modal;
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

function ShareWithMeDetails(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState({
    hasAccessToSubcollection: false,
    canEditCollection: false,
  });
  const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
  const [tabPagination, setTabPagination] = useState({
    collection: 1,
    notes: 1,
    question: 1,
    pageSize: 20,
  });

  const [collectionModal, setCollectionModal] = useState<any>({
    visible: false,
    data: null,
  });

  const [bulkNoteModal, setBulkNoteModal] = useState({
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

  const [isShareModal, setIsShareModal] = useState(false);

  const shareToggleModal = () => {
    setIsShareModal(!isShareModal);
  };

  const toggleCollectionModal = (data = null) => {
    setCollectionModal({
      visible: !get(collectionModal, "visible"),
      data: data,
    });
  };

  const createQuizToggleModal = () => {
    setIsCreateQuizModal(!isCreateQuizModal);
  };

  const toggleNoteModal = (data = null) => {
    setNoteModal({
      visible: !get(noteModal, "visible"),
      data: data,
    });
  };

  const toggleBulkNoteModal = (data = null) => {
    setBulkNoteModal({
      visible: !get(bulkNoteModal, "visible"),
      data: data,
    });
  };

  const onBulkNotesSuccess = () => {
    toggleBulkNoteModal();
    fetchSharedCollectionDetails();
  };

  const toggleQuestionModal = (data = null) => {
    setQuestionModal({
      visible: !get(questionModal, "visible"),
      data: data,
    });
  };

  const [flashModal, setFlashModal] = useState({
    visible: false,
    data: null,
    edit: false,
  });

  const toggleFlashModal = (data = null, edit = false) => {
    setFlashModal({
      visible: !get(flashModal, "visible"),
      edit,
      data: data,
    });
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
          hasAccessToSubcollection: get(result, "share.subfolders_shared")
            ? true
            : false,
          canEditCollection:
            get(result, "share.permission") === 2 ? true : false,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onRemoveSharedCollection = (collectionId: any) => {
    setLoading(true);
    dispatch(leaveShareCollection(collectionId))
      .then((result: any) => {
        message.success(COLLECTION_LEAVE_SUCCESS);
        navigate(SHARED_SCREEN, {
          replace: true,
        });
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
      <a onClick={() => toggleBulkNoteModal()}>Notes</a>
      <a onClick={() => toggleQuestionModal()}>Question</a>
      {/* <a onClick={() => toggleFlashModal()}>Flash Card</a> */}
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

  const onKeyPressFunction = (event: any) => {
    if (
      get(event, "altKey") &&
      get(event, "keyCode") === 67 &&
      get(collectionDetails, "subfolder_shared")
    ) {
      setCollectionModal({ visible: true, data: null });
    }

    if (get(event, "altKey") && get(event, "keyCode") === 78) {
      setNoteModal({ visible: true, data: null });
    }

    if (get(event, "altKey") && get(event, "keyCode") === 81) {
      setQuestionModal({ visible: true, data: null });
    }
  };

  useEffect(() => {
    if (!collectionDetails) {
      return;
    }

    if (!get(collectionDetails, "edit_persmission")) {
      return;
    }

    // @ts-ignore: Unreachable code error
    document.addEventListener("keydown", onKeyPressFunction);
    return () => {
      // @ts-ignore: Unreachable code error
      document.removeEventListener("keydown", onKeyPressFunction);
    };
  }, [collectionDetails]);

  const canEditCollection = get(collectionDetails, "edit_persmission");
  const canAccessSubCollection = get(collectionDetails, "subfolder_shared");

  if (!collectionDetails) {
    return <Skeleton />;
  }

  const routes = (collection: any) => {
    return (
      <Breadcrumb style={{ cursor: "pointer" }}>
        {get(collection, "parent") ? (
          <Breadcrumb.Item
            onClick={() => {
              navigate(-1);
            }}
          >
            {get(collection, "parent.name")}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            onClick={() => {
              navigate(-1);
            }}
          >
            Shared collections
          </Breadcrumb.Item>
        )}

        <Breadcrumb.Item>{get(collection, "name")}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <PrimaryLayout>
      <div className="share-detail-page-style">
        <Spin spinning={loading}>
          <PageHeader
            className="site-page-header header-back"
            onBack={() => navigate(-1)}
            title={get(collectionDetails, "name")}
            breadcrumb={routes(collectionDetails)}
            extra={[
              <div className="btn-section-top">
                <div className="user-flex-icon">
                  {get(collectionDetails, "shared_by_user.image") ? (
                    <Avatar
                      shape="circle"
                      size="small"
                      src={get(collectionDetails, "shared_by_user.image_url")}
                    />
                  ) : (
                    <Avatar
                      shape="circle"
                      size="small"
                      icon={<UserOutlined />}
                    />
                  )}
                  Shared by {get(collectionDetails, "shared_by_user.name")}
                </div>
                <Dropdown
                  placement="bottomRight"
                  overlayClassName="collection-dropdown"
                  overlay={
                    <Menu>
                      <Menu.Item
                        icon={<LoginOutlined />}
                        onClick={() =>
                          onConfirmDelete(get(collectionDetails, "id"))
                        }
                      >
                        Leave Group
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
                {canEditCollection && (
                  <Button
                    style={{ marginLeft: 20 }}
                    icon={<ShareAltOutlined />}
                    onClick={shareToggleModal}
                    shape="round"
                    type="primary"
                    key="1"
                  >
                    Share
                  </Button>
                )}
              </div>,
            ]}
          />

          <div className="tab-section">
            <Tabs>
              {canAccessSubCollection && (
                <TabPane tab="Collection" key="1">
                  {get(collectionDetails, "subCollections", []).length === 0 ? (
                    <div className="state-center">
                      <EmptyState
                        imgUrl={folderGray}
                        title={
                          get(permissions, "canEditCollection")
                            ? "Create your Collection"
                            : "No Sub collection present in this colleciton"
                        }
                        description=" Your Collection can be the folder underwhich all the study material is kept"
                        buttonText={
                          get(permissions, "canEditCollection")
                            ? "Add Collection"
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
                          getPaginatedData(
                            get(collectionDetails, "subCollections", []),
                            get(tabPagination, "collection"),
                            get(tabPagination, "pageSize")
                          ),
                          (collection, index) => (
                            <Col sm={6} key={index}>
                              <CollectionCard
                                id={get(collection, "id")}
                                hideEditDelete={!canEditCollection}
                                color={get(collection, "color")}
                                title={get(collection, "name")}
                                setLoading={setLoading}
                                withUserStyle
                                description={`${get(
                                  collection,
                                  "note_count"
                                )} Notes, ${get(
                                  collection,
                                  "question_count"
                                )} Quesitions`}
                                parentCollection={collectionDetails}
                                cardHandler={replace(
                                  ROUTES.SHARED_DETAILS_SCREEN,
                                  ":id",
                                  get(collection, "id")
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

                      <div className="pagination-section">
                        <Pagination
                          hideOnSinglePage
                          onChange={(p) => {
                            setTabPagination({
                              ...tabPagination,
                              collection: p,
                            });
                          }}
                          pageSize={get(tabPagination, "pageSize")}
                          defaultCurrent={get(tabPagination, "collection")}
                          total={
                            get(collectionDetails, "subCollections", []).length
                          }
                        />
                      </div>
                    </div>
                  )}
                </TabPane>
              )}
              <TabPane tab="Notes" key="2">
                {get(collectionDetails, "notes", []).length === 0 ? (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      title={
                        get(permissions, "canEditCollection")
                          ? "Create your Notes"
                          : "No Notes present in this collection"
                      }
                      description=" Your Notes contains content of your study material "
                      buttonText={
                        get(permissions, "canEditCollection")
                          ? "Add Notes"
                          : null
                      }
                      buttonType="primary"
                      buttonHandler={() => toggleNoteModal()}
                    />
                  </div>
                ) : (
                  <div className="card-section note-section">
                    <Row gutter={32}>
                      {map(
                        getPaginatedData(
                          get(collectionDetails, "notes", []),
                          get(tabPagination, "notes"),
                          get(tabPagination, "pageSize")
                        ),
                        (note, index) => (
                          <Col sm={8} key={index}>
                            <NotesCard
                              title={get(note, "title")}
                              id={get(note, "id")}
                              setLoading={setLoading}
                              description={get(note, "description")}
                              menuData={menu}
                              hideEditDelete={!canEditCollection}
                              cardHandler="/"
                              collection={collectionDetails}
                              tags={get(note, "tags")}
                              onEditNote={() => {
                                toggleNoteModal(note);
                              }}
                              onSuccess={fetchSharedCollectionDetails}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                    <div className="pagination-section">
                      <Pagination
                        hideOnSinglePage
                        onChange={(p) => {
                          setTabPagination({
                            ...tabPagination,
                            notes: p,
                          });
                        }}
                        pageSize={get(tabPagination, "pageSize")}
                        defaultCurrent={get(tabPagination, "notes")}
                        total={get(collectionDetails, "notes", []).length}
                      />
                    </div>
                  </div>
                )}
              </TabPane>
              <TabPane tab="Question" key="3">
                {get(collectionDetails, "questions", []).length > 0 && (
                  <div className="inline-button-section mt--20 mb--30">
                    <ButtonCustom
                      className="round-primary"
                      title="Take a Quiz"
                      onClick={createQuizToggleModal}
                    />
                    <ButtonCustom
                      className="round-primary"
                      icon={<img src={filter} alt="" />}
                      title="Filter"
                    />
                  </div>
                )}

                {get(collectionDetails, "questions", []).length === 0 ? (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      title={
                        get(permissions, "canEditCollection")
                          ? "Create your Questions"
                          : "No Question Present in this collection"
                      }
                      description=" Quizzes will depend on questions you create here"
                      buttonText={
                        get(permissions, "canEditCollection")
                          ? "Add Questions"
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
                        getPaginatedData(
                          get(collectionDetails, "questions", []),
                          get(tabPagination, "question"),
                          get(tabPagination, "pageSize")
                        ),
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
                    <div className="pagination-section">
                      <Pagination
                        hideOnSinglePage
                        onChange={(p) => {
                          setTabPagination({
                            ...tabPagination,
                            question: p,
                          });
                        }}
                        pageSize={get(tabPagination, "pageSize")}
                        defaultCurrent={get(tabPagination, "question")}
                        total={get(collectionDetails, "questions", []).length}
                      />
                    </div>
                  </div>
                )}
              </TabPane>
              {/* <TabPane tab="Flash Card" key="4">
                {get(collectionDetails, "flashCards", []).length > 0 && (
                  <div className="inline-button-section mb--20">
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
                  flashCards={get(collectionDetails, "flashCards", [])}
                />
                {get(collectionDetails, "flashCards", []).length === 0 && (
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
                      get(collectionDetails, "flashCards", []),
                      (flashCard, index) => (
                        <Col sm={8} key={index}>
                          <FlashCard
                            flashCard={flashCard}
                            setLoading={setLoading}
                            collection={collectionDetails}
                            hideEditDelete={!canEditCollection}
                            onSuccess={fetchSharedCollectionDetails}
                            onEditFlashCard={(data: any) => {
                              toggleFlashModal(data, true);
                            }}
                          />
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              </TabPane> */}
            </Tabs>
          </div>
        </Spin>
      </div>

      {get(collectionDetails, "id") && (
        <EventsSocket
          time={30}
          type="collection"
          uuid={get(collectionDetails, "id")}
        />
      )}

      {/* Collection Modal here */}
      {get(collectionModal, "visible") && (
        <CreateCollectionModal
          visible={get(collectionModal, "visible")}
          onCancel={() => toggleCollectionModal()}
          onSuccess={onCollecitonSuccess}
          edit={get(collectionModal, "data") ? true : false}
          initialValue={get(collectionModal, "data")}
          collection={collectionDetails}
        />
      )}

      {/* Share Modal here */}
      {isShareModal && (
        <ShareCollectionModal
          collection={collectionDetails}
          visible={isShareModal}
          onCancel={shareToggleModal}
          doneHandler={shareToggleModal}
          cancelHandler={shareToggleModal}
        />
      )}

      {/* Note Modal here */}
      {get(bulkNoteModal, "visible") && (
        <CreateMultipleNoteModal
          visible={get(bulkNoteModal, "visible")}
          collection={collectionDetails}
          onCancel={() => {
            toggleBulkNoteModal();
          }}
          onSuccess={onBulkNotesSuccess}
        />
      )}
      <NoteModalCard
        visible={get(noteModal, "visible")}
        collection={collectionDetails}
        onCancel={() => {
          toggleNoteModal();
        }}
        edit={get(noteModal, "data") ? true : false}
        initialValue={get(noteModal, "data")}
        onSuccess={onNotesSuccess}
      />

      <CreateQuizModal
        visible={isCreateQuizModal}
        collections={[collectionDetails]}
        type="shared"
        noDisableSubFolder={!canAccessSubCollection}
        initialValue={{
          collection: get(collectionDetails, "id"),
          sub_folder_included: canAccessSubCollection ? true : false,
        }}
        onSuccess={(quiz: any) => {
          createQuizToggleModal();
          navigate(`${ROUTES.QUIZ_SCREEN}?uuid=${get(quiz, "id")}`, {
            replace: true,
          });
        }}
        onCancel={createQuizToggleModal}
      />

      {/* Questions Modal */}
      {get(questionModal, "visible") && (
        <QuestionModal
          visible={get(questionModal, "visible")}
          edit={get(questionModal, "data") ? true : false}
          initialValue={get(questionModal, "data")}
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
        visible={get(isQuestionAddedModal, "visible")}
        edit={get(isQuestionAddedModal, "edit")}
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

      {get(flashModal, "visible") && (
        <FlashEditModal
          visible={get(flashModal, "visible")}
          initialValue={get(flashModal, "data")}
          edit={get(flashModal, "edit")}
          cancelHandler={() => toggleFlashModal()}
          collection={collectionDetails}
          onSuccess={() => {
            toggleFlashModal();
            fetchSharedCollectionDetails();
          }}
        />
      )}
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
