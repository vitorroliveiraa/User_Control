import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ name, email }: IRequest): User {
        const emailAlreadyExist = this.usersRepository.findByEmail(email);

        if (emailAlreadyExist) {
            throw new Error("E-mail already exists!");
        }

        const user = this.usersRepository.create({ name, email });

        return user;
    }
}

export { CreateUserUseCase };
