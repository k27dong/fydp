import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import ImageUpload from "./components/ImageUpload"
import ControlButtonGroup from "./components/ControlButtonGroup"
import VideoCapture from "./components/VideoCapture"
import VideoUpload from "./components/VideoUpload"
import {
  MODE_INVALID,
  MODE_IMAGE,
  MODE_VIDEO,
  MODE_LIVESTREAM,
  API_URL,
  device,
} from "./const"

const BodyWrapper = styled.div`
  width: 50%;
  height: 50%;
  margin-top: 2rem;

  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30%;
    width: 100%;
    margin-top: 4rem;
  }
`

const EmptyInputHolder = styled.div`
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  text-align: center;
  color: #757575;
  top: 50%;
  position: relative;

  @media ${device.tablet} {
    width: 50%;
    place-self: center;
  }
`

const ImagePreview = styled.img`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  max-height: 100%;
  max-width: 100%;

  @media ${device.tablet} {
    height: auto;
  }
`

const VideoPreview = styled.video`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  max-height: 100%;
  max-width: 100%;
`

const Body = ({ input, setResult }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const object_url = URL.createObjectURL(selectedFile)
    setPreview(object_url)

    return () => URL.revokeObjectURL(object_url)
  }, [selectedFile])

  useEffect(() => {
    setSelectedFile(undefined)
    setResult([])
  }, [input, setResult])

  const onSelectFile = (e) => {
    if (!!e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const get_image_result = (e) => {
    setLoading(true)
    e.preventDefault()
    const form_data = new FormData()
    form_data.append("image", selectedFile)
    axios
      .post(API_URL + "/api/image", form_data)
      .then((res) => {
        setLoading(false)
        setResult(res.data.map((element) => Number((element * 100).toFixed(2))))
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const get_video_result = (e) => {
    setLoading(true)
    e.preventDefault()
    const form_data = new FormData()
    form_data.append("video", selectedFile)
    axios
      .post(API_URL + "/api/video", form_data)
      .then((res) => {
        setLoading(false)
        setResult(res.data.map((element) => Number((element * 100).toFixed(2))))
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <BodyWrapper>
      {input === MODE_INVALID ? (
        <EmptyInputHolder>PLEASE SELECT AN INPUT METHOD</EmptyInputHolder>
      ) : input === MODE_IMAGE ? (
        <>
          {!!selectedFile ? (
            <>
              <ImagePreview src={preview} />
              <ControlButtonGroup
                loading={loading}
                click1={() => {
                  setSelectedFile(undefined)
                  setResult([])
                }}
                click2={(e) => get_image_result(e)}
              />
            </>
          ) : (
            <ImageUpload onSelectFile={onSelectFile} />
          )}
        </>
      ) : input === MODE_LIVESTREAM ? (
        <VideoCapture setResult={setResult} />
      ) : input === MODE_VIDEO ? (
        <>
          {!!selectedFile ? (
            <>
              <VideoPreview src={preview} controls />
              <ControlButtonGroup
                loading={loading}
                click1={() => {
                  setSelectedFile(undefined)
                  setResult([])
                }}
                click2={(e) => get_video_result(e)}
              />
            </>
          ) : (
            <VideoUpload onSelectFile={onSelectFile} />
          )}
        </>
      ) : (
        <h1>invalid input</h1>
      )}
    </BodyWrapper>
  )
}

export default Body
