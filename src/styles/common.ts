export const root = () => ({
  '@global': {
    'html, body, #app': {
      fontFamily: 'sans-serif',
      height: '100%',
      margin: '0px',
      width: '100%',
    },
    body: {
      overflow: 'hidden',
    },
  },
})

export enum FlexDirection {
  COLUMN = 'column',
  COLUMN_REVERSE = 'column-reverse',
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
}
export const displayFlex = (flexDirection = FlexDirection.ROW) => ({
  display: 'flex',
  flexDirection,
})

export enum FlexAlign {
  BASELINE = 'baseline',
  CENTER = 'center',
  END = 'flex-end',
  START = 'flex-start',
  STRETCH = 'stretch',
}
export const flexAlign = (alignItems = FlexAlign.STRETCH) => ({
  alignItems,
})

export enum FlexJustify {
  AROUND = 'space-around',
  BETWEEN = 'space-between',
  CENTER = 'center',
  END = 'flex-end',
  EVENLY = 'space-evenly',
  START = 'flex-start',
}

export const flexJustify = (justifyContent = FlexJustify.START) => ({
  justifyContent,
})

export const flexGrow = (basis = 'auto', grow = 1) => ({
  flex: `${grow} 0 ${basis}`,
})

export const flexShrink = (basis = 'auto', shrink = 1) => ({
  flex: `0 ${shrink} ${basis}`,
})

export const flexStatic = (basis = 'auto') => ({
  flex: `0 0 ${basis}`,
})
