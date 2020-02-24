const resolveOnNextLoop = () => new Promise((resolve) => {
  setImmediate(() => resolve())
})

export default resolveOnNextLoop
