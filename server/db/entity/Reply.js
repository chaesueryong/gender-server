import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import {Board} from "./Board";
import {User} from "./User";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id;

    // 댓글 내용
    @Column("longtext", { nullable: false })
    reply_content;

    // 댓글 깊이
    @Column("int", { nullable: false })
    reply_depth;

    // 댓글 추천 리스트
    @Column("text", { nullable: false })
    reply_good_list;

    // 댓글 비추천 리스트
    @Column("text", { nullable: false })
    reply_bad_list;

    // 댓글 신고 리스트
    @Column("text", { nullable: false })
    reply_report_list;

    // 댓글 신고 수
    @Column("int", { nullable: false, default: 0 })
    reply_report_count;

    // 댓글 상태
    @Column("boolean", { default: true, nullable: false })
    reply_status;

    // 대댓글 리스트
    @Column("text", { nullable: false })
    reply_sub_list;

    // 데이터 생성 시간
    @CreateDateColumn()
    createdAt;

    // 데이터 업데이트 시간
    @UpdateDateColumn()
    updatedAt;

    @ManyToOne(type => Board, board => board.replies, { nullable: false })
    board;

    @ManyToOne(type => User, user => user.replies, { nullable: false })
    user;
}
