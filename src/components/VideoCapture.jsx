import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import styled from "styled-components"
import { API_URL } from "../const"
import { Button } from "@mui/material"

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Video = styled.img`
  width: 100%;
  height: 100%;
`

const PlayPauseButton = styled(Button)`
  margin: 0.5rem auto 0 !important;
`

const VideoCapture = ({ setResult }) => {
  const [frame, setFrame] = useState(null)
  const [playing, setPlaying] = useState(true)

  const togglePlaying = () => {
    setPlaying(!playing)
  }

  useEffect(() => {
    const socket = io(API_URL, { withCredentials: true });

    socket.on("processed_frame", (processed_frame_str) => {
      const img = new Image()
      img.onload = () => setFrame(img)
      img.src = `data:image/jpeg;base64,${processed_frame_str}`
    })

    socket.on("processed_data", (data) => {
      setResult(data.map((element) => Number((element * 100).toFixed(2))))
    })

    socket.emit("start_stream")

    return () => socket.disconnect()
  }, [setResult])

  return (
    <VideoWrapper>
      {frame && <Video src={frame.src} alt={"Video Capture"} />}
      <PlayPauseButton variant="contained" onClick={togglePlaying}>
        {playing ? "Pause" : "Play"}
      </PlayPauseButton>
    </VideoWrapper>
  )
}

export default VideoCapture
