import React from "react"
import styled from "styled-components"
import Button from "@mui/material/Button"
import { MODE_INVALID, MODE_IMAGE, MODE_VIDEO, MODE_LIVESTREAM } from "./const"

const BodyWrapper = styled.div`
  width: 50%;
  height: 50%;
  margin-top: 2rem;
`

const InputButton = styled(Button)`
  width: 100%;
  height: 100%;
`

const Test = styled.div`
  background-color: black;
`

const Body = ({ input }) => {
  return (
    <BodyWrapper>
      {input === MODE_INVALID ? (
        <Test />
      ) : input === MODE_IMAGE ? (
        <InputButton variant="outlined">+</InputButton>
      ) : input === MODE_VIDEO ? (
        <h1>input 2</h1>
      ) : input === MODE_LIVESTREAM ? (
        <h1>input 3</h1>
      ) : (
        <h1>invalid input</h1>
      )}
    </BodyWrapper>
  )
}

export default Body
