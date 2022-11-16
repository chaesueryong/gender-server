import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne, JoinColumn, PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";

@Entity()
export class UserStatus {
    @PrimaryGeneratedColumn()
    id;

    // 레벨
    @Column("int", { default: 0, unsigned: true, nullable: false })
    user_status_level;

    // 포인트
    @Column("int", { default: 0, unsigned: true, nullable: false })
    user_status_point;

    // 정지 시간
    @Column("varchar", { nullable: true })
    user_status_suspension;

    // 탈퇴 여부
    @Column("boolean", { default: false, nullable: false })
    user_status_withdrawal;

    // 데이터 생성 시간
    @CreateDateColumn()
    createdAt;

    // 데이터 업데이트 시간
    @UpdateDateColumn()
    updatedAt;

    @OneToOne(type => User, user => user.userStatus, { nullable: false })
    @JoinColumn()
    user;
}
