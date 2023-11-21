import { userListInterface } from "./static/interface/main.interface";

const EndGame = (
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
            게임 끝
        </>
    )
}

export default EndGame