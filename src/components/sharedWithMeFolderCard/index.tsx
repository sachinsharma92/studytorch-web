import { Card } from 'antd';
import image from "../../assets/images/sharedWithMe/image.svg";
import EllipsisMenu from "../ellipsisMenu"
import CollectionFolder from "./collectionFolderSVG"
import Images from "../../assets/images/images";

import './styles.scss';

interface SharedFolderCardProps {
    folderName: string,
    folderColor: string,
    notes: string,
    quizzes: string,
    sharedBy: string
}

function SharedFolderCard(props: SharedFolderCardProps) {
    return(
        <div className="shared-folder-card-style">
            <Card>
                <div className="top-card-layer">
                    <div className="top-card-layer-left ">
                        <div className="folder-icon">
                            <CollectionFolder fillColor={props.folderColor}/>
                        </div>
                        <div className="collection-details">
                            <div className="collection-name">
                                <p>{props.folderName}</p>
                            </div>
                            <div className="collection-notes-quizzes">
                                <p>{props.notes} notes, {props.quizzes} quizzes</p>
                            </div>
                        </div>
                    </div>
                    <div className="top-card-layer-right">
                        <EllipsisMenu menuItems={[{name: "Delete", iconName: "deleteIcon"}, {name: "More info", iconName: "infoIcon"}]} />
                    </div>
                </div>
                <hr className="line" />
                <div className="bottom-card-layer">
                    <img src={image} />
                    <p>Shared by {props.sharedBy}</p>
                </div>
            </Card>        
        </div>
    )
}

export default SharedFolderCard;