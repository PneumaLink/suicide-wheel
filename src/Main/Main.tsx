import { useState } from "react";
import { userListInterface } from "./static/interface/main.interface";
import SetUser from "./SetUser";
import PlayGame from "./PlayGame";
import EndGame from "./EndGame";

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
                        stage={stage}
                        setStage={setStage}
                    />
                :   null
            }

            {
                stage === 1
                ?   <PlayGame 
                        userList={userList}
                        setUserList={setUserList}
                        stage={stage}
                        setStage={setStage}
                    />
                :   null
            }

            {
                stage === 2
                ?   <EndGame
                        userList={userList}
                        setUserList={setUserList}
                        setStage={setStage}
                    />
                :   null
            }

            {/* 가장 초기상태가 아니면 버튼을 출력시킨다. */}
            {
                stage > 0
                ?   <>
                        <div>
                            <button 
                                onClick={()=>{
                                    if(!window.confirm("다시 시작할까요?")){
                                        return ;
                                    }

                                    const new_list = userList.map((item)=>{
                                        item.stack_list = []; 
                                        return item
                                    });
                                    setUserList(new_list);
                                    setStage(1)
                                }}
                            >
                                다시하기
                            </button>
                            <button 
                                onClick={()=>{
                                    if(!window.confirm("완전히 초기화 후 다시 시작할까요?")){
                                        return ;
                                    }

                                    setUserList([]);
                                    setStage(0)
                                }}
                            >
                                처음부터
                            </button>
                        </div>
                    </>
                :   null
            }
        </>
    )
}

export default Main;