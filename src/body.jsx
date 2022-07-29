import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Button from "@mui/material/Button"
import { MODE_INVALID, MODE_IMAGE, MODE_VIDEO, MODE_LIVESTREAM, API_URL } from "./const"

const BodyWrapper = styled.div`
  width: 50%;
  height: 50%;
  margin-top: 2rem;
`

const InputButton = styled(Button)`
  width: 100%;
  height: 100%;
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
`

const OptionWrapper = styled.div`
  text-align: center;
`

const Option = styled(Button)`
  /* override mui default css */
  display: inline-block !important;
  margin: 1rem 1rem 0 1rem !important;
  min-width: 7rem !important;
`

const Body = ({ input }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

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
    e.preventDefault()
    const form_data = new FormData()
    form_data.append("image", selectedFile)
    axios
      .post(API_URL + "/api/image", form_data)
      .then((res) => {
        console.log(res)
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
            <ImagePreview src={preview} />
          ) : (
            <InputButton
              // variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                onChange={onSelectFile}
                hidden
              />
            </InputButton>
          )}
        </>
      ) : input === MODE_VIDEO ? (
        <h1>TODO: input 2</h1>
      ) : input === MODE_LIVESTREAM ? (
        <h1>TODO: input 3</h1>
      ) : (
        <h1>invalid input</h1>
      )}
      {!!selectedFile && (
        <OptionWrapper>
          <Option onClick={() => setSelectedFile(undefined)}>Reset</Option>
          <Option onClick={(e) => get_image_result(e)}>Apply</Option>
        </OptionWrapper>
      )}
    </BodyWrapper>
  )
}

export default Body
