import {
  displayFlex,
  flexAlign,
  flexGrow,
  flexJustify,
  flexShrink,
  flexStatic,
  root,
} from './common'

describe('common', () => {
  it('has a root function', () => {
    expect(root()).not.toBeNull()
  })

  it('has a displayFlex function', () => {
    expect(displayFlex()).not.toBeNull()
  })

  it('has a flexAlign function', () => {
    expect(flexAlign()).not.toBeNull()
  })

  it('has a displayFlex function', () => {
    expect(displayFlex()).not.toBeNull()
  })

  it('has a flexGrow function', () => {
    expect(flexGrow()).not.toBeNull()
  })

  it('has a flexJustify function', () => {
    expect(flexJustify()).not.toBeNull()
  })

  it('has a flexShrink function', () => {
    expect(flexShrink()).not.toBeNull()
  })

  it('has a flexStatic function', () => {
    expect(flexStatic()).not.toBeNull()
  })
})
