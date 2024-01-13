import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    try {
      const userToken = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
     
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  },
);
