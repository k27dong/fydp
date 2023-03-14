import React from "react"
import styled from "styled-components"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import {
  MODE_IMAGE,
  MODE_VIDEO,
  MODE_LIVESTREAM,
  DEFAULT_SHADOW,
  device,
} from "./const"

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Name = styled.h1`
  font-size: 2.5rem;
  font-family: "Roboto", sans-serif;
  color: #ff7d66;
  font-weight: 200;

  @media ${device.tablet} {
    font-size: 2rem;
  }
`

const DropdownWrapper = styled(Box)`
  /* padding: 1.5rem; */

  padding: 1.5rem 5rem;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  min-width: 18vw;

  @media ${device.tablet} {
    padding: 1.5rem;
    min-width: 190px;
  }
`

const TitleWrapper = styled.div`
  padding: 0 5rem;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  display: flex;
  align-items: center;

  @media ${device.tablet} {
    padding: 0 1rem;
  }
`

const Title = ({ input, setInput }) => {
  const handle_change = (e) => {
    setInput(e.target.value)
  }

  return (
    <TitleContainer>
      <TitleWrapper>
        <a href="/" style={{ textDecoration: "none" }}>
          <Name>F Y D P</Name>
        </a>
      </TitleWrapper>
      <DropdownWrapper>
        <FormControl fullWidth>
          <InputLabel>Input Method</InputLabel>
          <Select
            value={input}
            label="Input Method"
            onChange={handle_change}
            sx={{
              boxShadow: DEFAULT_SHADOW,
              backgroundColor: "white",
              "&& fieldset": {
                border: "0",
              },
            }}
          >
            <MenuItem value={MODE_IMAGE}>Image</MenuItem>
            <MenuItem value={MODE_VIDEO}>Video</MenuItem>
            <MenuItem value={MODE_LIVESTREAM}>Live Stream</MenuItem>
          </Select>
        </FormControl>
      </DropdownWrapper>
    </TitleContainer>
  )
}

export default Title
