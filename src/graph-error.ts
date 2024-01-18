export interface GraphErrorAttributes {
  message: string
  type: string
  code: number
  error_subcode: number
  fbtrace_id: string
}

export default class GraphError extends Error {
  public type: string
  public code: number
  public errorSubcode: number
  public fbtraceId: string
  public message: string

  constructor (error: GraphErrorAttributes) {
    super(error.message)

    this.type = error.type
    this.code = error.code
    this.errorSubcode = error.error_subcode
    this.fbtraceId = error.fbtrace_id
    this.message = error.message

    Object.setPrototypeOf(this, GraphError.prototype)
  }
}
