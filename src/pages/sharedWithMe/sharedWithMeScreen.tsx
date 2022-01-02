import PrimaryLayout from "../../common/primaryLayout/primaryLayout"
import SharedWithMeCollection from "../../components/sharedWithMeCollection"
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

    return(
        <>
            <PrimaryLayout>
                <div className="shared-page-style">
                    <h3 className="title3">My Collection</h3>
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
            </PrimaryLayout>            
        </>        
    )
}

export default SharedWithMeScreen;
