import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCradentialsDto } from './dto/auth-cradentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authCradentialDto: AuthCradentialsDto): Promise<void> {
    return this.userRepository.signUp(authCradentialDto);
  }
}
