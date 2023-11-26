import { useState } from "react";
import { userListInterface } from "./static/interface/main.interface";

const SetUser = (
    {
        userList,
        setUserList,
        stage,
        setStage,
    }:{
        userList: userListInterface[]
        setUserList: Function;
        stage: number;
        setStage: Function;
    }
) => {
    const [userName, setUserName] = useState("")
    const [userTag, setUserTag] = useState("")

    return (
        <>
            <div>게임에 참가할 사람들을 등록해주세요.</div>
            <div>
                <label>이름</label>
                <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
                <label>Tag(선택)</label>
                <input value={userTag} onChange={(e)=>{setUserTag(e.target.value)}} />
            </div>
            <div>
                <button 
                    onClick={()=>{
                        
                        const new_list = [...userList]

                        let config:userListInterface = {
                            name: userName,
                            stack_list: []
                        }

                        if(userTag){
                            config.tag = userTag
                        }

                        new_list.push(config)

                        setUserList(new_list);

                        setUserName("")
                        setUserTag("")
                        
                    }}
                >추가</button>
            </div>
            <div>
                <label>참가자 목록</label>
            </div>
            <div>
                {
                    userList.map((user_item, index)=>{
                        return(
                            <>
                                <label key={index}>
                                    {user_item.name}{user_item.tag ? `-${user_item.tag}`: null}
                                </label>
                                <button 
                                    onClick={()=>{
                                        if(!window.confirm(`${user_item.name}님은 게임에 참가하지 않으시나요?`)){
                                            return ;
                                        }

                                        const new_list = [
                                            ...userList.slice(0, index),
                                            ...userList.slice(index + 1)
                                        ];
                                        setUserList(new_list)
                                    }}
                                >-</button>
                            </>
                        )
                    })
                }
            </div>
            <div>
                {
                    userList.length >= 3
                    ?   <button 
                            onClick={()=>{
                                if(!window.confirm("게임을 시작합니다.")){
                                    return ;
                                }

                                setStage(stage + 1);
                            }}
                        >설정 완료</button>
                    :   null
                }
            </div>
        </>
    )
}

export default SetUser
