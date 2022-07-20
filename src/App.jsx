import React from "react"
import styled from "styled-components"
import Title from "./title"

const AppContainer = styled.div`
  height: 100vh;
  background: #fefafa;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;
`;

const App = () => {
  return (
    <AppContainer>
      <Title />
    </AppContainer>
  )
}

export default App
