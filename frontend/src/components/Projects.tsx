import { FunctionComponent } from 'react'
import { SafeLink } from './base'

export const Projects: FunctionComponent = () => {
  return (
    <>
      My formal education conists of both a BSc Honors and a MSc from the University of Alberta. You
      can take a look at my master&apos;s thesis{' '}
      <SafeLink
        content="here"
        to="https://era.library.ualberta.ca/items/82a7eb86-455b-4938-8630-6c57e9398ae5"
      />
      .
    </>
  )
}
