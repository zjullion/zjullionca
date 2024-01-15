import { FunctionComponent } from 'react'
import { Link, LinkProps, Outlet, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'

const COLOR_LIGHT_GREY = '#bdc1c9'

const MainTitle = styled.h1`
  font-family: 'Alfa Slab One', serif;
  font-weight: normal;
  color: white;
  margin: 5px 15px 0 15px;
`
const MainSubtitle = styled.h2`
  font-family: 'Kanit', sans-serif;
  font-weight: bold;
  color: white;
  margin: 0 15px 5px 15px;
`

const LinkContainer = styled.div`
  background: ${COLOR_LIGHT_GREY};
  margin: 0;
  display: flex;
  padding: 5px 30px;
  gap: 20px;
`

const useIsCurrentUrl = (props: LinkProps) => props?.to === useLocation()?.pathname

const StyledBarLink = styled(Link)`
  background: ${(props) => (useIsCurrentUrl(props) ? COLOR_LIGHT_GREY : 'white')};
  border-radius: 3px;
  padding: 7px;
  margin: 0;
  font-family: 'Roboto', 'Open Sans', sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: #27001b;
  &:hover {
    color: #00270c;
  }
  ${(props) => {
    return useIsCurrentUrl(props)
      ? 'pointer-events: none;'
      : '&:hover { background: ${color(props.background).darken(0.1).hex()}; }'
  }}
`

const ContentContainer = styled.div`
  background: white;
  color: black;
  margin: 15px auto;
  @media only screen and (min-width: 1621px) {
    width: 60%;
  }
  @media only screen and (max-width: 1620px) {
    width: 65%;
  }
  @media only screen and (max-width: 1080px) {
    width: 70%;
  }
  @media only screen and (max-width: 810px) {
    width: 75%;
  }
  @media only screen and (max-width: 675px) {
    width: 80%;
  }
  @media only screen and (max-width: 540px) {
    width: 85%;
  }
  @media only screen and (max-width: 450px) {
    width: 90%;
  }
  @media only screen and (max-width: 360px) {
    width: 95%;
  }
  min-width: 275px;
  padding: 10px;
  border-radius: 5px;
`

const BottomBar = styled.div`
  background: ${COLOR_LIGHT_GREY};
  bottom: 0;
  box-sizing: border-box;
  color: black;
  padding: 0.25em;
  position: fixed;
  width: 100%;
`

export const PageContainer: FunctionComponent = () => {
  return (
    <>
      <MainTitle>Zach Jullion</MainTitle>
      <MainSubtitle>Senior Fullstack Software Developer</MainSubtitle>
      <LinkContainer>
        <StyledBarLink to="/">Home</StyledBarLink>
        <StyledBarLink to="/contributions">Open Source Contributions</StyledBarLink>
      </LinkContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <BottomBar>testing</BottomBar>
    </>
  )
}
