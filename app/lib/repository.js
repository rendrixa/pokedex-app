"use server"

import { decryptApiKey, decryptDefault } from "./helpers"

export async function getData(url, params) {
  const decryptKey = decryptApiKey(params?.data?.key)
  if (decryptKey === "RendrixApp") {
    const getUrl = decryptDefault(url)
    const response = await fetch(process.env.BASE_URL_API + getUrl, {
      method: 'GET',
    }).then(res => {
      if (!res.ok) {
        return {
          code: res?.status,
          info: `Something Went Wrong | ${res?.statusText}`,
          data: null,
        }
      }
      return res.json()
    })
      .catch(err => ({
        code: '-5',
        info: `Something Went Wrong ${err}`,
        data: null,
      }))

    const data = await response
    return {
      code: '0',
      info: 'Success Get Data',
      data: data,
    }
  }
  return {
    code: '-3',
    info: 'Something Went Wrong [KEY]',
    data: null,
  }
}