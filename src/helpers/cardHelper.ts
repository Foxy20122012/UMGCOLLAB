export function getCardType(
  cardNumber: string
): 'VISA' | 'MASTERCARD' | 'OTHER' {
  const visaRegex = /^4/
  const mastercardRegex = /^([25])/

  if (visaRegex.test(cardNumber)) {
    return 'VISA'
  } else if (mastercardRegex.test(cardNumber)) {
    return 'MASTERCARD'
  } else {
    return 'OTHER'
  }
}
