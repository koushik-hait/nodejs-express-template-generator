import { Router } from "express";
import passport from "passport";
import {
  forgotPasswordRequest,
  handleSocialLogin,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetForgottenPassword,
  updateUserAvatar,
  verifyEmail,
} from "../../controllers/auth/user.controller.js";
import "../../libs/passport.config.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
} from "../../validators/auth/user.validator.js";
import { validate } from "../../validators/validate.js";

const router = Router();

// Unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);

router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword
  );

// // Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// router
//   .route("/change-password")
//   .post(
//     verifyJWT,
//     userChangeCurrentPasswordValidator(),
//     validate,
//     changeCurrentPassword
//   );
// router
//   .route("/resend-email-verification")
//   .post(verifyJWT, resendEmailVerification);
// router
//   .route("/assign-role/:userId")
//   .post(
//     verifyJWT,
//     verifyPermission([UserRolesEnum.ADMIN]),
//     mongoIdPathVariableValidator("userId"),
//     userAssignRoleValidator(),
//     validate,
//     assignRole
//   );

// SSO routes
// router.route("/google").get(
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   }),
//   (req, res) => {
//     res.send("redirecting to google...");
//   }
// );

router.route("/github").get(
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
  // (req, res) => {
  //   console.log("redirecting to github...");
  //   res.send("redirecting to github...");
  // }
);

// router
//   .route("/google/callback")
//   .get(passport.authenticate("google"), handleSocialLogin);

router.route("/github/callback").get(
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login", //`${process.env.CLIENT_LOGIN_URL}`,
  }),
  handleSocialLogin
);

export default router;
