import React from 'react'
import { NextPage, NextPageContext } from 'next'

type Props = {
  statusCode: number
  message?: string
}

const ServerErrorPage: NextPage<Props> = (props: Props) => {
  return (
    <div>
      500
      <div>{props.statusCode}</div>
    </div>
  )
}

export default ServerErrorPage
