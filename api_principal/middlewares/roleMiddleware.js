const authRoleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Asumiendo que el usuario está en req.user después de la autenticación

    if (!user || !user.role || !user.role.includes(requiredRole)) {
      return res.status(403).json({
        message: "Access denied. You do not have the required role.",
      });
    }
    // Si el usuario tiene el rol requerido, continuar con la siguiente función middleware
    next();
  };
};

module.exports = { authRoleMiddleware };
