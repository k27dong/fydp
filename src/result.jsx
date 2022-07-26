import React from "react"
import styled from "styled-components"
import { DEFAULT_SHADOW } from "./const"

const ResultWrapper = styled.div`
  width: 80%;
  margin-top: 5rem;
  height: 10%;
  background-color: white;
  box-shadow: ${DEFAULT_SHADOW};
  border-radius: 0.75rem;
`

const Result = ({ input }) => {
  return (
    <ResultWrapper>
      <h1>Display results here</h1>
    </ResultWrapper>
  )
}

export default Result
