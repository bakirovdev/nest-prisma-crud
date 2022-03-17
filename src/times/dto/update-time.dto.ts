import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeDto } from './create-time.dto';

export class UpdateTimeDto extends PartialType(CreateTimeDto) {}
