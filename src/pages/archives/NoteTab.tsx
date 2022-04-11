import { useState, useEffect } from "react";
import { Spin, Space, Table, message, Tag, Tooltip, Popconfirm } from "antd";
import get from "lodash/get";
import map from "lodash/map";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { truncateText } from "../../utilities/helpers";
import { useDispatch } from "react-redux";
import { NOTE_UNARCHIVE_SUCCESS } from "../../constants/messages";
import { fetchArchiveNote, archiveNote } from "../../redux/actions/noteActions";
import FolderIconSVG from "../../common/FolderIconSVG";
import { CloudUploadOutlined } from "@ant-design/icons";

const NoteTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getArchivedNotes = () => {
    setLoading(true);
    dispatch(fetchArchiveNote())
      .then((result: any) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onUnarchiveNote = (id: any, payload: any) => {
    setLoading(true);
    dispatch(archiveNote(id, payload))
      .then(() => {
        setLoading(false);
        message.success(NOTE_UNARCHIVE_SUCCESS);
        getArchivedNotes();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArchivedNotes();
  }, []);

  return (
    <Spin spinning={loading}>
      <Table
        pagination={{
          pageSize: 20,
          hideOnSinglePage: true,
          total: data.length,
        }}
        bordered
        size="small"
        dataSource={data}
        columns={[
          { title: "Title", dataIndex: "title", key: "title" },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (description) => {
              const t = EditorState.createWithContent(
                convertFromRaw(description)
              );
              return truncateText(
                draftToHtml(convertToRaw(t.getCurrentContent())).replace(
                  /<[^>]+>/g,
                  ""
                ),
                50
              );
            },
          },
          {
            title: "Collection",
            dataIndex: "collection",
            key: "collection",
            render: (collection) => (
              <Space size="large">
                <FolderIconSVG fillColor={get(collection, "color")} />
                {get(collection, "name")}
              </Space>
            ),
          },
          {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags) => map(tags, (t) => <Tag>{t}</Tag>),
          },
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Popconfirm
                title="Are you sure to you want to unarchive this Note?"
                onConfirm={() => {
                  onUnarchiveNote(get(record, "id"), {
                    parent_id: get(record, "collection.id"),
                    is_archived: false,
                  });
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Unarchive Note">
                  <CloudUploadOutlined style={{ fontSize: 30 }} />
                </Tooltip>
              </Popconfirm>
            ),
          },
        ]}
      />
    </Spin>
  );
};

export default NoteTab;
