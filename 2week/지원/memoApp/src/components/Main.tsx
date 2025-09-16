import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const intialValues = [
  { id: 1, text: "나는 옹이" },
  { id: 2, text: "나는 옹이, 배고프다" },
  { id: 3, text: "나는 옹이, 물 마시고 싶다" },
  { id: 4, text: "나는 옹이, 잘거니까 자리 만들어라" },
  { id: 5, text: "나는 옹이, 화장실 다녀왔으니까 뛴다" },
];
const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 90%;
`;
const Memo = styled.div<{ $isDark: boolean }>`
  width: 100%;
  border: 2px solid ${(props) => (props.$isDark ? "#f7b5d5" : "black")};
  border-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff3f9;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffd8eb;
    font-weight: bold;
  }
`;
const InputWrapper = styled.div`
  width: 85%;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input<{ $isDark: boolean }>`
  width: 83%;
  height: 60px;
  padding: 10px;
  font-size: 20px;
  border: 2px solid ${(props) => (props.$isDark ? "#f7b5d5" : "black")};
  border-radius: 5px;
  transition: background-color 0.2s ease;
  &:focus {
    background-color: ${(props) => (props.$isDark ? "#f7d0e2" : "#fff3f9")};
    outline: none;
    border: 3px solid ${(props) => (props.$isDark ? "#fa8ac0" : "black")};
  }
`;
const InputButton = styled.button<{ $isDark: boolean }>`
  width: 13%;
  height: 60px;
  background-color: ${(props) => (props.$isDark ? "#ff83bf" : "#ffaed5")};
  border-radius: 10px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.$isDark ? "#ff409c" : "#ff7bbb")};
  }
`;
const ModifyModal = styled.div<{ $On: boolean }>`
  display: ${(props) => (props.$On ? "flex" : "none")};
  background-color: white;
  border: 2px solid black;
  border-radius: 0px 20px 20px 20px;
  margin: 10px;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const ModalInput = styled.input`
  width: 80%;
  height: 30px;
  padding: 10px;
  border: none;
  outline: none;
`;

const Main = () => {
  const [memos, setMemos] = useState(intialValues);
  const [newMemo, setNewMemo] = useState("");
  const [modify, setModify] = useState(0);
  const [modifyText, setModifyText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useContext(ThemeContext);

  function addMemo() {
    setMemos([...memos, { id: memos.length + 1, text: newMemo }]);
    setNewMemo("");
  }

  function modifyMemo(id: number) {
    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === id ? { ...memo, text: modifyText } : memo
      )
    );
    setModifyText("");
    setModify(0);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder="메모를 작성해 주세옹 ..."
          $isDark={theme}
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value)}
          ref={inputRef}
        />
        <InputButton $isDark={theme} onClick={() => addMemo()}>
          기록
        </InputButton>
      </InputWrapper>
      <List>
        {memos.map((memo) => (
          <div key={memo.id}>
            <Memo $isDark={theme}>
              <p>
                {memo.id}. {memo.text}
              </p>
              <button
                onClick={() => {
                  setModify(memo.id);
                }}
              >
                수정
              </button>
            </Memo>
            <ModifyModal $On={memo.id === modify}>
              <ModalInput
                placeholder="수정할 내용을 입력해 주세옹 ..."
                value={modifyText}
                onChange={(e) => setModifyText(e.target.value)}
              />
              <>
                <button onClick={() => modifyMemo(memo.id)}>확인</button>
                <button onClick={() => setModify(0)}>닫기</button>
              </>
            </ModifyModal>
          </div>
        ))}
      </List>
    </Wrapper>
  );
};

export default Main;
