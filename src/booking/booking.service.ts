import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking, Patient, User } from 'src/models';
import { IntBooking } from 'src/validators/booking.validator';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    private BookingModel: typeof Booking,
  ) {}

  async index(): Promise<{ rows: IntBooking[]; count: Number }> {
    return await this.BookingModel.findAndCountAll({
      include: [{ model: User }, { model: Patient }],
    });
  }

  async getById(id: string): Promise<Booking> {
    return await this.BookingModel.findOne({
      where: { id: id },
      include: [{ model: User }, { model: Patient }],
    });
  }

  async create(data: {}): Promise<IntBooking> {
    const newBooking = await this.BookingModel.create(data);

    return (await this.BookingModel.findOne({
      where: { id: newBooking.id },
      include: [{ model: User }, { model: Patient }],
    })) as IntBooking;
  }

  async countBooking(date: String): Promise<number> {
    return this.BookingModel.count({
      where: {
        date: date,
      },
    });
  }

  async statusBooking(
    oldData: Booking,
    newData: IntBooking,
    t: any,
  ): Promise<IntBooking> {
    const updateStatus = Object.assign(oldData, newData);
    await updateStatus.save({ transaction: t });

    return await updateStatus.reload({ transaction: t });
  }
}
