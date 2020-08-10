import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: request.params.id,
      month: Number(day),
      year: Number(month),
      day: Number(year),
    });
    return response.json(availability);
  }
}