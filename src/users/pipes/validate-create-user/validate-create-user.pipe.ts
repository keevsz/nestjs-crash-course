import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDTO, metadata: ArgumentMetadata) {
    console.log('Inside validatecreateuserpipe');
    console.log(value);
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log(value.age + 'is not a number!');
      throw new HttpException(
        'Invalid Data Type for property age. Expected number',
        HttpStatus.FORBIDDEN,
      );
    }
    console.log(parseAgeToInt + 'is a number...');
    return { ...value, age: parseAgeToInt };
  }
}
