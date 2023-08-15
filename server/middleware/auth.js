import jwt from 'jsonwebtoken';


const auth = async (req,res,next) => {  // next--> do something and then move to the next things 
   
    try {
         console.log(req.headers);
        const token =  req.headers.authorization.split(" ")[1];  // token is at first position on the array after we splite it
        const isCustomAuth = token.length < 500;  // if token length > 500 the its google token otherwise it's use token

        let decodedData;

        if(token && isCustomAuth)
        {
             decodedData = jwt.verify(token,'test')// it's goint to give username and id 

             req.userId = decodedData?.id
        }
       else{
        decodedData =  jwt.decode(token);

        req.userId  = decodedData?.sub;// sub is basically a google name of a specific id that differentiat every single user
       }
       next();
     // wants to like a post 
     // click on like button ==> auth middleware (this will confirm of diney that request) => okay only then => like the controller

    } catch (error) {
         console.log(error);
    }
}


export default auth; 