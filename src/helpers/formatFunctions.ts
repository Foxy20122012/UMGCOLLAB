export function formatNumber(number: number, decilams?: number): string {
  if (isNaN(number) || typeof number !== 'number') {
    return 'Invalid Input'
  }

  const formattedNumber = number.toFixed(decilams ?? 2)

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatToPercentage(number: number): string {
  if (isNaN(number) || typeof number !== 'number') {
    return 'Invalid Input'
  }

  const formattedNumber = (number * 100).toFixed(2)

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%'
}
