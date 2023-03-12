import styled from "styled-components"
import Button from "@mui/material/Button"

const InputButton = styled(Button)`
  width: 100%;
  height: 100%;
`

const VideoUpload = ({ onSelectFile }) => {
  return (
    <InputButton component="label">
      Upload Video
      <input type="file" accept="video/*" onChange={onSelectFile} hidden />
    </InputButton>
  )
}

export default VideoUpload
