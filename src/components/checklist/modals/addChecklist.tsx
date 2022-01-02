import { Button, Modal, Radio, Select, Form, Input, DatePicker, Row, Col, TimePicker } from 'antd';
import moment from 'moment';

// Styles
import './styles.scss';

const { Option } = Select;

function AddChecklist(props: any) {
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
            <h3 className="title3">Create a Study Checklist</h3>
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
              <Form.Item  label="Enter name" name="title" rules={[{ required: true }]}>
                <Input placeholder='List name' />
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="button-section">
          <Button block type="primary" onClick={props.addHandler}>Save</Button>
        </div>
      </div>

    </Modal>
  )
}

export default AddChecklist;