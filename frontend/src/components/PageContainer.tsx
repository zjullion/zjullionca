import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

import { COLOR } from '../theme'
import { StyledLink } from './StyledLink'

const LINK_BACKGROUNDS = {
  currentUrl: COLOR.BackgroundLightGrey,
  default: 'white',
}

const MainTitle = styled.h1`
  font-family: 'Alfa Slab One', serif;
  font-weight: normal;
  color: ${COLOR.TextWhite};
  margin: 5px 15px 0 15px;
`
const MainSubtitle = styled.h2`
  font-family: 'Kanit', sans-serif;
  font-weight: bold;
  color: ${COLOR.TextWhite};
  margin: 0 15px 5px 15px;
`

const LinkContainer = styled.div`
  background: ${COLOR.BackgroundLightGrey};
  margin: 0;
  display: flex;
  padding: 5px 30px;
  gap: 20px;
`

export const PageContainer: FunctionComponent = () => {
  return (
    <>
      <MainTitle>Zach Jullion</MainTitle>
      <MainSubtitle>Senior Fullstack Software Developer</MainSubtitle>
      <LinkContainer>
        <StyledLink backgrounds={LINK_BACKGROUNDS} content="Home" to="/" />
        <StyledLink backgrounds={LINK_BACKGROUNDS} content="Projects" to="/projects" />
      </LinkContainer>
      <Outlet />
    </>
  )
}
