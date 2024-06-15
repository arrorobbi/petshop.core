import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from 'src/models/patient';
import { User } from 'src/models/user';
import { IntPatient } from '../validators/patient.validator';
import { UUID } from 'crypto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private PatientModel: typeof Patient,
  ) {}

  async index(): Promise<{ rows: IntPatient[]; count: Number }> {
    return await this.PatientModel.findAndCountAll({
      include: [{ model: User }],
    });
  }

  async create(data: {}): Promise<IntPatient> {
    return await this.PatientModel.create(data);
  }

  async getByOwner(
    userId: UUID,
  ): Promise<{ rows: IntPatient[]; count: Number }> {
    return await this.PatientModel.findAndCountAll({
      where: { ownerId: userId },
    });
  }

  async getById(patientId: UUID): Promise<Patient> {
    return await this.PatientModel.findByPk(patientId);
  }

  async getDetailByOwner(userId: UUID, petName: String): Promise<IntPatient[]> {
    return await this.PatientModel.findAll({
      where: { ownerId: userId, name: petName },
    });
  }

  async updatePatient(
    oldData: Patient,
    newData: IntPatient,
  ): Promise<IntPatient> {
    const updatePatient = Object.assign(oldData, newData);
    await updatePatient.save();

    return await updatePatient.reload();
  }
  async destroy(patientId: UUID): Promise<Number> {
    return this.PatientModel.destroy({ where: { id: patientId } });
  }
}
