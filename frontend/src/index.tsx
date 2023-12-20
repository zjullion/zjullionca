import isPropValid from '@emotion/is-prop-valid'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyleSheetManager } from 'styled-components'

const componentsToTrack = [
  /Input/,
  /Modal/,
  /Provider/,
  /AlertMessage/,
  /DateTimePicker/,
  /FormButton/,
]

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, { include: componentsToTrack })
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={isPropValid}></StyleSheetManager>
  </StrictMode>,
)
