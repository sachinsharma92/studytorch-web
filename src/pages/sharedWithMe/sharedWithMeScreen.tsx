import SharedFolderCard from "../../component/sharedWithMeFolderCard";
import { Col, Row } from 'antd';

// Styles
import './styles.scss';

function SharedWithMeScreen() {
    const folderList = [
        {
            folderName: "Maths",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Physics",
            notes: "0",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Chem",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Bio",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "English",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "SST",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "Bio",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "English",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },
        {
            folderName: "SST",
            notes: "20",
            quizzes: "5",
            sharedBy: "Sukirti"
        },

    ]

    return(
        <>
            <Row gutter={[32,32]}>                    
                {folderList.map((data) => (
                    <Col>
                        <SharedFolderCard 
                            folderName={data.folderName} 
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
