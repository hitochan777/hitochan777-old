import React from 'react'

type DateOption = {
  year?: string
  month: string
  day: string
}

const formatDate = (d: Date): string => {
  const options: DateOption = { month: 'short', day: 'numeric' }
  if (d.getFullYear() !== new Date().getFullYear()) {
    options.year = 'numeric'
  }
  return d.toLocaleString('en-us', options)
}

export default ({ children }) => {
  return <span>{formatDate(new Date(children))}</span>
}
