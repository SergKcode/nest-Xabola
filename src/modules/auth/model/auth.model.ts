import { UserRoles } from "src/modules/users/models/users.model";

export interface JwtPayload{
    email: string,
    role: UserRoles
}