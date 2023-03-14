import styled from "styled-components"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import MemoryIcon from "@mui/icons-material/Memory"

const OptionBox = styled(Box)`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

const ControlButtonGroup = ({ loading, click1, click2 }) => {
  return (
    <OptionBox>
      <LoadingButton
        style={{ minWidth: "7rem", marginRight: "1rem" }}
        loading={false}
        onClick={() => click1()}
        variant="contained"
      >
        Reset
      </LoadingButton>
      <LoadingButton
        style={{ minWidth: "7rem" }}
        loading={loading}
        onClick={(e) => click2(e)}
        variant="contained"
        endIcon={<MemoryIcon />}
        loadingPosition="end"
      >
        Apply
      </LoadingButton>
    </OptionBox>
  )
}

export default ControlButtonGroup
