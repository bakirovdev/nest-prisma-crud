import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupStudentDto } from './create-group-student.dto';

export class UpdateGroupStudentDto extends PartialType(CreateGroupStudentDto) {}
