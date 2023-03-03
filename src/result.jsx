import React from "react"
import styled from "styled-components"
import { DEFAULT_SHADOW, EMOTION_MAP, device } from "./const"

const ResultWrapper = styled.div`
  width: 60%;
  margin-top: 5rem;
  height: 8%;
  background-color: white;
  box-shadow: ${DEFAULT_SHADOW};
  border-radius: 0.75rem;
  padding: 2.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media ${device.desktop} {
    width: 100%;
  }
`

const EmotionItem = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", sans-serif;
`

const EmotionName = styled.div`
  font-size: 1.3rem;
  padding-bottom: 0.5rem;
  width: 85%;
  border-bottom: 2px solid #ff7d66;
`

const EmotionWeight = styled.div`
  padding-top: 0.5rem;
`

const Result = ({ input, result }) => {
  return (
    <ResultWrapper>
      {EMOTION_MAP.map((emotion, index) => {
        return (
          <EmotionItem key={index}>
            <EmotionName>{`${result[index]}%`}</EmotionName>
            <EmotionWeight>{emotion}</EmotionWeight>
          </EmotionItem>
        )
      })}
    </ResultWrapper>
  )
}

export default Result
