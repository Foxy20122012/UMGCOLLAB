import { ITokenRefreshResponse } from '../endpoints/token/interfaces/ITokenRefreshResponse'

export class ApiService {
  BaseUrl: string
  ApiKey: string
  AuthToken?: string
  checkTokenValidation: () => Promise<ITokenRefreshResponse | undefined>

  constructor(
    baseUrl: string,
    apiKey: string,
    checkTokenValidation: () => Promise<ITokenRefreshResponse | undefined>,
    authToken?: string
  ) {
    this.BaseUrl = baseUrl
    this.ApiKey = apiKey
    this.AuthToken = authToken
    this.checkTokenValidation = checkTokenValidation
  }

  updateTokenData(
    apiKey: string,
    checkTokenValidation: () => Promise<ITokenRefreshResponse | undefined>,
    authToken?: string
  ) {
    this.ApiKey = apiKey
    this.AuthToken = authToken
    this.checkTokenValidation = checkTokenValidation
  }

  async validateToken() {
    try {
      const _newToken = await this.checkTokenValidation()
      if (_newToken) {
        this.AuthToken = _newToken.authToken
      }
    } catch (err) {}
  }
}
