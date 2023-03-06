import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Upload from "./components/Upload"
import ControlButtonGroup from "./components/ControlButtonGroup"
import VideoCapture from "./components/VideoCapture"
import {
  MODE_INVALID,
  MODE_IMAGE,
  MODE_VIDEO,
  MODE_LIVESTREAM,
  API_URL,
} from "./const"

const BodyWrapper = styled.div`
  width: 50%;
  height: 50%;
  margin-top: 2rem;
`

const EmptyInputHolder = styled.div`
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  text-align: center;
  color: #757575;
  top: 50%;
  position: relative;
`

const ImagePreview = styled.img`
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
            <Upload onSelectFile={onSelectFile} />
          )}
        </>
      ) : input === MODE_LIVESTREAM ? (
        <VideoCapture setResult={setResult} />
      ) : input === MODE_VIDEO ? (
        <h1>TODO: input 3</h1>
      ) : (
        <h1>invalid input</h1>
      )}
    </BodyWrapper>
  )
}

export default Body
