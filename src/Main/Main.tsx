import { useEffect, useState } from "react"
import GamePage from "./GamePage";

const Main = () => {

  const [applyUser, setApplyUser] = useState("");
  const [userList, setUserList] = useState<{name: string; stack: number;}[]>([])
  const [isGameStart, setIsGameStart] = useState(false);

  useEffect(()=>{
    if(!isGameStart){
      setApplyUser("")
      setUserList([]);
    }
  }, [isGameStart])

  return (
    <>
      {
        isGameStart
        ? null
        : <div>
            <label>참가자</label>
            <input value={applyUser} onChange={(e)=>{setApplyUser(e.target.value)}}/>
            <button 
              onClick={()=>{
                // 게임이 시작된 후에는 수정되면 안됨
                if(isGameStart){
                  return ;
                }

                const remove_empty = applyUser.replaceAll(" ", "");
                if(remove_empty === ""){
                  alert("이름을 입력해주세요.")
                }else{
                  setUserList((userList)=>[...userList, {name:remove_empty, stack:0}]);
                  setApplyUser("")
                }
              }}
              className={"button"}
            >
              인원추가
            </button>
          </div>
      }
      <div>
        <label>참가자</label>
        {
          userList.map((item, index) => {
            return (
              <button 
                key={index}
                onClick={()=>{
                  // 게임이 시작된 후에는 수정되면 안됨
                  if(isGameStart){
                    return ;
                  }

                  const new_list = userList.filter((user)=> user.name !== item.name);
                  setUserList(new_list)
                }}
                className={"button"}
              >
                {item.name}
              </button>
            )
          })
        }
      </div>
      <div>
        {
          userList.length >= 3
          ? isGameStart
            ? <button 
                onClick={()=>{
                  setIsGameStart(false);
                }}
                className={"button"}
              >
                게임종료
              </button>
            : <button 
                onClick={()=>{
                  setIsGameStart(true);
                }}
                className={"button"}
              >
                게임시작
              </button>
          : null
        }
      </div>
      <div>
        {
          isGameStart
          ? <div>
              <GamePage userList={userList} setUserList={setUserList}/>
            </div>
          : null
        }
      </div>
    </>
  )
}

export default Main