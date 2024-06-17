import {
  Controller,
  Get,
  Next,
  Res,
  HttpStatus,
  Post,
  Body,
  Req,
  Param,
  Patch,
  Delete,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import {
  IntPatient,
  CreatePatientDTO,
  UpdatePatientDTO,
} from 'src/validators/patient.validator';
import { PatientService } from './patient.service';
import { NextFunction, Response, Request } from 'express';
import {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from 'src/errors';
import { UUID } from 'crypto';
import { Patient } from 'src/models';
import { RoleGuard } from 'src/middlewares/role-guard';
import { Role } from 'config/decorators/roles.decorator';
import { UserRole } from 'config/enum/role.enum';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @Role(UserRole.doctor)
  @UseGuards(RoleGuard)
  async index(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const result: { rows: IntPatient[]; count: Number } =
        await this.patientService.index();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Get('owner')
  @Role(UserRole.owner)
  @UseGuards(RoleGuard)
  async getByOwner(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req.user.id;

      const result: { rows: IntPatient[]; count: Number } =
        await this.patientService.getByOwner(userId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Get(':petName')
  @Role(UserRole.owner)
  @UseGuards(RoleGuard)
  async getDetailByOwner(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('petName') name: String,
  ) {
    try {
      const userId = req.user.id;
      const result: IntPatient[] = await this.patientService.getDetailByOwner(
        userId,
        name,
      );

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Patch(':patientId')
  @Role(UserRole.owner)
  @UseGuards(RoleGuard)
  async update(
    @Body() UpdateDTO: UpdatePatientDTO,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('patientId') patientId: UUID,
  ) {
    try {
      const ownerId = req.user.id;

      const oldData: Patient = await this.patientService.getById(patientId);
      if (!oldData || oldData.ownerId != ownerId)
        throw new UnauthenticatedError('Pet Doesnt exists');
      const newData: IntPatient = {
        ...UpdateDTO,
        ownerId: req.user.id,
      };
      const result = await this.patientService.updatePatient(oldData, newData);

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Post()
  @Role(UserRole.owner)
  @UseGuards(RoleGuard)
  async create(
    @Body() PatientDTO: CreatePatientDTO,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const user = req.user;
      const data: IntPatient = {
        ...PatientDTO,
        ownerId: user.id,
      };
      const result: IntPatient = await this.patientService.create(data);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @Delete(':patientId')
  @Role(UserRole.owner)
  @UseGuards(RoleGuard)
  async destroy(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('patientId') patientId: UUID,
  ) {
    try {
      const oldData: Patient = await this.patientService.getById(patientId);
      if (oldData.ownerId != req.user.id)
        throw new UnauthenticatedError('Pet Doesnt exists');
      const result: Number = await this.patientService.destroy(patientId);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Request Success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
