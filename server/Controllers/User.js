import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserSchema from '../Models/UserSchema.js';

//  {
//   verify: [Function (anonymous)],
//   sign: [Function (anonymous)],
//   JsonWebTokenError: [Function: JsonWebTokenError],
//   NotBeforeError: [Function: NotBeforeError],
//   TokenExpiredError: [Function: TokenExpiredError]
// }

export const signIn = async (req, res) => {
  // first we want to get the email and password from the client through the req.body and {email password} means ES6 destructuring directly fetch the data from the req.body method
  const { email, password } = req.body;
  console.log(email, password, 'This is request body values');
  // AS IM TOLD YOU BEFORE EVERY CONTROLLERS HAVE TRY CATCH BLOCK
  try {
    // FIRST CHECK THE USER ON THE DATABASE HE IS IN OR OUT SO WE HAVE TO USING FINDONE METHOD
    const existingUser = await UserSchema.findOne({ email });

    console.log(existingUser, 'userchecking existing user');
    //! MEANS USER IS NOT ( ILLAIENDRAL )
    if (!existingUser) {
      return res.status(404).json({ message: 'User Not In Your Database' });
    }
    // AND CHECK THE PASSWORD IN DATABASE IS OR NOT
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password doesnt match' });
    }
    // IF WE ARE HERE WE ARE GOING TO CREATE A TOKEN THROUGH THE JWT SO KEEP CONSIOUS
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'checking',
      {
        expiresIn: '1h',
      }
    );
    console.log(token, 'this token');
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const signUp = async (req, res) => {
  // first we want to get the email and password from the client through the req.body and {email password} means ES6 destructuring directly fetch the data from the req.body method
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  // AS IM TOLD YOU BEFORE EVERY CONTROLLERS HAVE TRY CATCH BLOCK
  try {
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User Already Exists' });
    }
    if (password !== confirmPassword) {
      return res.status(403).json({ message: 'Your Password is not match' });
    }
    // IF DONT HAVE THE USER AND PASSWORD IS MATCHED WE WANT TO HASH THE PASSWORD I MEAS BCRYPT THE PASSWORD 12 means how difficult the password
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await UserSchema.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'checking',
      {
        expiresIn: '1h',
      }
    );
    // console.log(token);
    return res.status(201).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
