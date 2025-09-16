import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Header from "../components/Header";
import Main from "../components/Main";

type Props = {
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

const Wrapper = styled.div<{ $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-color: ${(props) => (props.$isDark ? "black" : "white")};
  transition: background-color 0.3s ease;
`;

const MainPage = ({ setDark }: Props) => {
  const theme = useContext(ThemeContext);

  function ChangeTheme() {
    setDark(!theme);
  }

  return (
    <Wrapper $isDark={theme}>
      <Header ChangeTheme={ChangeTheme} />
      <Main />
    </Wrapper>
  );
};

export default MainPage;
