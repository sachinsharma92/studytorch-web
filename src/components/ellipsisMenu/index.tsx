import kebabMenu from "../../assets/images/sharedWithMe/kebabMenu.svg"
import MenuItem from "./menuItem"
import { Menu } from 'antd';

import './styles.scss';

const { SubMenu } = Menu;

interface EllipsisMenuProps {
    items: item[];
}

interface item {
    name: string;
    iconName: string;
}

function EllipsisMenu(props : EllipsisMenuProps) {
    let menuItems = props.items;
    return(
        <div className="vertical-ellipsis-menu">
            <Menu mode="vertical" triggerSubMenuAction="hover">
                <SubMenu icon={<img src={kebabMenu} />}>
                    {
                        menuItems.map(item => <MenuItem name={item.name} iconName={item.iconName}/>)                     
                    }            
                </SubMenu>
            </Menu>
        </div>
    )
}

export default EllipsisMenu;