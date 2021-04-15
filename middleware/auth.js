import jwt from 'jsonwebtoken';

// I want to like a post.
// so click the button => auth middleware (next) => like controller.

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test'); // for custom signin

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);  // for google auth

            req.userId = decodedData?.sub; // sub is google's way of differentiating users
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;