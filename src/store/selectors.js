import { createSelector } from 'reselect'

const screenshot = state => state.app.lastScreenshot

export const getLatestScreenshot =
  createSelector([ screenshot ], 
    screenshot => screenshot
  )