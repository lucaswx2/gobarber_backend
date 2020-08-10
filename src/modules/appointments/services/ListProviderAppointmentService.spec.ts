import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentService from './ListProviderAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointments: ListProviderAppointmentService;
let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the appointments on a specific day for the provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
