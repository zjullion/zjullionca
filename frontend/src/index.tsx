import isPropValid from '@emotion/is-prop-valid'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StyleSheetManager } from 'styled-components'

import { PageContainer } from './components/PageContainer'
import { BodyStyle } from './theme'

const componentsToTrack = [/PageContainer/, /StyledLink/]

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, { include: componentsToTrack })
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <BodyStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<PageContainer />} path="/">
            <Route element={<div></div>} path="balance_sheet" />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyleSheetManager>
  </StrictMode>,
)
