import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Menu, Row, Modal, Popover, Input, Radio } from 'antd';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';

// Images
import folderGray from "../../assets/images/icons/folder-gray.svg";
import folderPurple from "../../assets/images/icons/folder-purple.svg";
import coralFolder from "../../assets/images/icons/coral-folder.svg";
import blueFolder from "../../assets/images/icons/folder-1.svg";
import folderPurpleUsers from "../../assets/images/icons/folder-purple-with-users.svg";
import babyPinkFolder from "../../assets/images/icons/baby-pink-folder.svg";
import CollectionCard from '../../components/collection/collectionCard/collectionCard';

// Styles
import './styles.scss';


const menu = (
	<Menu>
		<Menu.Item icon={<EditOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Rename
			</a>
		</Menu.Item>
		<Menu.Item icon={<DeleteOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Delete
			</a>
		</Menu.Item>
		<Menu.Item icon={<InfoCircleOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Get Details
			</a>
		</Menu.Item>
		<Menu.Item icon={<UserAddOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Share
			</a>
		</Menu.Item>
	</Menu>
);

const cardData = [
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: babyPinkFolder,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: blueFolder,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: coralFolder,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurpleUsers,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
]

function CollectionScreen(props: any) {
	const [isCollectionModal, setIsCollectionModal] = useState(false);

	const showModal = () => {
		setIsCollectionModal(true);
	};

	const handleCancel = () => {
		setIsCollectionModal(false);
	};

	const toggleData = (
		<div className="toggle-menu">
			<a onClick={showModal}>New Collection</a>
			<Link to="/">Notes</Link>
			<Link to="/">Question</Link>
		</div>
	);

	return (
		<PrimaryLayout>
			<div className="collection-page-style">
				<h3 className="title3">My Collection</h3>

				{props.collectionData ? <div className="state-center">
					<EmptyState
						imgUrl={folderGray}
						title="Create your Collection"
						description=" Your Collection can be the folder underwhich all the study material is kept"
						buttonText="Add Collection"
						buttonType="primary"
					/>
				</div>
					:
					<div className="card-section">
						<Row gutter={32}>
							{cardData.map((data, index) => (
								<Col sm={6} key={index}>
									<CollectionCard
										title={data.title}
										description={data.description}
										imgUrl={data.imgUrl}
										menuData={menu}
									/>
								</Col>
							))}
						</Row>
					</div>

				}
			</div>


			{/* Collection Modal here */}
			<Modal
				centered
				visible={isCollectionModal}
				footer={false}
				onCancel={handleCancel}
				wrapClassName="collection-modal-style"
				maskStyle={{ background: '#787D9F' }}
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
					<Button block type='primary' onClick={handleCancel}>Created</Button>
				</div>

			</Modal>

			<Popover
				content={toggleData}
				placement="topRight">
				<Button className="button-add-circle" shape="circle" type='primary' icon={<PlusOutlined />} />
			</Popover>

		</PrimaryLayout>
	)
}

export default CollectionScreen;