import { createContext, useState } from "react";
import { userListInterface } from "./static/interface/main.interface";
import SetUser from "./SetUser";
import PlayGame from "./PlayGame";
import EndGame from "./EndGame";

interface mainContextInterface {
    userList: userListInterface[];
    setUserList: React.Dispatch<React.SetStateAction<userListInterface[]>>;
    stage: number;
    setStage: React.Dispatch<React.SetStateAction<number>>;
}

const defaultMainContext:mainContextInterface = {
    userList: [],
    setUserList: ()=>{},
    stage: 0,
    setStage: ()=>{},
}

export const mainContext = createContext<mainContextInterface>(defaultMainContext);

const Main = () => {
    const [userList, setUserList] = useState<userListInterface[]>([])
    const [stage, setStage] = useState<number>(0);

    return (
        <>
            <mainContext.Provider value={{
                userList,
                setUserList,
                stage,
                setStage,
            }}>
                {
                    stage === 0
                    ?   <SetUser />
                    :   null
                }

                {
                    stage === 1
                    ?   <PlayGame />
                    :   null
                }

                {
                    stage === 2
                    ?   <EndGame />
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
            </mainContext.Provider>
        </>
    )
}

export default Main;