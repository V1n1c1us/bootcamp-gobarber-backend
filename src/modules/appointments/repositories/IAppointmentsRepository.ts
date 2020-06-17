import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTOP from '../dtos/ICreateAppointmentDTO';
import IfindAllInMonthFromProviderDTO from '../dtos/IfindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTOP): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IfindAllInMonthFromProviderDTO): Promise<Appointment[]>;
}
