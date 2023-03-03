import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import MemoryIcon from "@mui/icons-material/Memory"
import {
  MODE_INVALID,
  MODE_IMAGE,
  MODE_VIDEO,
  MODE_LIVESTREAM,
  API_URL,
} from "./const"
import { Box } from "@mui/material"

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

const OptionBox = styled(Box)`
  text-align: center;
  display: "flex";
  flex-direction: "column";
  align-items: "center";
  justify-content: "center";
  margin-top: 1rem;
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
        console.log(res.data)
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
        <OptionBox>
          <LoadingButton
            style={{ minWidth: "7rem", marginRight: "1rem" }}
            loading={false}
            onClick={() => {
              setSelectedFile(undefined)
              setResult([])
            }}
            variant="contained"
          >
            Reset
          </LoadingButton>
          <LoadingButton
            style={{ minWidth: "7rem" }}
            loading={loading}
            onClick={(e) => get_image_result(e)}
            variant="contained"
            endIcon={<MemoryIcon />}
            loadingPosition="end"
          >
            Apply
          </LoadingButton>
        </OptionBox>
      )}
    </BodyWrapper>
  )
}

export default Body
