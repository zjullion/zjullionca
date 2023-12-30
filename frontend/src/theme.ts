import color from 'color'
import { createGlobalStyle } from 'styled-components'

export enum COLOR {
  BackgroundDarkBlue = '#000727',
  BackgroundLightGrey = '#BDC1C9',
  LinkActiveGreen = '#00270C',
  LinkInactivePurple = '#27001B',
  TextWhite = 'white',
}

export const BodyStyle = createGlobalStyle`
  body {
    background: linear-gradient(black, ${COLOR.BackgroundDarkBlue}) fixed;
    margin: 0;
    padding: 0;
  }
`

export enum FONT {}
// Content = '"Open Sans", sans-serif',
// Header = '"Roboto Slab", serif',
// Input = 'Montserrat, "Open Sans", sans-serif',
// Label = 'Roboto, "Open Sans", sans-serif',

export enum SPACING {}
// ContainerEdge = '0.5em',

export const generateFontColor = (backgroundColor: string) => {
  if (color(backgroundColor).isLight()) {
    return 'black'
  }
  return 'white'
}
