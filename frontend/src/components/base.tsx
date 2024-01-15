import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: Montserrat, 'Open Sans', sans-serif;
`

export const Title = styled.h3`
  margin: 0 0 5px 0;
  padding: 0;
  font-family: 'Roboto Slab', serif;
`

export type SafeLinkProps = {
  content: string
  to: string
}

export const SafeLink: FunctionComponent<SafeLinkProps> = (props) => {
  const { content, to } = props

  return (
    <Link rel="noopener norefferer" target="_blank" to={to}>
      {content}
    </Link>
  )
}
