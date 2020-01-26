module.exports = api => {
  if (api.env('test')){
    api.cache(false)
    
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        [
          '@babel/preset-typescript'
        ]
      ],
    }
  }
};