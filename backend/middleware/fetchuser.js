const jwt = require('jsonwebtoken');       

const JWT_SECRET = 'Adeel is a good bo$y';

                                                                      //middelware(fetchuser) is a function that is called whenever  on login requireds one routes, any request comes
const fetchuser = (req, res, next) =>{                                //where we typed fetchuser, running next one
                                                                     //  get the user from the jwt token and add id to req object
  const token = req.header('auth-token');                            //it would take token from header in thunderclient
  if(!token) {                                                       //if token doesnt exist so send acces denid(401) and send error
    res.status(401).send({error: "please authenticate using a valid token"})
  }
  try {                                                               //if token doesnt valid so put the code in trycatch
    const data = jwt.verify(token, JWT_SECRET);                       //take out user's id from token
    req.user = data.user;                                             //got user then run the next 
    next();
  } catch (error) {
   res.status(401).send({error: "please authenticate using a valid token"})    
  }
}
module.exports = fetchuser;     