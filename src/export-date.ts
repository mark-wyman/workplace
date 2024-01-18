import { padDate } from './utils'

export default class ExportDate {
  private readonly year: number = 0
  private readonly month: number = 0
  private readonly day: number = 0
  private readonly valid: boolean = false

  constructor (date: string | undefined) {
    if (date === undefined) {
      this.valid = false
      return
    }

    if (date.length !== 10) {
      this.valid = false
      return
    }

    const [year, month, day] = date.split('-')

    this.year = parseInt(year, 10)
    this.month = parseInt(month, 10)
    this.day = parseInt(day, 10)
    this.valid = true
  }

  equals (other: ExportDate): boolean {
    if (!this.valid) throw new Error('Original Date is not valid')
    if (!other.valid) throw new Error('Comparison Date is not valid')

    return this.year === other.year && this.month === other.month && this.day === other.day
  }

  anniversary (other: ExportDate): number {
    if (!this.valid) throw new Error('Original Date is not valid')
    if (!other.valid) throw new Error('Comparison Date is not valid')

    if (this.month === other.month && this.day === other.day) return this.year - other.year

    return 0
  }

  isValid (): boolean {
    return this.valid
  }

  toString (): string {
    if (!this.valid) return ''
    return `${this.year}-${padDate(this.month)}-${padDate(this.day)}`
  }
}
