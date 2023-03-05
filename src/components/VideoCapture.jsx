import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import styled from "styled-components"

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`

const VideoCapture = ({ setResult }) => {
  const [frame, setFrame] = useState(null)

  useEffect(() => {
    // Connect to the Flask server over a WebSocket connection
    const socket = io("http://localhost:5000")

    // Listen for processed frames from the server
    socket.on("processed_frame", (processed_frame_str) => {
      // Convert the base64 encoded string to an image
      const img = new Image()
      img.onload = () => {
        setFrame(img)
      }
      img.src = `data:image/jpeg;base64,${processed_frame_str}`
    })

    socket.on("processed_data", (data) => {
      setResult(data.map((element) => Number((element * 100).toFixed(2))))
    })

    // Start the video stream
    socket.emit("start_stream")

    // Disconnect from the server when the component unmounts
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <VideoWrapper>
      {frame && <img src={frame.src} alt={"Video Capture"} />}
    </VideoWrapper>
  )
}

export default VideoCapture
