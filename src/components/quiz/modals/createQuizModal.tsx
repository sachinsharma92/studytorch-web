import { Button, Col, Modal, Radio, Checkbox, Form, Input } from 'antd';
import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

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
        <h3 className="title3">Create Quiz</h3>

        <div className="question-section">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Collection"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="No. of Questions"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="radio-group">
              <h4 className="title4">Include sub questions</h4>
              <Radio.Group>
                <Radio value="a">Yes</Radio>
                <Radio value="b">No</Radio>
              </Radio.Group>
            </Form.Item>
{/* 
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
        </div>

        <div className="button-section">
          <Button onClick={props.buttonHandler}>Cancel</Button>
          <Button type="primary" onClick={props.buttonHandler}>Create Quiz</Button>
        </div>
      </div>

    </Modal>
  )
}

export default CreateQuizModal;