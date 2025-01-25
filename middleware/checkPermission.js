export const checkPermission = (requestUser, resourceUserId, res) => {
  console.log(requestUser._id);
  console.log("---");
  console.log(resourceUserId.toString());
  if (requestUser.role === "admin") {
    return;
  }

  if (requestUser._id.toString() === resourceUserId.toString()) {
    return;
  }

  res.status(401);
  throw new Error("tidak mempunyai akses");
};
