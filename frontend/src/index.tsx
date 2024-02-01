import isPropValid from '@emotion/is-prop-valid'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createGlobalStyle, StyleSheetManager } from 'styled-components'

import { Contact } from './components/Contact'
import { Contributions } from './components/Contributions'
import { Home } from './components/Home'
import { PageContainer } from './components/PageContainer'

const componentsToTrack = [
  /PageContainer/,
  /Home/,
  /Contributions/,
  /Contact/,
  /FlexDiv/,
  /FlexChild/,
  /Image/,
  /ListItem/,
  /SafeLink/,
  /Text/,
  /Title/,
  /UnorderedList/,
]

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, { include: componentsToTrack })
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

export const BodyStyle = createGlobalStyle`
  body {
    background: linear-gradient(black, #000727) fixed;
    margin: 0;
    padding: 0;
  }
`

root.render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <BodyStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<PageContainer />} path="/">
            <Route element={<Home />} path="" />
            <Route element={<Contributions />} path="contributions" />
            <Route element={<Contact />} path="contact" />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyleSheetManager>
  </StrictMode>,
)
