import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Req() request: Express.Request,
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User 
    ) {
    return this.notesService.create(createNoteDto, user.id); 
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @Param('id') id: string, 
    @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(
    @Req() request: Express.Request,
    @GetUser() user: User,  
    @Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
