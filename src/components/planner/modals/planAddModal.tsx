import { Button, Modal, Radio, Select, Form, Input, DatePicker, Row, Col, TimePicker } from 'antd';
import moment from 'moment';

// Styles
import './styles.scss';

const { Option } = Select;

function PlanAddModal(props: any) {
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
            <h3 className="title3">Plan</h3>
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
              <Form.Item name="title" rules={[{ required: true }]}>
                <Input placeholder='Title' />
              </Form.Item>

              <Form.Item name="description" rules={[{ required: true }]}>
                <Input.TextArea placeholder='Click to add Description' rows={5} />
              </Form.Item>

              <div className="folder-color-section">
                <div className="text-label">
                  Label color
                </div>
                <Radio.Group>
                  <Radio.Button value="a" className='radio-button gray-color' />
                  <Radio.Button value="b" className='radio-button purple-color' />
                  <Radio.Button value="c" className='radio-button orange-color' />
                  <Radio.Button value="d" className='radio-button light-red-color' />
                  <Radio.Button value="e" className='radio-button yellow-color' />
                </Radio.Group>
              </div>

              <Form.Item name="description" rules={[{ required: true }]}>
                <DatePicker className="date-planner" />
              </Form.Item>

              <Row gutter={24}>
                <Col sm={12}>
                  <Form.Item name="description" rules={[{ required: true }]}>
                    <TimePicker className="timepicker" defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item name="description" rules={[{ required: true }]}>
                    <TimePicker className="timepicker" defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        <div className="button-section">
          <Button className="btn-cancel" onClick={props.cancelHandler}>Cancel</Button>
          <Button type="primary" onClick={props.addHandler}>Add</Button>
        </div>
      </div>

    </Modal>
  )
}

export default PlanAddModal;