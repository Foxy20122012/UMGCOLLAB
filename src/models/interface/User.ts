import { ImageDetails } from './ImageDetails'
import { RoleType } from '@/models/emuns/EmunRoles'

export interface User {
  uuid: string
  name: string
  lastName: string
  dpi?: any
  phoneNumber: string
  birthday?: any
  address?: string
  email: string
  username: string
  profilePicture?: ImageDetails[]
  role?: RoleType
}
