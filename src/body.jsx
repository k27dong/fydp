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

const EmptyInputHolder = styled.div`
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  text-align: center;
  color: #757575;
  top: 50%;
  position: relative;
`

const Body = ({ input }) => {
  return (
    <BodyWrapper>
      {input === MODE_INVALID ? (
        <EmptyInputHolder>PLEASE SELECT AN INPUT METHOD</EmptyInputHolder>
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
