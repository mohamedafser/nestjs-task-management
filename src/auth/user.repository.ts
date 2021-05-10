import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { AuthCradentialsDto } from './dto/auth-cradentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCradentialsDto: AuthCradentialsDto): Promise<void> {
    const { userName, password } = authCradentialsDto;

    const user = new User();
    user.userName = userName;
    user.password = password;
    await user.save();
  }
}
