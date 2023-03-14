import styled from "styled-components"
import Button from "@mui/material/Button"
import { device } from "../const"

const InputButton = styled(Button)`
  width: 100%;
  height: 100%;

  @media ${device.tablet} {
    height: 30vh;
  }
`

const ImageUpload = ({ onSelectFile }) => {
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

export default ImageUpload
