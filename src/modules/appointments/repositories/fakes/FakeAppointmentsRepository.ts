import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTOP from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IfindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';
import IfindAllInDayFromProviderDTO from '@modules/appointments/dtos/IfindAllInDayFromProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({ provider_id, month, year}: IfindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointmets = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
      
      return appointmets;
    }
    
    public async findAllInDayFromProvider({ provider_id, day, month, year}: IfindAllInDayFromProviderDTO): Promise<Appointment[]> {
      const appointmets = this.appointments.filter(appointment => {
        return (
          appointment.provider_id === provider_id &&
          getDate(appointment.date) === day &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year
        );
      });

    return appointmets;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTOP): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
