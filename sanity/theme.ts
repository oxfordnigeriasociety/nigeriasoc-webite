import { buildLegacyTheme } from 'sanity'

const colors = {
  white: '#ffffff',
  black: '#1a1a1a',
  ngGreen: '#008751', // Nigerian Green from your CSS (rgb 0, 135, 81)
  ngGreenLight: '#e6f3ed',
  ngGreenMid: '#80c3a8',
  gray: '#666666',
  offWhite: '#f9f9f9',
}

export const studioTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': colors.black,
  '--white': colors.white,

  '--gray': colors.gray,
  '--gray-base': colors.gray,

  '--component-bg': colors.white,
  '--component-text-color': colors.black,

  /* Brand Colors */
  '--brand-primary': colors.ngGreen,

  /* Default button */
  '--default-button-color': colors.gray,
  '--default-button-primary-color': colors.ngGreen,
  '--default-button-success-color': colors.ngGreen,
  '--default-button-warning-color': '#f5a623',
  '--default-button-danger-color': '#d43f3a',

  /* State colors */
  '--state-info-color': colors.ngGreenMid,
  '--state-success-color': colors.ngGreen,
  '--state-warning-color': '#f5a623',
  '--state-danger-color': '#d43f3a',

  /* Navbar */
  '--main-navigation-color': colors.black,
  '--main-navigation-color--inverted': colors.white,

  '--focus-color': colors.ngGreen,
})