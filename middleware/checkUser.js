
async function checkUser(req, res, next) {
  if(req.user){
      next();
  }
  else{
    return res.send({
        status: "error",
        message: "Please Log In",
      });
  }
}

export default checkUser;
