'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createCoaching<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/create-coaching`, {
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

        if (data.message != "Created") {
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