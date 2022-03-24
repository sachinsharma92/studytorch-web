import { useState } from 'react';
import { Button, Modal, Form, Spin, Divider, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
// Images
import iconArrowLeft from '../../../assets/images/icons/caret-Left.svg';
import ButtonCustom from '../../../common/buttons/buttonCustom';
import {
  createFlashCard,
  updateFlashCard,
} from '../../../redux/actions/flashCardActions';
// Styles
import './styles.scss';
import {
  CREATE_FLASHCARD_SUCCESS,
  UPDATE_FLASHCARD_SUCCESS,
} from '../../../constants/messages';

function FlashEditModal(props: any) {
  const { onSuccess, edit, initialValue, collection } = props;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addFlashCard = (payload: any) => {
    setLoading(true);
    dispatch(createFlashCard(payload))
      .then(() => {
        setLoading(false);
        message.success(CREATE_FLASHCARD_SUCCESS);
        onSuccess(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editFlashCard = (payload: any) => {
    setLoading(true);
    dispatch(updateFlashCard(get(initialValue, 'id'), payload))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_FLASHCARD_SUCCESS);
        onSuccess(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: number[]) => {
    const payload = { ...values, parent_id: get(collection, 'id') };

    if (edit) {
      editFlashCard(payload);
    } else {
      addFlashCard(payload);
    }
  };

  const onFinishFailed = () => {};
  return (
    <Modal
      centered
      destroyOnClose
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="flash-edit-modal primary-modal-style"
      maskStyle={{ background: 'rgba(30,38,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <div className="top-button-section">
            <Button onClick={props.cancelHandler} className="btn-outline">
              <img src={iconArrowLeft} alt="" /> Back
            </Button>
          </div>
          <h3 className="title3">{edit ? 'Edit' : 'Add'} Flash Card</h3>
          <Form
            name="basic"
            initialValues={initialValue}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <div className="main-content-section">
              <h2 className="title2">
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Title !',
                    },
                  ]}
                >
                  <Input
                    className="input-lg-style"
                    placeholder="Flashcard Title..."
                  />
                </Form.Item>
              </h2>
              <Divider />
              <p className="description">
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Please input description !',
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={10}
                    placeholder="Flashcard Description..."
                  />
                </Form.Item>
              </p>
            </div>

            <div className="button-bottom-section">
              <ButtonCustom
                onClick={props.cancelHandler}
                className="round-sm-primary"
                title="Cancel"
              />
              <div className={`button-custom`}>
                <Button type="primary" htmlType="submit">
                  {edit ? 'Update' : 'Add'} Card
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default FlashEditModal;
