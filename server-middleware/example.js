// Can I use Axios in here?


export default (req, res, next) => {
    console.log('server-middleware')
    next()
}


