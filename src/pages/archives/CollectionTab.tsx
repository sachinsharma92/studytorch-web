import { useState, useEffect } from "react";
import { Spin, Space, Table, Tooltip, Popconfirm, message } from "antd";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import {
  fetchArchiveCollection,
  archiveCollection,
} from "../../redux/actions/collectionActions";
import { COLLECTION_UNARCHIVE_SUCCESS } from "../../constants/messages";
import FolderIconSVG from "../../common/FolderIconSVG";
import { CloudUploadOutlined } from "@ant-design/icons";

const CollectionTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getArchivedCollection = () => {
    setLoading(true);
    dispatch(fetchArchiveCollection())
      .then((result: any) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onUnarchiveCollection = (id: any, payload: any) => {
    setLoading(true);
    dispatch(archiveCollection(id, payload))
      .then(() => {
        setLoading(false);
        message.success(COLLECTION_UNARCHIVE_SUCCESS);
        getArchivedCollection();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArchivedCollection();
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
          {
            title: "Collection",
            dataIndex: "color",
            key: "color",
            render: (color, record) => (
              <Space size="large">
                <FolderIconSVG fillColor={color} />
                {get(record, "name")}
              </Space>
            ),
          },
          { title: "Note Count", dataIndex: "note_count", key: "note_count" },
          {
            title: "Question Count",
            dataIndex: "question_count",
            key: "question_count",
          },
          {
            title: "Owner",
            dataIndex: "owner_type",
            key: "owner_type",
            render: (ownerType) =>
              ownerType === "User" ? "User Collection" : "Group Collection",
          },
          {
            title: "Parent collection",
            dataIndex: "parent",
            key: "parent",
            render: (parent) => get(parent, "name"),
          },
          {
            title: "Action",
            key: "action",
            render: (record) => (
              <Popconfirm
                title="Are you sure to you want to unarchive this collection?"
                onConfirm={() => {
                  onUnarchiveCollection(get(record, "id"), {
                    parent_id: get(record, "parent.id"),
                    is_archived: false,
                  });
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Unarchive collection">
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

export default CollectionTab;
