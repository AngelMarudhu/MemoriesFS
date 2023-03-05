import jwt from 'jsonwebtoken';
// PLEASE READ ALL COMMANDS BELOW THIS CODE LINES IT'S VERY USEFULL FOR YOUR UNDERSTANDING ::::::: THIS IS THE EXACT PROCESS
// YOU CLICK DELETE LIKE POST WHATERVER YOU CLICK THE ROUTE ==> AUTH MIDDLEWARE NEXT() ==> YOUR CONTROLLERS

// THIS IS MIDDLEWARE FOR USR AUTHENTICATION
const auth = async (req, res, next) => {
  //   console.log(req.headers);
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader, 'auth header');
    const token = authHeader.split(' ')[1]; // This means extract the token in array we need only 1st index value why because user data value is encoded that index value
    console.log(token, 'token');
    // When a user is authenticated, we extract their ID from the token and decode it using the jwt.verify method. Once the ID is decoded, we store it as req.user so that it can be used in subsequent requests to fetch user-specific data or perform any user-specific actions.

    const decoded = jwt.verify(token, 'test');
    // I'M ALREADY MENTIONED BEFORE THE LINE ALTHOUGH THIS LINE WHO'S LOGGING THE USER AND GET THEIR PARTICULAR ID WHY BECAUSE WE EASILY FIND OUT WHO'S LOGGING
    req.userId = decoded?.id;
    console.log(decoded, 'decoded token');
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

export default auth;
