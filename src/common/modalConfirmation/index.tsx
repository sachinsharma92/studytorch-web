import { Button, Modal, Input, Radio } from 'antd';
import ButtonCustom from '../buttons/buttonCustom';

// Styles
import './styles.scss';

function ModalConfirmation(props: any) {

	return (
		<Modal
			centered
			visible={props.visible}
			footer={false}
			onCancel={props.handleCancel}
			wrapClassName="modal-confirmation primary-modal-style"
			maskStyle={{ background: 'rgba(30,39,94, 0.6)'}}
		>
			<div className="card-modal">
				<div className="modal-content-body">
					{props.children}
				</div>
				<div className="button-bottom-section">
					<ButtonCustom onClick={props.handleCancel} type="link" title="Cancel" />
					<ButtonCustom type='danger' onClick={props.handleLeave} title="Yes. Leave" />
				</div>
			</div>

		</Modal>
	)
}

export default ModalConfirmation;