import { useState } from "react";
import { userListInterface } from "./static/interface/main.interface";
import SetUser from "./SetUser";
import PlayGame from "./PlayGame";

const Main = () => {
    const [userList, setUserList] = useState<userListInterface[]>([])
    const [stage, setStage] = useState(0);

    return (
        <>
            {
                stage === 0
                ?   <SetUser 
                        userList={userList}
                        setUserList={setUserList}
                        setStage={setStage}
                    />
                :   null
            }

            {
                stage === 1
                ?   <PlayGame 
                        userList={userList}
                        setUserList={setUserList}
                        setStage={setStage}
                    />
                :   null
            }
        </>
    )
}

export default Main;