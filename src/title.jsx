import React, { useState } from "react"
import styled from "styled-components"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

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
const Title = () => {
  const [input, setInput] = useState(0)

  const handle_change = (e) => {
    setInput(e.target.value)
  }

  return (
    <TitleContainer>
      <TitleComponent>
        <Name>F Y D P</Name>
      </TitleComponent>
      <TitleComponent>
        <DropdownWrapper sx={{ minWidth: "15rem" }}>
          <FormControl fullWidth>
            <InputLabel>Input Method</InputLabel>
            <Select
              value={input}
              label="Input Method"
              onChange={handle_change}
              sx={{
                boxShadow:
                  "0 100px 80px rgb(0 0 0 / 7%), 0 41.7776px 33.4221px rgb(0 0 0 / 5%), 0 22.3363px 17.869px rgb(0 0 0 / 4%), 0 12.5216px 10.0172px rgb(0 0 0 / 4%), 0 6.6501px 5.32008px rgb(0 0 0 / 3%), 0 2.76726px 2.21381px rgb(0 0 0 / 2%)",
                backgroundColor: "white",
                "&& fieldset": {
                  border: "0",
                },
              }}
            >
              <MenuItem value={1}>Image</MenuItem>
              <MenuItem value={2}>Video</MenuItem>
              <MenuItem value={3}>Live Stream</MenuItem>
            </Select>
          </FormControl>
        </DropdownWrapper>
      </TitleComponent>
    </TitleContainer>
  )
}

export default Title
