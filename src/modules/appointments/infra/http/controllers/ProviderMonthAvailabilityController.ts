import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );
    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: request.params.id,
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}
