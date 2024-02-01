import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`

export const FlexChild = styled.div`
  flex: 1 1 min-content;
  height: fit-content;
  min-width: 250px;
  max-width: max-content;
`

export const Image = styled.img`
  display: block;
  margin: 10px auto;
`

export const ListItem = styled.li`
  font-family: Montserrat, sans-serif;
`

export const SafeLink: FunctionComponent<{
  content: string
  to: string
}> = (props) => {
  const { content, to } = props

  return (
    <Link rel="noopener norefferer" target="_blank" to={to}>
      {content}
    </Link>
  )
}

export const Text = styled.p`
  margin: 0 0 2px 0;
  padding: 0;
  font-family: Montserrat, sans-serif;
`

export const Title = styled.h3`
  margin: 0 0 5px 0;
  padding: 0;
  font-family: 'Roboto Slab', serif;
`

export const UnorderedList = styled.ul`
  margin: 2px 0 10px 0;
  padding: 0 0 0 20px;
`
