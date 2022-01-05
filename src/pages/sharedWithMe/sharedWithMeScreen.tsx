import { useState } from "react";
import { Drawer } from 'antd';
import PrimaryLayout from "../../common/primaryLayout/primaryLayout"
import SharedWithMeCollection from "../../components/sharedWithMeCollection"
import CollectionFolderSVG from "../../common/collectionFolderSVG";

// Styles
import './styles.scss';

function SharedWithMeScreen() {
  const folderList = [
    {
      time: "Today",
      folders: [
        {
          folderName: "Maths",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Aakash"
        },
        {
          folderName: "Physics",
          folderColor: "#FCAB8E",
          notes: "0",
          quizzes: "5",
          sharedBy: "Aakash"
        },
        {
          folderName: "Chem",
          folderColor: "#FF8B8B",
          notes: "20",
          quizzes: "5",
          sharedBy: "Aakash"
        },
        {
          folderName: "Bio",
          folderColor: "#6FBEF6",
          notes: "20",
          quizzes: "5",
          sharedBy: "Aakash"
        }
      ]
    },
    {
      time: "Yesterday",
      folders: [
        {
          folderName: "English",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sachin Sharma"
        },
        {
          folderName: "SST",
          folderColor: "#6FBEF6",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sachin Sharma"
        },
        {
          folderName: "Bio",
          folderColor: "#FF8B8B",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sachin Sharma"
        },
        {
          folderName: "English",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sachin Sharma"
        },
        {
          folderName: "SST",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sachin Sharma"
        },
      ]
    },
    {
      time: "Last Week",
      folders: [
        {
          folderName: "English",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sukirti"
        },
        {
          folderName: "SST",
          folderColor: "#6FBEF6",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sukirti"
        },
        {
          folderName: "Bio",
          folderColor: "#FF8B8B",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sukirti"
        },
        {
          folderName: "English",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sukirti"
        },
        {
          folderName: "SST",
          folderColor: "#6455CD",
          notes: "20",
          quizzes: "5",
          sharedBy: "Sukirti"
        },
      ]
    }
  ]

  const [visible, setVisible] = useState(false);
  const handleToggleDrawer = () => {
    setVisible(!visible);
  };

  return (
    <>
      <PrimaryLayout>
        <div className="shared-page-style">
          <h3 className="title3">Shared with me</h3>
          {
            folderList.map((data, index) => (
              <SharedWithMeCollection
                key={index}
                timeFilter={data.time}
                folders={data.folders}
              />
            ))
          }
        </div>


        {/* Drawer Style here */}
        <Drawer
          title="Shared Information"
          maskClosable={true}
          closable={false}
          className="shared-information-drawer"
          placement="right"
          onClose={handleToggleDrawer}
          visible={true}
        >
          <div className="detail-section">
            <div className="flex">
              <div className="folder-icon">
                <CollectionFolderSVG fillColor={"#6C5ECF"} />
              </div>
              <div className="info-sec">
                <h4 className="title4">Maths</h4>
                <p>20 Notes, 2 quizes</p>
              </div>
            </div>
            <div className="shared-details">
              <div className="name">
                <p>Shared by </p>
                <h4 className="title4">Ayush Parashar</h4>
              </div>
              <div className="date">
                <p>Date</p>
                <h4 className="title4">05/08/2021</h4>
              </div>
            </div>
          </div>
        </Drawer>
      </PrimaryLayout>
    </>
  )
}

export default SharedWithMeScreen;
