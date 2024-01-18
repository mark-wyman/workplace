import axios from 'axios'
import { readFile } from 'fs/promises'
import { createHmac } from 'crypto'

import type { Graph, Secrets } from './types'
import { GraphError } from '.'

export default async function graph (path: string): Promise<Graph> {
  const data = await readFile(path)
  const secrets = JSON.parse(data.toString('utf-8')) as Secrets

  const instance = axios.create({
    baseURL: 'https://graph.workplace.com',
    headers: {
      'User-Agent': 'Workplace/1.0 (https://github.com/mark-wyman/workplace)'
    },
    params: {
      access_token: secrets.accessToken
    }
  })

  instance.interceptors.request.use(function (config) {
    const time = Math.floor(new Date().getTime() / 1000)

    const appSecretProof = createHmac('sha256', secrets.appSecret)
      .update(`${secrets.accessToken}|${time}`)
      .digest('hex')

    config.params = {
      ...config.params,
      appsecret_proof: appSecretProof,
      appsecret_time: time
    }

    return config
  })

  instance.interceptors.response.use(function (response) {
    return response
  }, async function (error) {
    if (error.response.data?.error?.code !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new GraphError(error.response.data.error)
    }
    throw error
  })

  async function id (id: string): Promise<any> {
    const { data } = await instance.get(`/${id}`)
    return data
  }

  return {
    id
  }
}
