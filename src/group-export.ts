/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import Excel from 'exceljs'
import { type DateTime } from 'luxon'

import { type GroupCategory, type GroupPrivacySetting, type WorkplaceGroupExport } from './types'
import { getString, isValue, getUrl, getInteger, getDate } from './utils'

export default async function loadWorkplaceGroupExport (path: string): Promise<WorkplaceGroupExport> {
  const workbook = new Excel.Workbook()
  await workbook.xlsx.readFile(path)
  const worksheet = workbook.getWorksheet(1)

  const rows: WorkplaceGroupExport = []

  worksheet?.eachRow(function (row, rowNumber) {
    if (rowNumber === 1) return

    rows.push({
      name: getString(row.getCell(1)),
      officialGroup: isValue(row.getCell(2), 'OFFICIAL', false),
      uri: getUrl(row.getCell(3)),
      groupId: getString(row.getCell(4)),
      members: getInteger(row.getCell(5)),
      creationDate: getDate(row.getCell(6)) as DateTime,
      lastUpdated: getDate(row.getCell(7)),
      groupPrivacySetting: getString(row.getCell(8)) as GroupPrivacySetting,
      groupCategory: getString(row.getCell(9)) as GroupCategory,
      default: isValue(row.getCell(10), 'YES', false),
      archived: isValue(row.getCell(11), 'YES', false),
      numberOfAdmins: getInteger(row.getCell(12)),
      activitySummaryForDate: getString(row.getCell(13)),
      activeInTheLast28Days: isValue(row.getCell(14), 'YES', false),
      activeInTheLastWeek: isValue(row.getCell(15), 'YES', false),
      activeInTheLastDay: isValue(row.getCell(16), 'YES', false),
      postsInTheLast28Days: getInteger(row.getCell(17)),
      postsInTheLastWeek: getInteger(row.getCell(18)),
      postsInTheLastDay: getInteger(row.getCell(19)),
      commentsInTheLast28Days: getInteger(row.getCell(20)),
      commentsInTheLastWeek: getInteger(row.getCell(21)),
      commentsInTheLastDay: getInteger(row.getCell(22)),
      reactionsInTheLast28Days: getInteger(row.getCell(23)),
      reactionsInTheLastWeek: getInteger(row.getCell(24)),
      reactionsInTheLastDay: getInteger(row.getCell(25))
    })
  })

  return rows
}
