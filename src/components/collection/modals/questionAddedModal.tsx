import { Button, Modal } from 'antd';
import ButtonCustom from '../../../common/buttons/buttonCustom';

// Images
import iconDone from '../../../assets/images/icons/done.svg';

// Styles
import './styles.scss';

function QuestionAddedModal(props: any) {
  const { edit } = props;
  console.log({ edit });
  return (
    <>
      <Modal
        centered
        visible={props.visible}
        footer={false}
        onCancel={props.onCancel}
        wrapClassName="question-add-modal-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
        closable={false}
      >
        <div className="card-modal">
          <div className="modal-content-body">
            <img src={iconDone} alt="" />
            <h3 className="title3">Question {edit ? 'Updated' : 'Added'}</h3>
            <p className="description">
              Get ready to answer these qutestions in Quiz.
            </p>
          </div>

          <div className="modal-footer-style">
            <Button block type="primary" onClick={props.buttonDoneHandler}>
              Done
            </Button>
            <ButtonCustom
              type="primary"
              className="round-sm-primary"
              onClick={props.addButtonHandler}
              title="Add another question"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default QuestionAddedModal;
