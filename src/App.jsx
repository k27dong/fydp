import React, { useState }  from "react"
import styled from "styled-components"
import Title from "./title"
import Body from "./body"
import Result from "./result"
import Footer from "./footer"
import { MODE_INVALID } from "./const"

const AppContainer = styled.div`
  height: 100vh;
  background: #fefafa;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1rem;
`

const App = () => {
  const [input, setInput] = useState(MODE_INVALID)

  return (
    <AppContainer>
      <Title input={input} setInput={setInput}/>
      <Body input={input}/>
      <Result input={input}/>
      <Footer />
    </AppContainer>
  )
}

export default App
