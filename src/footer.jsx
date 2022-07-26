import React from "react"
import styled from "styled-components"
import GitHubIcon from '@material-ui/icons/GitHub';

const GHIcon = styled(GitHubIcon)`
  opacity: 0.5;
  height: 60%;
`

const FooterContainer = styled.div`
  margin-top: auto;
`

const Footer = ( ) => {
  return (
    <FooterContainer>
      <GHIcon />
    </FooterContainer>
  )
}

export default Footer
