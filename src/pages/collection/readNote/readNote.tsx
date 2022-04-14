import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import map from "lodash/map";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import ReactToPrint from "react-to-print";
import {
  Button,
  Breadcrumb,
  Tag,
  Spin,
  Dropdown,
  Menu,
  Image,
  Divider,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { fetchNoteDetails } from "../../../redux/actions/noteActions";
import EventsSocket from "../../../components/eventSocket";
import PrimaryLayout from "../../../common/primaryLayout/primaryLayout";
import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";
import iconMore from "../../../assets/images/icons/more-dircle.svg";
import FlashCardPopOver from "../../../components/flashCardPopover";
import FlashEditModal from "../../../components/collection/modals/flashEditModal";

// Images

// Styles
import "./styles.scss";

function ReadNoteScreen(props: any) {
  const [note, setNote] = useState(null);
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ref, setRef] = useState<HTMLElement>();
  const { search } = useLocation();
  let query = new URLSearchParams(search);

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

  const getNoteDescription = () => {
    if (note) {
      const t = EditorState.createWithContent(
        convertFromRaw(get(note, "description"))
      );
      return draftToHtml(convertToRaw(t.getCurrentContent()));
    }
  };

  const getNote = () => {
    setLoading(true);
    dispatch(fetchNoteDetails(id))
      .then((result: any) => {
        setLoading(false);
        setNote(result);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNote();
  }, []);

  function clearSelection() {
    if (window.getSelection) {
      // @ts-ignore: Unreachable code error
      window.getSelection().removeAllRanges();
      // @ts-ignore: Unreachable code error
    } else if (document.selection) {
      // @ts-ignore: Unreachable code error
      document.selection.empty();
    }
  }

  const menu = (
    <Menu>
      <ReactToPrint
        pageStyle="padding:10px; background:red;"
        trigger={() => (
          <Menu.Item icon={<DownloadOutlined />}>Print/Donwload PDF</Menu.Item>
        )}
        content={() => componentRef.current}
      />
    </Menu>
  );

  return (
    <PrimaryLayout>
      <Spin spinning={loading}>
        {get(note, "id") && (
          <EventsSocket time={30} type="note" uuid={get(note, "id")} />
        )}
        <div className="read-note-style">
          <div className="action-section">
            <div className="top-button-section">
              {query.get("noBack") ? (
                <></>
              ) : (
                <Button className="btn-outline" onClick={() => navigate(-1)}>
                  <img src={iconArrowLeft} alt="" /> Back
                </Button>
              )}
            </div>
            <div className="collection-name-container">
              <Breadcrumb>
                <Breadcrumb.Item>Adding in Collections</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {get(note, "collection.name")}
                </Breadcrumb.Item>
              </Breadcrumb>
              <Dropdown
                overlayClassName="collection-dropdown"
                overlay={menu}
                placement="bottomRight"
              >
                <img alt="" src={iconMore} className="icon-style" />
              </Dropdown>
            </div>
          </div>
          <div className="view-section" ref={componentRef}>
            <h1 className="title1">{get(note, "title")}</h1>
            <div className="tag-section">
              {map(get(note, "tags", []), (t, i) => (
                <Tag className="tag-style" key={i}>
                  {t}
                </Tag>
              ))}
            </div>
            <Divider />
            <div
              ref={(el) => el != null && setRef(el)}
              dangerouslySetInnerHTML={{
                __html: getNoteDescription(),
              }}
            ></div>
            <Divider />
            {map(get(note, "images"), (image) => (
              <Image
                width={100}
                style={{ padding: 10 }}
                src={get(image, "url")}
              />
            ))}
          </div>
        </div>
      </Spin>
      {/* <FlashCardPopOver
        ref={ref}
        onAddFlashCard={(val: any) => {
          clearSelection();
          toggleFlashModal(val, false);
        }}
      /> */}
      {get(flashModal, "visible") && (
        <FlashEditModal
          visible={get(flashModal, "visible")}
          initialValue={get(flashModal, "data")}
          edit={get(flashModal, "edit")}
          cancelHandler={toggleFlashModal}
          collection={get(note, "collection")}
          onSuccess={() => {
            toggleFlashModal(null);
          }}
        />
      )}
    </PrimaryLayout>
  );
}

export default ReadNoteScreen;
