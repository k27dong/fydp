import React from "react"
import styled from "styled-components"
import GitHubIcon from "@mui/icons-material/GitHub"
import { GITHUB_URL } from "./const"

const GHIcon = styled(GitHubIcon)`
  opacity: 0.5;
  height: 60%;

  &:link {
    text-decoration: none;
    color: inherit;
  }
`

const FooterContainer = styled.a`
  margin-top: auto;
`

const Footer = () => {
  return (
    <FooterContainer href={GITHUB_URL} target="_blank">
      <GHIcon />
    </FooterContainer>
  )
}

export default Footer
