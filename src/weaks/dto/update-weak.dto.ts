import { PartialType } from '@nestjs/mapped-types';
import { CreateWeakDto } from './create-weak.dto';

export class UpdateWeakDto extends PartialType(CreateWeakDto) {}
