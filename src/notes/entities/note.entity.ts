import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


enum NoteStatus {
    Done = 'done',
    InProgress = 'in-progress',
}

@Entity()
export class Note {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    
    @Column({
        type: 'enum',
        enum: NoteStatus,
        default: NoteStatus.InProgress,
    })
    status: NoteStatus;

    @ManyToOne(() => User, user => user.notes)
    user: User;

}
