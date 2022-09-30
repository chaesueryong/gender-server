import {
    Entity,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, OneToOne, PrimaryGeneratedColumn
} from "typeorm";
import {Board} from "./Board";
import {Reply} from "./Reply";
import {UserStatus} from './UserStatus';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id;

    // 이메일
    @Index({ unique: true })
    @Column("varchar", { nullable: false })
    user_email;

    // 아이디
    @Index({ unique: true })
    @Column("varchar", { nullable: false })
    user_id;

    // 비밀번호
    @Column("varchar", { nullable: false })
    user_password;

    // 닉네임
    @Index({ unique: true })
    @Column("varchar", { nullable: false })
    user_nickname;

    // 성별
    @Column("varchar", { nullable: false })
    user_gender;

    // 프로필 경로
    @Column("varchar", { nullable: true })
    user_profile;

    // 리프레시 토큰
    @Index()
    @Column("varchar", { nullable: true })
    user_refreshToken;

    // 데이터 생성 시간
    @CreateDateColumn()
    createdAt;

    // 데이터 업데이트 시간
    @UpdateDateColumn()
    updatedAt;

    @OneToMany(type => Board, board => board.user)
    boards;

    @OneToMany(type => Reply, reply => reply.user)
    replies;

    @OneToOne(type => UserStatus, userStatus => userStatus.user)
    userStatus;
}
