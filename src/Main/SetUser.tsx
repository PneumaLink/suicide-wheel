import { v4 as uuidv4 } from 'uuid';

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

    const isUsedTag = ({user_list, tag}:{user_list:userListInterface[]; tag:string;}) => {
        for(const user_item of user_list){
            if(user_item.tag === tag){
                return true;
            }
        }
        
        return false;
    }

    const initInput = () => {
        setUserName('');
        setUserTag('');
    }

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
                            stack_list: [],
                            tag: '',
                        }

                        let user_tag = uuidv4();

                        if(userTag){
                            user_tag = userTag.replaceAll(' ','');
                        }

                        const isUsedTag_result = isUsedTag({
                            user_list: new_list,
                            tag: user_tag,
                        })

                        if(isUsedTag_result){
                            alert("테그가 중복되는 유저가 있습니다.\n다른 테그를 사용해주세요.")
                            return ;
                        }else{
                            config.tag = user_tag;
                        }

                        new_list.push(config)

                        setUserList(new_list);

                        initInput();

                    }}
                >
                    추가
                </button>
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
