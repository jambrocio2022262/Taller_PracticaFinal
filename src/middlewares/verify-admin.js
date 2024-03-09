export const isAdmin = (req, res, next) => {
  const user = req.usuario;

  if (user.role === "ADMIN_ROLE") return next();

  return res.status(400).json({
    msg: "You not have access",
  });
};

export const isClient = (req, res, next) => {
    const user = req.usuario;
  
    if (user.role === "CLIENT_ROLE") return next();
  
    return res.status(400).json({
      msg: "You not have access, ",
    });
  };


