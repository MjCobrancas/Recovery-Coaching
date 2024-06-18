'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getFilterDashItems<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
      `${process.env.BACKEND_DOMAIN}/get-filter-dashboard-items`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: JSON.stringify(object)
    })
      .then(async (value) => {
        const data = await value.json()
    
        if (data.length == 0 || data == null) {
          return {
            data: null,
            status: false,
          }
        }
  
        return {
          data: data,
          status: true,
        }
      })
      .catch((error) => {
        return {
          data: null,
          status: false
        }
      })
  
    return resp
  }