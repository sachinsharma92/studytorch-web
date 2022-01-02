import { useState } from 'react';
import { Button, Menu, Tabs, PageHeader } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import PlanAddModal from '../../components/planner/modals/planAddModal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

// Images
import folderGray from "../../assets/images/icons/folder-gray.svg";

// Styles
import './styles.scss';

const localizer = momentLocalizer(moment)

function PlannerScreen(props: any) {

	const [isPlannerAddModal, setIsPlannerAddModal] = useState(false);
	const plannerAddToggleModal = () => {
		setIsPlannerAddModal(!isPlannerAddModal);
	};

	return (
		<PrimaryLayout>
			<div className="planner-page-style">

				<PageHeader
					className="site-page-header header-back"
					title="Planner"
					extra={[
						<Button onClick={plannerAddToggleModal} shape="round" size="large" type="primary">
							<PlusSquareOutlined />Add
						</Button>
					]}
				/>

				{props.collectionData ?
					<div className="state-center">
						<EmptyState
							imgUrl={folderGray}
							title="Create your Collection"
							description=" Your Collection can be the folder underwhich all the study material is kept"
							buttonText="Add Collection"
							buttonType="primary"
						/>
					</div>
					:

					<div className="calendar-section">
						<Calendar
							localizer={localizer}
							// events={myEventsList}
							startAccessor="start"
							endAccessor="end"
							style={{ height: 600 }}
						/>
					</div>
				}

			</div>


			{/* Questions Modal */}
			<PlanAddModal
				visible={isPlannerAddModal}
				addHandler={plannerAddToggleModal}
				cancelHandler={plannerAddToggleModal}
				onCancel={plannerAddToggleModal}
			/>

		</PrimaryLayout>
	)
}

export default PlannerScreen;