import { getRepository, Repository, Raw} from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTOP from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IfindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';

import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year}: IfindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = month.toString().padStart(2, '0');

    const appointmets = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        ),
      },
    })

    return appointmets;
  }
  

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTOP): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;