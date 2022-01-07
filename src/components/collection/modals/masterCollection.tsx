import { Button, Modal, Input, Radio } from 'antd';

// Styles
import './styles.scss';

function CollectionDetails(props: any) {

	return (
		<Modal
			centered
			visible={props.visible}
			footer={false}
			onCancel={props.onCancel}
			wrapClassName="collection-modal-style primary-modal-style"
			maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
		>

			<div className="card-modal">
				<h3 className="title3">Create a Master Collection</h3>

				<div className="input-section">
					<div className="label">
						Collection name
					</div>
					<Input placeholder="Ex. Maths" />
				</div>

				<div className="folder-color-section">
					<div className="label">Select Color</div>

					<Radio.Group>
						<Radio.Button value="a" className='radio-button purple-color' />
						<Radio.Button value="b" className='radio-button face-color' />
						<Radio.Button value="c" className='radio-button coral-color' />
						<Radio.Button value="d" className='radio-button sky-blue-color' />
					</Radio.Group>
				</div>
				<Button block type='primary' href={props.buttonHandler}>Created</Button>
			</div>

		</Modal>
	)
}

export default CollectionDetails;