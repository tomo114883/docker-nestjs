import { Injectable } from '@nestjs/common';

@Injectable()
export class StringService {
  // TODO: messageを受け取る。
  readonly upperCase = (message: string): string => {
    // TODO: uppercaseに変換。
    return message.toUpperCase();
  }

  readonly lowerCase = (message: string): string => {
    return message.toLowerCase();
  }
}
