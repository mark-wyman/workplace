/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import Excel from 'exceljs'
import { type DateTime } from 'luxon'

import { type Source, type MemberType, type Status, type WorkplacePeopleExport } from './types'
import { getString, isValue, getUrl, getInteger, getDate } from './utils'
import ExportDate from './export-date'

export default async function loadWorkplacePeopleExport (path: string): Promise<WorkplacePeopleExport> {
  const workbook = new Excel.Workbook()
  await workbook.xlsx.readFile(path)
  const worksheet = workbook.getWorksheet(1)

  const rows: WorkplacePeopleExport = []

  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber === 1) return

    rows.push({
      fullName: getString(row.getCell(1)),
      email: getString(row.getCell(2)),
      employeeID: getString(row.getCell(3)),
      uri: getUrl(row.getCell(4)),
      userId: getString(row.getCell(5)),
      jobTitle: getString(row.getCell(6)),
      department: getString(row.getCell(7)),
      division: getString(row.getCell(8)),
      organization: getString(row.getCell(9)),
      phoneNumber: getString(row.getCell(10)),
      location: getString(row.getCell(11)),
      startDate: new ExportDate(getString(row.getCell(12))),
      admin: isValue(row.getCell(13), 'YES', false),
      source: getString(row.getCell(14)) as Source,
      creationDate: getDate(row.getCell(15)) as DateTime,
      claimed: isValue(row.getCell(16), 'YES', false),
      claimedDate: getDate(row.getCell(17)),
      claimLink: getString(row.getCell(18)).length === 0 ? undefined : getUrl(row.getCell(18)),
      status: getString(row.getCell(19)) as Status,
      invitedDate: getDate(row.getCell(20)),
      managerEmail: getString(row.getCell(21)),
      managerEmployeeID: getString(row.getCell(22)),
      hasProfilePicture: isValue(row.getCell(23), 'YES', false),
      followers: getInteger(row.getCell(24)),
      loginApprovalsEnabled: isValue(row.getCell(25), 'YES', false),
      frontline: isValue(row.getCell(26), 'YES', false),
      memberType: getString(row.getCell(27)) as MemberType
    })
  })

  return rows
}
