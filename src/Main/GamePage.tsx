import { time } from "console";
import { useEffect, useState } from "react";

const GamePage = (
  {
    userList,
    setUserList
  }:{
    userList: {name: string; stack: number;}[];
    setUserList: Function;
  }
) => {

  // 현재 순서
  const [index, setIndex] = useState(0);
  
  // 선택해야할 다른 사람들
  const [canSelectUserList, setCanSelectUserList] = useState<{name: string; stack: number;}[]>([])
  
  // 목표로 선택한 사람의 이름
  const [targetUser, setTargetUser] = useState("")
  
  // 쌓으려는 스택 값
  const [targetUserStack, setTargetUserStack] = useState(0);
  
  // 모든 순서가 종료 되었는가?
  const [isSelectTimeEnd, setIsSelectTimeEnd] = useState(false);
  
  // stack값에 따라 정렬된 목록
  const [orderedUserList, setOrderedUserList] = useState<{name: string; stack: number;}[]>([])

  // 모든 사람이 다 선택했다면 선택상태종료 상태로 상태값을 바꾼다.
  useEffect(()=>{

    setTargetUser("");
    setTargetUserStack(0);
    
    if(index < userList.length){
      const new_list = userList.filter((item)=>item.name !== userList[index].name);
      setCanSelectUserList(new_list);
    }else{
      setIsSelectTimeEnd(true);
    }
  }, [index])

  useEffect(()=>{
    if(isSelectTimeEnd){
      const copy_list = [...userList].sort((a, b) => b.stack - a.stack)
      setOrderedUserList(copy_list)
    }
  }, [isSelectTimeEnd])

  const weightedRandomSelect = (items: {name: string; stack: number;}[]) => {
    // 모든 항목의 stack 값을 합산합니다.
    const totalStack = items.reduce((sum, item) => sum + item.stack, 0);
  
    // 랜덤 값과 각 항목의 stack에 기반한 가중치로 항목을 선택합니다.
    const threshold = Math.random() * totalStack;
  
    // 가중치를 기반으로 항목을 선택합니다.
    let runningSum = 0;
    for (const item of items) {
      runningSum += item.stack;
      if (runningSum > threshold) {
        return item;
      }
    }
  
    // 모든 가중치를 더했는데도 threshold를 넘지 못한 경우 마지막 항목을 반환합니다.
    // 이 경우는 발생하지 않아야 하지만, 확실성을 위해 넣습니다.
    return items[items.length - 1];
  };
  
  // 이 함수를 사용하여 multiple items를 선택하고 싶을 때,
  // 다음과 같은 함수를 사용하여 randomResult 배열을 업데이트할 수 있습니다.
  
  const selectRandomItems = (items: {name: string; stack: number;}[], numberOfItems: number) => {
    let selectedItems = [];
    let itemsCopy = [...items]; // 원본 배열을 변경하지 않도록 복사본을 만듭니다.
  
    for (let i = 0; i < numberOfItems; i++) {
      // 가중치에 따라 항목을 랜덤하게 선택합니다.
      const selectedItem = weightedRandomSelect(itemsCopy);
  
      // 선택된 항목을 결과 배열에 추가합니다.
      selectedItems.push(selectedItem);
  
      // 이미 선택된 항목은 추후 추첨에서 제외합니다.
      itemsCopy = itemsCopy.filter(item => item !== selectedItem);
    }
  
    return selectedItems;
  };
  
  // 사용 예:
  // setRandomResult(selectRandomItems(기존 배열, 뽑고자 하는 항목 수));
  

  if(!isSelectTimeEnd && index < userList.length){
    return(
      <>
        <div>
          <label>{userList[index].name}님 차례 ({index+1}/{userList.length})</label>
          <label>당첨 확률을 높이고 싶은 대상을 선택해주세요.</label>
          {
            canSelectUserList.map((item, index) => {
              return(
                <div key={index}>
                  <button onClick={()=>{setTargetUser(item.name)}}>{item.name}</button>
                </div> 
              )
            })
          }
          {
            targetUser !== ""
            ? <div>
                <input 
                  type={"number"} 
                  value={targetUserStack} 
                  onChange={(e)=>{
                    setTargetUserStack(parseInt(e.target.value)
                  )}} 
                />
                <button 
                  onClick={()=>{
                    const target_index = userList.findIndex((item)=>item.name === targetUser);
                    if(target_index){
                      const new_list = [...userList];
                      new_list[target_index].stack += targetUserStack;
                      new_list[index].stack += targetUserStack;
                      setUserList(new_list);
                    }
                    setIndex(index + 1);
                  }}
                >
                  확정(다음으로)
                </button>
              </div>
            : null
          }
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        {
          orderedUserList.map((item, order_index)=>{
            return (
              <div>
                <label>{order_index + 1}위 {item.name} - {item.stack}스택</label>
              </div>
            )
          })
        }
      </div>
      <div>
        <button 
          onClick={()=>{

            console.log(selectRandomItems(userList, 3));
          }}
        >
          돌려돌려 돌림판!
        </button>
      </div>
      <div>
      </div>
    </>
  )
}

export default GamePage