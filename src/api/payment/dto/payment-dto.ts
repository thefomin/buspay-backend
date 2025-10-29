import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PaymentDto {
  @IsInt({ message: 'Сумма должна быть числом.' })
  @IsNotEmpty({ message: 'Сумма обязателена для заполнения.' })
  amount: number;

  @IsString({ message: 'Номер билета должен быть строкой.' })
  @IsNotEmpty({ message: 'Номер билета обязателен для заполнения.' })
  @MinLength(6, {
    message: 'Билет должен содержать минимум 6 символов.',
  })
  code: string;

  @IsString({ message: 'Telegram user должен быть строкой.' })
  @IsNotEmpty({ message: 'Telegram user обязателен для заполнения.' })
  telegramUser: string;

  @IsInt({ message: 'chatId должен быть числом.' })
  @IsNotEmpty({ message: 'chatId обязателен для заполнения.' })
  chatId: number;
}
