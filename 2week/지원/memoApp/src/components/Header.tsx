import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = {
  ChangeTheme: () => void;
};

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-bottom: 30px;
`;
const Title = styled.p<{ $isDark: boolean }>`
  font-size: 30px;
  color: ${(props) => (props.$isDark ? "white" : "black")};
  font-weight: 500;
`;
const Button = styled.button<{ $isDark: boolean }>`
  width: 60px;
  height: 30px;
  background-color: ${(props) => (props.$isDark ? "#ffa9e2" : "#a3a3a3")};
  border: none;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => (props.$isDark ? "#fd79d1" : "#666666")};
  }
`;

const Header = ({ ChangeTheme }: Props) => {
  const theme = useContext(ThemeContext);
  return (
    <Wrapper>
      <Title $isDark={theme}>옹이의 메모 🐈‍⬛</Title>
      <Button $isDark={theme} onClick={() => ChangeTheme()}>
        {theme ? "Dark" : "Bright"}
      </Button>
    </Wrapper>
  );
};

export default Header;
