import { UserRoles } from '../enums/user.enum';
import { Team } from '../enums/team.enum';

export interface IUser {
  _id?: string;
  username: string;
  token?: string;
  name: string;
  email: string;
  jerseyNumber: Number;
  roles: UserRoles[];
  team: Team;
}
