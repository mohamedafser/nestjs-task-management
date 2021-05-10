import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCradentialsDto } from './dto/auth-cradentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() authCradentiailsDto: AuthCradentialsDto): Promise<void> {
    console.log(authCradentiailsDto);
    return this.authService.signUp(authCradentiailsDto);
  }
}
