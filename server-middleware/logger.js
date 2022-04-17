export default function (req, res, next) {
  console.log(`[Logger] ${req.url}`)
  next()
}
