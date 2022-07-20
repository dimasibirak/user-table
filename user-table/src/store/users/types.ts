import { IUser } from 'user-table/src/models'

export interface IUsersState {
  fetching: boolean
  users: IUser[]
}
