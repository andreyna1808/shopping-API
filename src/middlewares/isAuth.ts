/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '../config/auth';
import { AppError } from '../utils/appError';

interface ISub {
  sub: string;
}

export default function IsAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization; // Vai requerir algo na autorização

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  // BEARER JWTTOKEN=hsabhfdhfdfdsfdscfgctrhvtrde5465u6 esse é o padrão que o JWT é formado, o que queremos é o token
  const [bearer, token] = authHeader.split(' '); // Separa pelo espaço

  try {
    const decodedToken = verify(token, authConfig.jwt); // Vai verificar se o token gerado foi criado por causa de secret

    const { sub } = decodedToken as ISub;

    req.user = {
      id: sub,
    };

    return next(); // Se essa comparação for verdadeira vai mandar seguir em frente, next
  } catch (error) {
    throw new AppError('Invalid JWT Token');
  }
}
