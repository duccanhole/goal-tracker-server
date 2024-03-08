import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  @ApiProperty({ type: String, example: '65eb2737a701190d72a10bf9' })
  _id: string;

  @ApiProperty({ type: String, example: 'test' })
  username: string;

  @ApiProperty({
    type: String,
    example: '$2a$10$XU4qIqe6arFzQ2VqJL5REuR7wdiRmy1vdeZLLxE7OSfo1mt8KFnfW',
  })
  password: string;
}

export class ILoginResult {
  @ApiProperty({
    type: String,
    example: 'm2Y7sWKRwL26o2ivD5dF0gqCyUgo2tPl3ZHULw9RLcaH19IChIt0zUlugaJ11tVY',
  })
  token: string;

  @ApiProperty({ type: IUser })
  userData: IUser;
}

export class ILoginResponse {
  @ApiProperty({ type: ILoginResult })
  result: {
    token: string;
    userData: IUser;
  };
}
