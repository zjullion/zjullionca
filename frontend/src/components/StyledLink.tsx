import color from 'color'
import { FunctionComponent, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'

import { COLOR } from '../theme'

const NEW_TAB_ATTRIBUTES = {
  rel: 'noopener norefferer',
  target: '_blank',
}

const StyledA = styled(Link)<{ isCurrentUrl: boolean }>`
  font-family: 'Roboto, "Open Sans", sans-serif';
  font-weight: bold;
  text-decoration: none;
  color: ${COLOR.LinkInactivePurple};
  &:hover {
    color: ${COLOR.LinkActiveGreen};
  }
  ${(props) => (props.isCurrentUrl ? 'pointer-events: none;' : '')}
`

const LinkContent = styled.p<{ background: string; isCurrentUrl: boolean }>`
  background: ${(props) => props.background};
  border-radius: 3px;
  padding: 7px;
  margin: 0;
  ${(props) => {
    return props.isCurrentUrl
      ? ''
      : `&:hover { background: ${color(props.background).darken(0.1).hex()}; }`
  }}
`

export type StyledLinkProps = {
  backgrounds: {
    currentUrl: string
    default: string
  }
  content: string
  openNewTab?: boolean
  to: string
}

const StyledLinkNonMemoized: FunctionComponent<StyledLinkProps> = (props) => {
  const { pathname } = useLocation()
  const { backgrounds, content, openNewTab, to } = props

  const isCurrentUrl = pathname?.includes(to)
  const background = isCurrentUrl ? backgrounds?.currentUrl : backgrounds?.default
  const additionalLinkAttributes = openNewTab ? NEW_TAB_ATTRIBUTES : {}

  return (
    <StyledA isCurrentUrl={isCurrentUrl} to={to} {...additionalLinkAttributes}>
      <LinkContent background={background} isCurrentUrl={isCurrentUrl}>
        {content}
      </LinkContent>
    </StyledA>
  )
}

export const StyledLink = memo(StyledLinkNonMemoized)
