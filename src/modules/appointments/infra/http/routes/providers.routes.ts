import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailability = new ProviderMonthAvailabilityController();
const providerMonthAvailability = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get(
  '/',

  providersController.index,
);

providersRouter.get(
  '/:id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailability.index,
);
providersRouter.get(
  '/:id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailability.index,
);

export default providersRouter;
