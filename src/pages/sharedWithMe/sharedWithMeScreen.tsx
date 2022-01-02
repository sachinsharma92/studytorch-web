import SharedFolderCard from "../../components/sharedWithMeFolderCard";
import { Col, Row } from 'antd';

// Styles
import './styles.scss';

function SharedWithMeScreen() {
    const folderList = [
        {
            folderName: "Maths",
            folderColor: "#6455CD",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Physics",
            folderColor: "#FCAB8E",
            notes: "0",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Chem",
            folderColor: "#FF8B8B",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Bio",
            folderColor: "#6FBEF6",
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

    return(
        <>
            <Row gutter={[32,32]}>                    
                {folderList.map((data, index) => (
                    <Col key={index}>
                        <SharedFolderCard 
                            folderName={data.folderName} 
                            folderColor={data.folderColor} 
                            notes={data.notes} 
                            quizzes={data.quizzes}
                            sharedBy={data.sharedBy}
                        />
                    </Col>
                ))}                             
          </Row>            
        </>        
    )
}

export default SharedWithMeScreen;
