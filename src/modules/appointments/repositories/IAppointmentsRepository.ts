import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTOP from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTOP): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
