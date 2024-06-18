'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getDashCoachingItems() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
      `${process.env.BACKEND_DOMAIN}/get-coaching-dashboard-items`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      }
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
          data: data as [[number[]], string[], [string[]], number],
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