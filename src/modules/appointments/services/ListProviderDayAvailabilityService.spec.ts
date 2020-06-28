import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentosRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProviderDayAvailabilityService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentosRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentosRepository
    );
  });

  it('should be able to list the day availibility from providers', async () => {
    await fakeAppointmentosRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentosRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual
      (expect.arrayContaining([
        { hour: 8, available: false},
        { hour: 9, available: true},
        { hour: 10, available: false},
        { hour: 11, available: true},
      ]),
    );
  });
});
