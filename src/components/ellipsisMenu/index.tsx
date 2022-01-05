import kebabMenu from "../../assets/images/sharedWithMe/kebabMenu.svg";
import Images from '../../assets/images/images';
import { Menu } from 'antd';

import './styles.scss';

const { SubMenu } = Menu;
interface EllipsisMenuProps {
	menuItems: IMenuItemsProps[];
}
interface IMenuItemsProps {
	name: string;
	iconName: string;
	onClick?:any
}

function EllipsisMenu(props: EllipsisMenuProps) {
	let menuItems = props.menuItems;
	return (
		<div className="vertical-ellipsis-menu">
			<Menu mode="vertical" className="collection-dropdown" triggerSubMenuAction="hover">
				<SubMenu icon={<img src={kebabMenu} />}>
					{
						menuItems.map((item, index) => (
							<Menu.Item
								key={index}
								onClick={item.onClick}
								icon={<img src={(Images["sharedWithMe"][item.iconName]).default} />}>
								{item.name}
							</Menu.Item>
						))
					}
				</SubMenu>
			</Menu>
		</div>
	)
}

export default EllipsisMenu;