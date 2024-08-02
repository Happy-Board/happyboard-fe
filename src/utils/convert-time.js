export const convertTime = (originTime) => {
  const date = new Date(originTime)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  const hours = String(date.getUTCHours() + 7).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  // const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  // Format: hh:mm:ss dd/MM/yyyy
  const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`
  return formattedDate
}

export const convertTime1 = (originTime) => {
  console.log(originTime)
  const endDate = Date.now()
  const startDate = new Date(originTime).getTime()
  console.log('diff ::: ', endDate - startDate)
  const differenceInMilliseconds = endDate - startDate
  //   const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60))
  const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60))
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
  // const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  // Format: hh:mm:ss dd/MM/yyyy
  if (differenceInDays !== 0) {
    return `${differenceInDays}d`
  } else if (differenceInHours !== 0) {
    return `${differenceInHours}h`
  } else if (differenceInMinutes !== 0) {
    return `${differenceInMinutes}m`
  } else {
    return 'now'
  }
}
