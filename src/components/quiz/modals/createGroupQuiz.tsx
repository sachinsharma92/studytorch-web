import {
  Button,
  Modal,
  Radio,
  Select,
  Form,
  Table,
  Avatar,
  Space,
  message,
  Input,
  InputNumber,
  Spin,
  notification,
} from 'antd';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
import assign from 'lodash/assign';
import { getNameAvatar } from '../../../utilities/helpers';
import { avatarColors } from '../../../constants/groups';
import { createGroupCollectionQuiz } from '../../../redux/actions/quizActions';

// Styles
import './styles.scss';
import { useState } from 'react';
import { CREATE_QUIZ_SUCCESS } from '../../../constants/messages';

const { Option } = Select;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: any, record: any, index: any) => {
      return (
        <div className="info-sec">
          <Space>
            {get(record, 'image') ? (
              <Avatar src={get(record, 'image_url')} />
            ) : (
              getNameAvatar(get(record, 'name'), 30, avatarColors[index % 4])
            )}

            {name}
          </Space>
        </div>
      );
    },
  },
];

function CreateGroupQuizModal(props: any) {
  const { collections, members, onSuccess, noDisableSubFolder, group } = props;
  const [loading, setLoading] = useState(false);
  const [quizPayload, setQuizPayload] = useState(null);
  const [selectMembers, setSelectedMembers] = useState<any>([]);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const stepToggle = () => {
    setStep(step + 1);
  };

  const addGroupQuiz = (payload: any) => {
    setLoading(true);
    dispatch(createGroupCollectionQuiz(get(group, 'id'), payload))
      .then((result: any) => {
        message.success(CREATE_QUIZ_SUCCESS);
        onSuccess(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    setQuizPayload(values);
    stepToggle();
  };

  const onFinalSubmit = () => {
    const payload = {};
    if (selectMembers.length === 0) {
      notification.error({
        message: 'Member selection required',
        description: 'Please select atleast one member',
      });
      return;
    }
    console.log(payload);
    assign(payload, quizPayload);
    assign(payload, { members: selectMembers });

    addGroupQuiz(payload);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setSelectedMembers([...map(selectedRows, 'id')]);
    },
    selectedRowKeys: selectMembers,
  };

  return (
    <>
      <Modal
        centered
        visible={props.visible}
        maskClosable={false}
        footer={false}
        onCancel={props.onCancel}
        wrapClassName="create-modal-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
      >
        <Spin spinning={loading}>
          {step === 0 ? (
            <div className="card-modal">
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div className="content-body">
                  <div className="header">
                    <h3 className="title3">
                      Create Quiz <span className="text-status">(1/2)</span>
                    </h3>
                  </div>

                  <div className="question-section">
                    <Form.Item
                      name="name"
                      label="Quiz Name"
                      rules={[
                        {
                          required: true,
                          message: 'Quiz name is required !',
                        },
                      ]}
                    >
                      <Input placeholder="Quiz Name" />
                    </Form.Item>
                    <Form.Item
                      name="collection_uuid"
                      label="Collection"
                      rules={[
                        {
                          required: true,
                          message: ' Collection field is required !',
                        },
                      ]}
                    >
                      <Select placeholder="Select collection" allowClear>
                        {map(collections, (collection) => {
                          return (
                            <Option value={get(collection, 'id')}>
                              {get(collection, 'name')}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="no_of_question"
                      label="No. of Questions"
                      rules={[
                        {
                          required: true,
                          message: ' Number of question field is required !',
                        },
                      ]}
                    >
                      <InputNumber
                        min={2}
                        placeholder="Select No. of Questions"
                        style={{ width: '50%' }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="sub_folder_included"
                      label="Include sub questions"
                      rules={[
                        {
                          required: true,
                          message: 'Please select one option!',
                        },
                      ]}
                    >
                      <Radio.Group disabled={noDisableSubFolder}>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>

                <div className="button-section">
                  <Button className="btn-cancel" onClick={props.onCancel}>
                    Cancel
                  </Button>

                  <Button type="primary" htmlType="submit">
                    {' '}
                    Next
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <div className="card-modal">
              <div className="content-body">
                <div className="header">
                  <h3 className="title3">
                    Create Quiz <span className="text-status">(1/2)</span>
                  </h3>
                </div>
                <div className="table-layout-style">
                  <Table
                    pagination={false}
                    rowKey="id"
                    rowSelection={{
                      ...rowSelection,
                    }}
                    scroll={{ y: 240 }}
                    columns={columns}
                    dataSource={members}
                  />
                </div>
              </div>
              <div className="button-section">
                <Button className="btn-cancel" onClick={props.onCancel}>
                  Cancel
                </Button>

                <Button type="primary" onClick={onFinalSubmit}>
                  {' '}
                  Create Quiz
                </Button>
              </div>
            </div>
          )}
        </Spin>
      </Modal>
    </>
  );
}

export default CreateGroupQuizModal;
