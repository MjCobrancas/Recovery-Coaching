'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getFilterCoaching<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()
  
    const resp = await fetch(
      `${process.env.BACKEND_DOMAIN}/get-filter-coaching`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: JSON.stringify(object)
    })
      .then(async (value: any) => {
        const data = await value.json()
  
        if (data.length == 0) {
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