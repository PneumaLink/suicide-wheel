import { useEffect, useState } from "react";
import { userListInterface } from "./static/interface/main.interface";

const PlayGame = (
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
    /**
     * 1. 첫 번째 유저부터 차례를 넘기며 진행한다.
     * 2. 차례인 사람은 자신은 제외한 다른사람을 지정한다.
     * 3. 지목 사람에게 부여할 추가 스택 수를 지정한다.(해당 스택은 이번 게임에 참여하는 인원수 이상의 값 부터 부여할 수 있다.)
     * 4. 부여를 최종적으로 확인한 후 다음차례의 사람을 출력해준다.
     * 5. 해당사람 차래에서 시작버튼을 누르면 다음 게임이 시작된다.
     */

    /**
     * 현재 유저의 순서
     * 
     */

    // 연재 순서
    const [userIndex, setUserIndex] = useState(0);
    // 현재 플래이어의 선택 순서가 종료 되었는가?
    const [isSelectedDone, setIsSelectedDone] = useState(false);
    // 순서인 사람
    const [user, setUser] = useState<userListInterface | null>(null)
    // 스택을 올리기로 선택한 사람
    const [targetUser, setTargetUser] = useState<userListInterface | null>(null)

    const [stack, setStack] = useState(userList.length)

    useEffect(()=>{
        // 더이상 선택할 수 있는 유저가 없다면, 다음으로 넘어간다.
        if(userIndex >= userList.length){
            setStage(stage + 1);
        }
    }, [userIndex, userList, stage])

    // 두 유져가 같은 유져인지 확인함
    const isSameUser = (
        user: userListInterface,
        targetUser: userListInterface,
    ) => {
        if(user.id !== targetUser.id){
            return false;
        }

        if(user.name !== targetUser.name){
            return false;
        }

        if(user.tag !== targetUser.tag){
            return false;
        }

        return true;
    }

    // 스택을 적용함
    const addStack = () => {
    }

    // 선택한 정보들을 초기화
    const initSelected = () => {
        setIsSelectedDone(false);
        setTargetUser(null);
        setStack(userList.length);
    }

    // 선택을 완료했다면?
    if(isSelectedDone){
        return (
            <>
                <div>
                    {
                        userIndex + 1 < userList.length
                        ?   <>
                                <div>
                                    다음차래 <label>{user?.name}{user?.tag ? `-${user?.tag}` : null}</label>
                                </div>
                                <div>
                                    <button
                                        onClick={()=>{

                                        }}
                                    >
                                        시작
                                    </button>
                                </div>
                            </>
                        :   <>
                                <div>
                                    모든 선택이 종료되었습니다.
                                </div>
                                <div>
                                    <button
                                        onClick={()=>{

                                        }}
                                    >
                                        결과 확인
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </>
        )
    }
    
    // 선택 단계
    return (
        <>
            <div>

            </div>
            <div>
                {
                    userList.filter((item)=> item.name !== user?.name || item.tag !== user.tag)
                    ?.map((item)=>{
                        return (
                            <>
                                <div>
                                    <div>
                                        <button
                                            onClick={()=>{
                                                setTargetUser(item)
                                            }}
                                        >
                                            {item.name}{item.tag ? `-${item.tag}` : null}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div>
                {
                    targetUser
                    ?   <>
                            <div>
                                <label>{targetUser.name}{targetUser.tag ? `-${targetUser.tag}` : null}</label>
                                <label>스택</label>
                                <input 
                                    type={"number"} 
                                    value={stack} 
                                    onChange={(e)=>{
                                        setStack(parseInt(e.target.value))
                                    }}
                                    min={userList.length}
                                    max={9999}
                                />
                            </div>
                            <div>
                                주의! 다른사람에게 올리는 확률 만큼 자기 자신의 확률도 올라갑니다! 신중하게 올려주세요!
                            </div>
                            <button
                                onClick={()=>{

                                }}
                            >
                                적용하기
                            </button>
                        </>
                    :   <>
                            <div>
                                뽑힐 확률을 높이고 싶은 사람을 선택해주세요.
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default PlayGame;