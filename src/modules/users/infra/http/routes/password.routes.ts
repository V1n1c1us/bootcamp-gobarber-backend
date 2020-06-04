import { Router } from 'express';

import ForgotPassowdController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPassowdController = new ForgotPassowdController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPassowdController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
