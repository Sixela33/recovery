import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

class GuardianDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phrase: string;
}

export class CreateGalaxyDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  recoveryAddress: string;

  @IsArray()
  @IsNotEmpty()
  guardians: GuardianDto[];
}