import {
  Button,
  Modal,
  Radio,
  Select,
  Form,
  InputNumber,
  Input,
  Spin,
  message,
} from 'antd';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
// Styles
import './styles.scss';
import { useState } from 'react';
import {
  createIndividualQuiz,
  createsharedCollectionQuiz,
} from '../../../redux/actions/quizActions';
import { CREATE_QUIZ_SUCCESS } from '../../../constants/messages';

const { Option } = Select;

function CreateQuizModal(props: any) {
  const { collections, type, onSuccess, noDisableSubFolder, initialValue } =
    props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isIndividual = type === 'individual';

  const generatePayload = (values: any) => {
    if (isIndividual) {
      return {
        name: get(values, 'name'),
        sub_folder_included: get(values, 'sub_folder_included'),
        no_of_question: get(values, 'no_of_question'),
        parent_id: get(values, 'collection'),
      };
    } else {
      return {
        name: get(values, 'name'),
        sub_folder_included: get(values, 'sub_folder_included'),
        no_of_question: get(values, 'no_of_question'),
        uuid: get(values, 'collection'),
      };
    }
  };

  const addIndividualQuiz = (payload: any) => {
    setLoading(true);
    dispatch(createIndividualQuiz(payload))
      .then((result: any) => {
        message.success(CREATE_QUIZ_SUCCESS);
        onSuccess(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const addSharedQuiz = (payload: any) => {
    setLoading(true);
    dispatch(createsharedCollectionQuiz(payload))
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
    const payload = generatePayload(values);
    if (isIndividual) {
      addIndividualQuiz(payload);
    } else {
      addSharedQuiz(payload);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        centered
        visible={props.visible}
        footer={false}
        destroyOnClose
        onCancel={props.onCancel}
        wrapClassName="create-modal-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
      >
        <Spin spinning={loading}>
          <div className="card-modal">
            <Form
              name="basic"
              layout="vertical"
              initialValues={initialValue ? initialValue : {}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="content-body">
                <div className="header">
                  <h3 className="title3">Create Quiz</h3>
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
                    name="collection"
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
                  Create Quiz
                </Button>
              </div>
            </Form>
          </div>
        </Spin>
      </Modal>
    </>
  );
}

export default CreateQuizModal;
