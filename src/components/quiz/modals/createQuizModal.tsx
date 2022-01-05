import { Button, Modal, Radio, Select, Form, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

const { Option } = Select;

function CreateQuizModal(props: any) {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="create-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >

      <div className="card-modal">

        <div className="content-body">

          <div className="header">
            <h3 className="title3">Create Quiz</h3>
          </div>

          <div className="question-section">
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="collection" label="Collection" rules={[{ required: true }]}>
                <Select
                  placeholder="Select collection"
                  allowClear
                >
                  <Option value="maths">Maths</Option>
                  <Option value="hindi">Hindi</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="no-questions" label="No. of Questions" rules={[{ required: true }]}>
                <Select
                  placeholder="Select No. of Questions"
                  allowClear
                >
                  <Option value="four">Four</Option>
                  <Option value="five">Five</Option>
                  <Option value="six">Six</Option>
                </Select>
              </Form.Item>

              <Form.Item name="radio-group">
                <p className="description">Include sub questions</p>
                <Radio.Group>
                  <Radio value="a">Yes</Radio>
                  <Radio value="b">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="button-section">
          <Button className="btn-cancel" onClick={props.cancelHandler}>Cancel</Button>
          <Button type="primary" onClick={props.createHandler}>Create Quiz</Button>
        </div>
      </div>

    </Modal>
  )
}

export default CreateQuizModal;