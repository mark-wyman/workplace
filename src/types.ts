import type { DateTime } from 'luxon'
import { type ExportDate } from '.'

export type GroupPrivacySetting = 'Open' | 'Closed' | 'Secret'

export type GroupCategory = 'Discussions' | 'Teams and projects' | 'Social & More' | 'Announcements'

export interface WorkplaceGroupExportRow {
  name: string
  officialGroup: boolean
  uri: URL
  groupId: string
  members: number
  creationDate: DateTime
  lastUpdated?: DateTime
  groupPrivacySetting: GroupPrivacySetting
  groupCategory: GroupCategory
  default: boolean
  archived: boolean
  numberOfAdmins: number
  activitySummaryForDate: string
  activeInTheLast28Days: boolean
  activeInTheLastWeek: boolean
  activeInTheLastDay: boolean
  postsInTheLast28Days: number
  postsInTheLastWeek: number
  postsInTheLastDay: number
  commentsInTheLast28Days: number
  commentsInTheLastWeek: number
  commentsInTheLastDay: number
  reactionsInTheLast28Days: number
  reactionsInTheLastWeek: number
  reactionsInTheLastDay: number
}

export type WorkplaceGroupExport = WorkplaceGroupExportRow[]

export type Status = 'Active' | 'Deactivated' | 'Invited'

export type MemberType = 'Coworker'

export type Source = 'Admin' | 'Claimed Own Account' | 'Invited by Coworker' | 'Provision On Invite' | 'SCIM'

export interface WorkplacePeopleExportRow {
  fullName: string
  email: string
  employeeID: string
  uri: URL
  userId: string
  jobTitle: string
  department: string
  division: string
  organization: string
  phoneNumber: string
  location: string
  startDate: ExportDate
  admin: boolean
  source: Source
  creationDate: DateTime
  claimed: boolean
  claimedDate?: DateTime
  claimLink?: URL
  status: Status
  invitedDate?: DateTime
  managerEmail: string
  managerEmployeeID: string
  hasProfilePicture: boolean
  followers: number
  loginApprovalsEnabled: boolean
  frontline: boolean
  memberType: MemberType
}

export type WorkplacePeopleExport = WorkplacePeopleExportRow[]

export interface Secrets {
  appId: string
  appSecret: string
  accessToken: string
}

export interface Graph {
  id: (id: string) => Promise<any>
}
