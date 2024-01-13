import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/auth/entities/user.entity';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  
  constructor(
    @InjectRepository(Note)
    private readonly productRepository: Repository<Note>,
    
    @InjectRepository( User)
    private readonly userRepository: Repository<User>,

  ) {}


  async create(createNoteDto: CreateNoteDto, userId:String) {  
   try { 

    const newNote = this.productRepository.create({
      ...createNoteDto,
      user: { id: userId.toString() }
    });
    
    await this.productRepository.save(newNote);
    return{"message": "Note created"}
    
   }catch (error) {
    this.handleDBExceptions(error);
   }

   

  }

  async findAll() {
    try {
      const notes = await this.productRepository.find({
        relations: ['user'],
      });
  
      const sanitizedNotes = notes.map(note => {
        const sanitizedNote = JSON.parse(JSON.stringify(note));
        
        if (sanitizedNote.user) {
          delete sanitizedNote.user.email;
          delete sanitizedNote.user.id;
          delete sanitizedNote.user.isActive;
        }
        
        return sanitizedNote;
      });
  
     
      return sanitizedNotes;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  

  async findOne(id: string) {
    try{
      const notes = await this.productRepository.findOne({
        where: { id },
        relations: ['user'],
      });


      const sanitizedNote = JSON.parse(JSON.stringify(notes));

      if (sanitizedNote.user) {
        delete sanitizedNote.user.email;
        delete sanitizedNote.user.id;
        delete sanitizedNote.user.isActive;
      }
      
      return sanitizedNote;
    }catch (error) {
      this.handleDBExceptions(error); 
    }
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    try {
      const notes = await this.productRepository.findOne({where: { id }});
      if(notes===null) return {"message": "Note not found"}
      
      await this.productRepository.update({id}, {...updateNoteDto});
      return {"message": "Note updated"}
    
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  

  remove(id: string) {
    try {
       this.productRepository.delete(id);
       return {"message": "Note deleted"}  
    }catch (error) {
      this.handleDBExceptions(error); 
    }
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' ) throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
    
}
