import React, { useState } from "react"
import styled from "styled-components"
import Title from "./title"
import Body from "./body"
import Result from "./result"
import Footer from "./footer"
import { MODE_INVALID, device } from "./const"

const AppContainer = styled.div`
  height: 100vh;
  background: #fefafa;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.tablet} {
    height: auto;
    min-height: 100vh;
  }
`

const App = () => {
  const [input, setInput] = useState(MODE_INVALID)
  const [result, setResult] = useState([])

  return (
    <AppContainer>
      <Title input={input} setInput={setInput} />
      <Body input={input} setResult={setResult} />
      <Result input={input} result={result} />
      <Footer />
    </AppContainer>
  )
}

export default App
