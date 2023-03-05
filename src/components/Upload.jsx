import styled from "styled-components"
import Button from "@mui/material/Button"

const InputButton = styled(Button)`
  width: 100%;
  height: 100%;
`

const Upload = ({onSelectFile}) => {
    return (
        <InputButton component="label">
        Upload File
        <input
          type="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          onChange={onSelectFile}
          hidden
        />
      </InputButton>
    )
}

export default Upload