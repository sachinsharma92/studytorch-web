import { Menu } from 'antd';
import Images from "../../../assets/images/images"

import './styles.scss';

interface EllipsisMenuItemProps {
    name: string;
    iconName: string;
}

function EllipsisMenuItem(props : EllipsisMenuItemProps) {
    return(
        <div className="vertical-ellipsis-menu-item">
            <Menu.Item icon={<img src={(Images["sharedWithMe"][props.iconName]).default} />}>{props.name}</Menu.Item>
        </div>
    )
}

export default EllipsisMenuItem;

//make alias of props and export to improt in ellipse
// extend typescript
// solve warning
// finish 
