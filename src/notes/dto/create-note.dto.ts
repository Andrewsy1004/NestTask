import { IsIn, IsString, IsUUID, MinLength } from "class-validator";



enum NoteStatus {
    Done = 'done',
    InProgress = 'in-progress',
}


export class CreateNoteDto {
 
    
    id?: string;

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;
    
    @IsString()
    @MinLength(1)
    @IsIn(['done','in-progress'])
    status: NoteStatus;

}
