import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { getTelegrafConfig } from '@/config';

import { BotService } from './bot.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegrafConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
