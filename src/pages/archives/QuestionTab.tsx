import { useState, useEffect } from "react";
import { Spin, Space, Table, message, Tooltip, Popconfirm } from "antd";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import {
  fetchArchiveQuestion,
  archiveQuestion,
} from "../../redux/actions/questionActions";
import { QUESTION_UNARCHIVE_SUCCESS } from "../../constants/messages";
import FolderIconSVG from "../../common/FolderIconSVG";
import { CloudUploadOutlined } from "@ant-design/icons";

const QuestionTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getArchivedQuestion = () => {
    setLoading(true);
    dispatch(fetchArchiveQuestion())
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
    dispatch(archiveQuestion(id, payload))
      .then(() => {
        setLoading(false);
        message.success(QUESTION_UNARCHIVE_SUCCESS);
        getArchivedQuestion();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArchivedQuestion();
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
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => get(type, "name"),
          },
          {
            title: "Answer",
            dataIndex: "answers",
            key: "answers",
            render: (answers) => answers.join(","),
          },
          {
            title: "Collection",
            dataIndex: "note",
            key: "collection",
            render: (note) => (
              <Space size="large">
                <FolderIconSVG fillColor={get(note, "collection.color")} />
                {get(note, "collection.name")}
              </Space>
            ),
          },
          {
            title: "Note",
            dataIndex: "note",
            key: "note",
            render: (note) => get(note, "title"),
          },

          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Popconfirm
                title="Are you sure to you want to unarchive this Question?"
                onConfirm={() => {
                  onUnarchiveNote(get(record, "id"), {
                    parent_id: get(record, "note.collection.id"),
                    is_archived: false,
                  });
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Unarchive Question">
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

export default QuestionTab;
