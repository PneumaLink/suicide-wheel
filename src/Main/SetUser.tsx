import { v4 as uuidv4 } from 'uuid';

import { useContext, useState } from "react";
import { userListInterface } from "./static/interface/main.interface";
import { mainContext } from './Main';

const SetUser = () => {
    const main_context = useContext(mainContext);

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
                <div>
                    <label>이름</label>
                    <input 
                        value={userName} 
                        onChange={(e)=>{
                            setUserName(e.target.value)}
                        }
                        placeholder='' 
                    />
                </div>
                <div>
                    <label>Tag(선택)</label>
                    <input 
                        value={userTag} 
                        onChange={(e)=>{
                            setUserTag(e.target.value)
                        }}
                        placeholder='입력하지 않으면 자동으로 생성됩니다.'
                    />
                </div>
            </div>
            <div>
                <button 
                    onClick={()=>{
                        
                        const new_list = [...main_context.userList]

                        let config:userListInterface = {
                            name: userName,
                            stack_list: [],
                            tag: '',
                        }

                        let user_tag = uuidv4();

                        const remove_space_userTag = userTag.replaceAll(' ','');
                        if(remove_space_userTag){
                            user_tag = remove_space_userTag;
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

                        main_context.setUserList(new_list);

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
                    main_context.userList.map((user_item, index)=>{
                        return(
                            <>
                                <div>
                                    <label key={index}>
                                        {user_item.name}{user_item.tag ? ` - ${user_item.tag}`: null}
                                    </label>
                                    <button 
                                        onClick={()=>{
                                            if(!window.confirm(`${user_item.name}님은 게임에 참가하지 않으시나요?`)){
                                                return ;
                                            }

                                            const new_list = [
                                                ...main_context.userList.slice(0, index),
                                                ...main_context.userList.slice(index + 1)
                                            ];
                                            main_context.setUserList(new_list)
                                        }}
                                    >
                                        -
                                    </button>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div>
                {
                    main_context.userList.length >= 3
                    ?   <button 
                            onClick={()=>{
                                if(!window.confirm("게임을 시작합니다.")){
                                    return ;
                                }

                                main_context.setStage(main_context.stage + 1);
                            }}
                        >설정 완료</button>
                    :   null
                }
            </div>
        </>
    )
}

export default SetUser
