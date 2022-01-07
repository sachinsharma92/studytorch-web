import { Avatar, Button, List, Modal, Input, Select, Radio } from 'antd';
import { useState } from 'react';

// Images
import setting from "../../../assets/images/icons/setting.svg";
import arrowLeft from "../../../assets/images/icons/arrow-left.svg";


// Styles
import './styles.scss';

const { Option } = Select;

function ShareCollectionModal(props: any) {
	const [isSettingModal, setIsSettingModal] = useState(false);

	const settingModalToggle = () => {
		setIsSettingModal(!isSettingModal);
	};

	const [value, setValue] = useState(1);

	const onChange = (e: any) => {
		console.log('radio checked', e.target.value);
		setValue(e.target.value);
	};

	return (
		<>
			<Modal
				centered
				visible={props.visible}
				footer={false}
				onCancel={props.onCancel}
				wrapClassName="share-modal-style primary-modal-style"
				maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
				closable={false}
			>
				<div className="card-modal">
					<div className="modal-body-sec">

						<div className="header-section">
							<h3 className="title3">Share collection</h3>
							<button className="setting-button" onClick={settingModalToggle}><img src={setting} alt="" /></button>
						</div>
						<div className="input-section">
							<Input.Group>
								<Input defaultValue="share via entering email" />
								<Select defaultValue="can-view">
									<Option value="can-view">Can View</Option>
									<Option value="can-edit">Can Edit</Option>
								</Select>
							</Input.Group>
						</div>

						<List
							className="demo-loadmore-list"
							itemLayout="horizontal"
							dataSource={[1, 2]}
							renderItem={() => (
								<List.Item actions={[<a className="list-edit-button">Editor</a>, <a className="list-close-button">x</a>]}>
									<List.Item.Meta
										avatar={<Avatar className="avatar-sec">SS</Avatar>}
										title={<a href="https://ant.design">Gwen Stefancy</a>}
										description="gwen.s@gmail.com"
									/>
								</List.Item>
							)}
						/>
					</div>

					<div className="modal-footer-style">
						<Button block type='link' onClick={props.cancelHandler}>Cancel</Button>
						<Button block type='primary' onClick={props.doneHandler}>Done</Button>
					</div>
				</div>
			</Modal>

			<Modal
				centered
				visible={isSettingModal}
				footer={false}
				onCancel={settingModalToggle}
				wrapClassName="share-modal-style share-setting"
				maskStyle={{ background: '#4A527E' }}
				closable={false}
			>
				<div className="card-modal">
					<div className="modal-body-sec">

						<div className="header-section">
							<h3 className="title3">Share Settings</h3>
							<button className="setting-button" onClick={settingModalToggle}><img src={arrowLeft} alt="" /></button>
						</div>

						<div className="radio-section">
							<h4 className="title4">Share Sub-folders</h4>
							<Radio.Group onChange={onChange} value={value} size={'large'}>
								<Radio  value={1}>Yes</Radio>
								<Radio value={2}>No</Radio>
							</Radio.Group>
						</div>

						<div className="radio-section">
							<h4 className="title4">Action</h4>
							<Radio.Group onChange={onChange} value={value} size={'large'}>
								<Radio value={3}>Can Edit</Radio>
								<Radio value={4}>Can View</Radio>
							</Radio.Group>
						</div>

					</div>
				</div>
			</Modal>
		</>
	)
}

export default ShareCollectionModal;