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
} from "./const"

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const TitleComponent = styled.div`
  padding: 0 5rem;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
`

const Name = styled.h1`
  font-size: 2.5rem;
  font-family: "Roboto", sans-serif;
  color: #ff7d66;
  font-weight: 200;
`

const DropdownWrapper = styled(Box)`
  padding: 1.5rem;
`

const Title = ({ input, setInput }) => {
  const handle_change = (e) => {
    setInput(e.target.value)
  }

  return (
    <TitleContainer>
      <TitleComponent>
        <Name>F Y D P</Name>
      </TitleComponent>
      <TitleComponent>
        <DropdownWrapper sx={{ minWidth: "18vw" }}>
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
      </TitleComponent>
    </TitleContainer>
  )
}

export default Title
