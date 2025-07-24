import { temporaryText } from "./temporaryText";

// 타이핑을 할 내용 (문장, 단어들등) 을 보여주는 컴포넌트. 
// TODO: 문장 여러개 추가하기 (temporaryText 대체)
// TODO: 입력된 문자(Typing)랑 비교해서 오타 표시기능 구현하기. 

// Very far goal : Make backend/DB that lets people upload/select things to type.
const ContentsDisplay = () => {
    return <>
        {temporaryText}
    </>
}

export default ContentsDisplay;