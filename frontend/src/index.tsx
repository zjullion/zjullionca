import isPropValid from '@emotion/is-prop-valid'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createGlobalStyle, StyleSheetManager } from 'styled-components'

import { Home } from './components/Home'
import { PageContainer } from './components/PageContainer'
import { Projects } from './components/Projects'

const componentsToTrack = [/PageContainer/, /Home/, /Projects/]

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
            <Route element={<Projects />} path="projects" />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyleSheetManager>
  </StrictMode>,
)
