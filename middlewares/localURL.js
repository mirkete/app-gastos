import path from 'node:path'

const dirname = process.cwd()

function getViewsURL ({ viewsURL }) {
  const completeURL = path.join(dirname, viewsURL)
  return completeURL
}

function localURL ({ viewsURL }) {
  return (req, res, next) => {
    res.locals.viewsURL = getViewsURL({ viewsURL })
    next()
  }
}

export { localURL }
