import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne, PrimaryGeneratedColumn
} from "typeorm";
import {Board} from "./Board";

@Entity()
export class Discussion {
    @PrimaryGeneratedColumn()
    id;

    // 게시글 제목
    @Column("varchar", { nullable: false })
    Discussion_title;

    // 게시글 내용
    @Column("mediumtext", { nullable: false })
    Discussion_contents;

    // 데이터 생성 시간
    @CreateDateColumn()
    createdAt;

    // 데이터 업데이트 시간
    @UpdateDateColumn()
    updatedAt;

    @OneToOne(type => Board, board => board.discussion, { nullable: false })
    board;
}
