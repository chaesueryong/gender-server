import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {Discussion} from "./Discussion";
import {Reply} from "./Reply";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id;

    // 게시글 종류
    @Column("varchar", { nullable: false })
    board_type;

    // 게시글 제목
    @Column("varchar", { nullable: false })
    board_title;

    // 게시글 내용 url
    @Column("text", { nullable: false })
    board_contents_url;

    // 게시글 조회수
    @Column("int", { default: 0, unsigned: true, nullable: false })
    board_view_count;

    // 게시글 추천리스트
    @Column("text", { nullable: false })
    board_good_list;

    // 게시글 추천 수
    @Column("int", { nullable: false, default: 0 })
    board_good_count;

    // 게시글 비추천리스트
    @Column("text", { nullable: false })
    board_bad_list;

    // 게시글 비추천 수
    @Column("int", { nullable: false, default: 0 })
    board_bad_count;

    // 게시글 신고 리스트
    @Column("text", { nullable: false })
    board_report_list;

    // 게시글 신고 수
    @Column("int", { nullable: false, default: 0 })
    board_report_count;

    // 게시글 상태
    @Column("boolean", { default: true, nullable: false })
    board_status;

    // 데이터 생성 시간
    @CreateDateColumn()
    createdAt;

    // 데이터 업데이트 시간
    @UpdateDateColumn()
    updatedAt;

    @ManyToOne(type => User, user => user.boards, { nullable: false })
    user;

    @OneToOne(type => Discussion, discussion => discussion.board)
    @JoinColumn()
    discussion;

    @OneToMany(type => Reply, reply => reply.board)
    replies;
}
