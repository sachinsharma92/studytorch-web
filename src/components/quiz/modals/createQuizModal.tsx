import { Button, Modal, Radio, Select, Form, Table, Avatar, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';
import { useState } from 'react';

const { Option } = Select;

const columns = [
  {
    title: 'Name (5 Members)',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
]

const data = [
  {
    key: '1',
    name: <div className='info-sec'><Avatar src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" /> Aakash  (Admin)</div>,
    action: <Checkbox>Selected</Checkbox>,
  },
  {
    key: '2',
    name: <div className='info-sec'><Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" /> Aayush</div>,
    action: <Checkbox>Unselected</Checkbox>,
  },
  {
    key: '3',
    name: <div className='info-sec'><Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" /> Sachin</div>,
    action: <Checkbox>Unselected</Checkbox>,
  },
  {
    key: '4',
    name: <div className='info-sec'><Avatar src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" /> Aakash  (Admin)</div>,
    action: <Checkbox>Selected</Checkbox>,
  },
  {
    key: '5',
    name: <div className='info-sec'><Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" /> Aayush</div>,
    action: <Checkbox>Unselected</Checkbox>,
  },
  {
    key: '6',
    name: <div className='info-sec'><Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" /> Sachin</div>,
    action: <Checkbox>Unselected</Checkbox>,
  },
];

function CreateQuizModal(props: any) {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [step1, setStep1] = useState(0);
  const stepToggle = () => {
    setStep1(step1 - 1);
  };

  return (
    <>
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
              <h3 className="title3">Create Quiz <span className='text-status'>(1/2)</span></h3>
            </div>

            {!step1 ?
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
              :
              <div className='table-layout-style'>
                <Table pagination={false} scroll={{ y: 240 }} columns={columns} dataSource={data} />
              </div>
            }
          </div>

          <div className="button-section">
            <Button className="btn-cancel" onClick={props.cancelHandler}>Cancel</Button>
            {!step1 ? <Button type="primary" onClick={stepToggle}> Next</Button>
              :
              <Button type="primary" onClick={props.createHandler}> Create Quiz</Button>
            }
          </div>
        </div>

      </Modal>
    </>
  )
}

export default CreateQuizModal;