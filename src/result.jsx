import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { DEFAULT_SHADOW, EMOTION_MAP, device } from "./const"

const ResultWrapper = styled.div`
  width: 60%;
  margin-top: 5rem;
  height: 8%;
  background-color: white;
  box-shadow: ${DEFAULT_SHADOW};
  border-radius: 0.75rem;
  padding: 2rem 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media ${device.tablet} {
    flex-direction: column;
    height: auto;
    margin-bottom: 1vh;
    padding: 1rem;
    margin-top: 0;
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
  font-weight: bold;
  padding-bottom: 0.5rem;
  width: 85%;
  box-shadow: inset 0 -2px 0px 0px #ff7d66;
  -moz-box-shadow: inset 0 -2px 0px 0px #ff7d66;
  -webkit-box-shadow: inset 0 -2px 0px 0px #ff7d66;
  height: 100%;
`

const EmotionWeight = styled.div`
  padding-top: 0.5rem;
`

const EmotionTableMobile = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Roboto", sans-serif;
  justify-content: space-between;
  margin-bottom: 5px;
`

const EmotionRowMobile = styled.div`
  display: flex;
  flex-direction: column;
`

const Result = ({ input, result }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const handleWindowSizeChange = () => setWidth(window.innerWidth)
  const isMobile = width <= 768
  const hasResult = result.length !== 0

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  const map_result_to_hex = (h) => {
    const f = (n) => {
      const k = (n + (h + 40) / 30) % 12
      return Math.round(
        255 * (0.4 - 0.36 * Math.max(Math.min(k - 3, 9 - k, 1), -1))
      )
        .toString(16)
        .padStart(2, "0")
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  return (
    <ResultWrapper>
      {!isMobile ? (
        EMOTION_MAP.map((emotion, index) => {
          return (
            <EmotionItem key={index}>
              <EmotionName style={{ color: map_result_to_hex(result[index]) }}>
                {!hasResult ? "" : `${result[index]}%`}
              </EmotionName>
              <EmotionWeight>{emotion}</EmotionWeight>
            </EmotionItem>
          )
        })
      ) : !hasResult ? (
        <h2>{""}</h2>
      ) : (
        EMOTION_MAP.map((emotion, index) => {
          return (
            <EmotionTableMobile key={index}>
              <EmotionRowMobile>{emotion}</EmotionRowMobile>
              <EmotionRowMobile
                style={{ color: map_result_to_hex(result[index]) }}
              >
                {`${result[index]}%`}
              </EmotionRowMobile>
            </EmotionTableMobile>
          )
        })
      )}
    </ResultWrapper>
  )
}

export default Result
