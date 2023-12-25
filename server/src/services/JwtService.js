const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const generateAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '50s' })

    return access_token
}

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log('err', err)
                    resolve({
                        status: 'ERROR',
                        message: 'The authemtication'
                    })
                }
                const { payload } = user
                const access_token = await generateAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCESS',
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    generateAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
}