import React from 'react'

const formatDate = (d: Date): string => {
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  // FIXME: the logic below is extremely dirty! Use a library like moment!
  let hour = d.getHours() + ''
  if (hour.length === 1) {
    hour = '0' + hour
  }
  let minutes = d.getMinutes() + ''
  if (minutes.length === 1) {
    minutes = '0' + minutes
  }
  return `${year}/${month}/${date} ${hour}:${minutes}`
}

export default ({ children }) => {
  return <span>{formatDate(new Date(children))}</span>
}
