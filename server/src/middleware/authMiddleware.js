export const requireUser = (req, res, next) => {
  const userId = req.header('x-user-id') || req.query.userId || req.body.userId

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User id is required. Send x-user-id header, query userId, or body userId.',
    })
  }

  req.user = {
    id: userId,
    name: req.header('x-user-name') || req.body.userName || 'QuickShow User',
    email: req.header('x-user-email') || req.body.userEmail || '',
  }

  next()
}
