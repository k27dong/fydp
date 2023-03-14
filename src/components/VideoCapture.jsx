import React, { useEffect, useRef } from "react"
import io from "socket.io-client"
import styled from "styled-components"
import { API_URL } from "../const"
import Webcam from "react-webcam"

const VideoWrapper = styled.div`
  /* width: 100%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const RESPONSE_TIME = 800 // ms

const VideoCapture = ({ setResult }) => {
  const webcamRef = useRef(null)

  useEffect(() => {
    const socket = io.connect(API_URL)

    socket.on("processed_data", (data) => {
      setResult(data.map((element) => Number((element * 100).toFixed(2))))
    })

    const intervalId = setInterval(() => {
      socket.emit("frame", webcamRef.current.getScreenshot())
    }, RESPONSE_TIME)

    return () => {
      clearInterval(intervalId)
      socket.disconnect()
    }
  }, [setResult])

  return (
    <VideoWrapper>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
    </VideoWrapper>
  )
}

export default VideoCapture
