import { Dropdown, Input, Checkbox, Row, Col } from 'antd';
import verticalDot from "../../assets/images/icons/vertical-dot.svg";

// Styles
import './styles.scss';

const { Search } = Input;

function ChecklistCard(props: any) {
	function onChange(checkedValues: any) {
		console.log('checked = ', checkedValues);
	}

	return (
		<div className="checklist-card-style" onClick={props.onClick}>
			<div className="card-style">
				<div className="header">
					<h4 className="title4">
						Name of To Do <span>(3/5)</span>
					</h4>

					<Dropdown overlayClassName="collection-dropdown" overlay={props.menuData}>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							<img src={verticalDot} className="icon-style" />
						</a>
					</Dropdown>
				</div>

				<div className="list-section">
					<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
						<Row>
							<Col span={24}>
								<div className="checkbox-item">
									<Checkbox value="a">Add prototype device type</Checkbox>
									<Dropdown overlayClassName="list-dropdown" overlay={props.menuData}>
										<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
											<img src={verticalDot} className="icon-style" />
										</a>
									</Dropdown>
								</div>
							</Col>
							<Col span={24}>
								<div className="checkbox-item">
									<Checkbox value="b">Do we need a design for the new SE?</Checkbox>
									<Dropdown overlayClassName="list-dropdown" overlay={props.menuData}>
										<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
											<img src={verticalDot} className="icon-style" />
										</a>
									</Dropdown>
								</div>
							</Col>
							<Col span={24}>
								<div className="checkbox-item">
									<Checkbox value="c">Link design in JIRA</Checkbox>
									<Dropdown overlayClassName="list-dropdown" overlay={props.menuData}>
										<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
											<img src={verticalDot} className="icon-style" />
										</a>
									</Dropdown>
								</div>
							</Col>
							<Col span={24}>
								<div className="checkbox-item">
									<Checkbox value="d">Draw new chevron icon</Checkbox>
									<Dropdown overlayClassName="list-dropdown" overlay={props.menuData}>
										<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
											<img src={verticalDot} className="icon-style" />
										</a>
									</Dropdown>
								</div>
							</Col>
							<Col span={24}>
								<div className="checkbox-item">
									<Checkbox value="e">Draw new chevron icon</Checkbox>
									<Dropdown overlayClassName="list-dropdown" overlay={props.menuData}>
										<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
											<img src={verticalDot} className="icon-style" />
										</a>
									</Dropdown>
								</div>
							</Col>
						</Row>
					</Checkbox.Group>
				</div>

				<div className="input-section">
					<Search placeholder="Add to Checklist" enterButton="+" />
				</div>
			</div>
		</div>
	)
}

export default ChecklistCard;