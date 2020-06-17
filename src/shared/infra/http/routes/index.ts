import { Router } from 'express';

import appoitmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providerRouter from '@modules/appointments/infra/http/routes/providers.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
const routes = Router();

routes.use('/appointments', appoitmentsRouter);
routes.use('/providers', providerRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', profileRouter);
routes.use('/users', usersRouter);

export default routes;
