import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTOP from '../dtos/ICreateAppointmentDTO';
import IfindAllInMonthFromProviderDTO from '../dtos/IfindAllInMonthFromProviderDTO';
import IfindAllInDayFromProviderDTO from '../dtos/IfindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTOP): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IfindAllInMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IfindAllInDayFromProviderDTO): Promise<Appointment[]>;
}
