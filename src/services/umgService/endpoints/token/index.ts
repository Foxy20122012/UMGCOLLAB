import { ApiService } from '../../commonInterfaces/ApiService'
import { ITokenRefreshResponse } from './interfaces/ITokenRefreshResponse'

class TokenService extends ApiService {
  constructor(
    baseUrl: string,
    apiKey: string,
    checkTokenValidation: () => Promise<ITokenRefreshResponse | undefined>,
    authToken?: string
  ) {
    super(baseUrl, apiKey, checkTokenValidation, authToken)
  }

  REFRESH_TOKEN = async (
    userId: string,
    refreshToken: string
  ): Promise<ITokenRefreshResponse> => {
    try {
      const data = await fetch(this.BaseUrl + '/auth/refresh-token', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-TOKEN-KEY': this.ApiKey,
        },
        body: JSON.stringify({
          userId: userId,
          refreshToken: refreshToken,
        }),
      })

      if (data.status !== 200) {
        const res = await data.json()
        return Promise.reject(res.message)
      }

      const _res: any = await data.json()

      const res: ITokenRefreshResponse = {
        authToken: _res.jwt,
        expTime: _res.expTime,
        refreshToken: _res.refreshToken,
      }
      return res
    } catch (err: any) {
      return Promise.reject('ERROR: ' + JSON.stringify(err))
    }
  }
}

export default TokenService
