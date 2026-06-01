exports.updateProfile = async (
  req,
  res
) => {
  const allowedFields = [
    "name",
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field]) {
      updates[field] =
        req.body[field];
    }
  });

  const user =
    await User.findByIdAndUpdate(
      req.user.id,
      updates,
      {
        new: true,
      }
    );

  res.json(user);
};