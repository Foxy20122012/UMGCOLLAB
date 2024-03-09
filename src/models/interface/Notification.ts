import { NotificationType } from '../emuns/EmunNotificationType'

export interface Notification {
  id: string
  read: boolean
  description: string
  subject: string
  type: NotificationType
  createdAt?: string
  genericId?: string
}
