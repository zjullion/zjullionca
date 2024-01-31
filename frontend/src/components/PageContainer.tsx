import { FunctionComponent } from 'react'
import { Link, LinkProps, Outlet, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'

const generateScreenWidthStyles = (
  styles: [string, string, string, string, string, string, string, string],
) => {
  return `
  @media only screen and (min-width: 1621px) { ${styles[0]} }
  @media only screen and (max-width: 1620px) { ${styles[1]} }
  @media only screen and (max-width: 1080px) { ${styles[2]} }
  @media only screen and (max-width: 810px) { ${styles[3]} }
  @media only screen and (max-width: 675px) { ${styles[4]} }
  @media only screen and (max-width: 540px) { ${styles[5]} }
  @media only screen and (max-width: 450px) { ${styles[6]} }
  @media only screen and (max-width: 360px) { ${styles[7]} }
`
}

const COLOR_LIGHT_GREY = '#bdc1c9'

const AppContainer = styled.div`
  ${generateScreenWidthStyles([
    'font-size: 16px;',
    'font-size: 16px;',
    'font-size: 16px;',
    'font-size: 17px;',
    'font-size: 17px;',
    'font-size: 18px;',
    'font-size: 19px;',
    'font-size: 20px;',
  ])}
`

const MainTitle = styled.h1`
  font-family: 'Alfa Slab One', serif;
  font-weight: normal;
  line-height: 100%;
  color: white;
  margin: 10px 15px 5px 15px;
`
const MainSubtitle = styled.h2`
  font-family: 'Kanit', sans-serif;
  font-weight: bold;
  line-height: 100%;
  color: white;
  margin: 0 15px 15px 15px;
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
  background: ${(props) => (useIsCurrentUrl(props) ? 'white' : COLOR_LIGHT_GREY)};
  border-radius: 3px;
  padding: 7px;
  margin: 0;
  height: fit-content;
  width: min-content;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: #27001b;
  &:hover {
    color: #00270c;
  }
  ${(props) => {
    return useIsCurrentUrl(props) ? 'pointer-events: none;' : `&:hover { background: #dee0e4; }`
  }}
`

const ContentContainer = styled.div`
  background: white;
  color: black;
  margin: 15px auto 50px auto;
  width: fit-content;
  ${generateScreenWidthStyles([
    'max-width: 60%;',
    'max-width: 65%;',
    'max-width: 70%;',
    'max-width: 75%;',
    'max-width: 80%;',
    'max-width: 85%;',
    'max-width: 90%;',
    'max-width: 95%;',
  ])}
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
    <AppContainer>
      <MainTitle>Zach Jullion</MainTitle>
      <MainSubtitle>Senior Fullstack Software Developer</MainSubtitle>
      <LinkContainer>
        <StyledBarLink to="/">Home</StyledBarLink>
        <StyledBarLink to="/contributions">Open Source Contributions</StyledBarLink>
        <StyledBarLink to="/contact">Contact Me</StyledBarLink>
      </LinkContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <BottomBar>testing</BottomBar>
    </AppContainer>
  )
}
