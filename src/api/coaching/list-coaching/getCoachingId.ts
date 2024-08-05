'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICoachingAll } from "@/interfaces/coaching/list-coaching/ListCoaching"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCoachingById(id: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-coaching/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data as ICoachingAll,
                status: true
            }
        })
        .catch(() => {
            return {
                data: null,
                status: false
            }
        })

    return resp
}