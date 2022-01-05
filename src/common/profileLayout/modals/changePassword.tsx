import { Button, Modal, Select, Form, Input } from 'antd';

// Styles
import './styles.scss';

const { Option } = Select;

function ChangePassword(props: any) {
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
      wrapClassName="planner-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >

      <div className="card-modal">

        <div className="content-body">
          <div className="header">
            <h3 className="title3">Change Password</h3>
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
              <Form.Item label="Old Password" name="title" rules={[{ required: true }]}>
                <Input placeholder='Enter Password' />
              </Form.Item>
              <Form.Item label="New Password" name="title" rules={[{ required: true }]}>
                <Input placeholder='Enter Password' />
              </Form.Item>
              <Form.Item label="Confim New Password" name="title" rules={[{ required: true }]}>
                <Input placeholder='Enter Password' />
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="button-bottom-section">
          <Button className="btn-cancel" onClick={props.addHandler}>Cancel</Button>
          <Button type="primary" onClick={props.addHandler}>Done</Button>
        </div>
      </div>

    </Modal>
  )
}

export default ChangePassword;