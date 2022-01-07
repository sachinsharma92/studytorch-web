import { Modal, Input, Divider, List, Typography } from 'antd';
import ButtonCustom from '../buttons/buttonCustom';
import smallFolder from "../../assets/images/icons/folder-small.svg"

// Styles
import './styles.scss';

const { Search } = Input;

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
];

function SearchDataModal(props: any) {

	return (
		<Modal
			centered
			visible={props.visible}
			footer={false}
			onCancel={props.handleCancel}
			wrapClassName="search-modal-style primary-modal-style"
			maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
		>
			<div className="card-modal">
				<div className="modal-content-body">
					<div className={`search-primary ${props.searchStyle}`} onClick={props.onClick}>
						<Search placeholder="Search WorkSpace" />
					</div>
					<Divider />
					<List
						dataSource={data}
						header="Recent searches"
						renderItem={item => (
							<List.Item>
								<img src={smallFolder} className='small-folder-icon' /> {item}
							</List.Item>
						)}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default SearchDataModal;