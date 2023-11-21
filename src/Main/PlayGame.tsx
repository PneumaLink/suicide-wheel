import { userListInterface } from "./static/interface/main.interface";

const PlayGame = (
    {
        userList,
        setUserList,
        setStage,
    }:{
        userList: userListInterface[]
        setUserList: Function;
        setStage: Function;
    }
) => {
    return (
        <>
            <button 
                onClick={()=>{
                    const new_list = userList.map((item)=>item.stack_list = []);
                    setUserList(new_list);
                    setStage(1)
                }}
            >
                다시하기
            </button>
            <button 
                onClick={()=>{
                    setUserList([]);
                    setStage(0)
                }}
            >
                처음부터
            </button>
        </>
    )
}

export default PlayGame;