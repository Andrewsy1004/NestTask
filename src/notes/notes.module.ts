import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [
    TypeOrmModule.forFeature([Note]),
    AuthModule
  ],

  exports: [NotesService,TypeOrmModule],

})
export class NotesModule {}
