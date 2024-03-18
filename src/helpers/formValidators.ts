export interface CriteriaCompliment {
  criteria: string
  accomplished: boolean
}

export interface ValidationResults {
  valid: boolean
  criterias: CriteriaCompliment[]
}

const nameValidator = (
  name: string,
  customMinLength?: number
): ValidationResults => {
  return {
    valid: name.length >= (customMinLength ? customMinLength : 3),
    criterias: [
      {
        criteria: 'Error texto demasiado corto',
        accomplished: name.length >= (customMinLength ? customMinLength : 3),
      },
    ],
  }
}

const textEnteredValidator = (
  text: string,
  customMinLength?: number,
  customMaxLength?: number
): ValidationResults => {
  const min = customMinLength ? customMinLength : 1

  const error_length = `(min: ${min} ${
    customMaxLength ? `, max: ${customMaxLength}` : ''
  }) : ${text.length}`

  return {
    valid:
      text.length >= min &&
      (customMaxLength ? text.length <= customMaxLength : true),
    criterias: [
      {
        criteria: 'Error texto no tiene la longitud adecuada ' + error_length,
        accomplished:
          text.length >= (customMinLength ? customMinLength : 1) &&
          (customMaxLength ? text.length <= customMaxLength : true),
      },
    ],
  }
}

const numberEnteredValidator = (
  text: string,
  customMin?: number,
  customMax?: number
): ValidationResults => {
  if (isNumeric(text)) {
    const value = parseFloat(text)

    const min = customMin ? customMin : 1

    const minlength = customMin
    const maxlength = customMax

    const _isValid: boolean =
      (value >= min && (customMax ? value <= customMax : true)) || false

    const error_length = `(min: ${minlength} ${
      customMax ? `, max: ${maxlength}` : ''
    }) : ${text}`

    return {
      valid: _isValid,
      criterias: [
        {
          criteria: 'Error número no está en el rango válido ' + error_length,
          accomplished: _isValid,
        },
      ],
    }
  }

  const minlength = String(customMin).length
  const maxlength = String(customMax).length

  const error_length = `(min: ${minlength} ${
    customMax ? `, max: ${maxlength}` : ''
  }) : ${text.length}`

  return {
    valid: false,
    criterias: [
      {
        criteria: 'Error texto no tiene la logitud adecuada ' + error_length,
        accomplished: false,
      },
    ],
  }
}

const telValidator = (
  text: string,
  customMinLength?: number,
  customMaxLength?: number
): ValidationResults => {
  return {
    valid:
      text.length > (customMinLength ? customMinLength : 7) &&
      (customMaxLength ? text.length <= customMaxLength : true),
    criterias: [
      {
        criteria: 'Error número de telefono no es válido',
        accomplished: text.length > (customMinLength ? customMinLength : 7),
      },
    ],
  }
}

const emailValidator = (email: string): ValidationResults => {
  const emailParent = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const validEmail = emailParent.test(email)

  return {
    valid: validEmail,
    criterias: [
      {
        criteria: 'Error correo electrónico ingresado incorrecto',
        accomplished: validEmail,
      },
    ],
  }
}

const sameTextValidator = (
  text: string,
  altText: string
): ValidationResults => {
  const valid = text === altText

  return {
    valid: valid,
    criterias: [
      {
        criteria: 'Las contraseñas ingresadas no son iguales',
        accomplished: valid,
      },
    ],
  }
}

const passwordValidator = (
  password: string,
  customMinLength?: number
): ValidationResults => {
  let criteriaCompliments: CriteriaCompliment[] = []
  let passwordValid = true

  // Check if the password contains both numbers and letters
  if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    criteriaCompliments.push({
      criteria: 'Debe contener números y letras',
      accomplished: false,
    })
    passwordValid = false
  } else {
    criteriaCompliments.push({
      criteria: 'Debe contener números y letras',
      accomplished: true,
    })
  }

  // Check if the password contains at least one uppercase and one lowercase character
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    criteriaCompliments.push({
      criteria: 'Debe contener al menos una mayuscula y una minuscula',
      accomplished: false,
    })
    passwordValid = false
  } else {
    criteriaCompliments.push({
      criteria: 'Debe contener al menos una mayuscula y una minuscula',
      accomplished: true,
    })
  }

  // Check if the password contains at least 8 characters
  if (password.length < (customMinLength ? customMinLength : 8)) {
    criteriaCompliments.push({
      criteria:
        'Debe contener al menos ' +
        (customMinLength ? customMinLength : 8) +
        ' caracteres',
      accomplished: false,
    })
    passwordValid = false
  } else {
    criteriaCompliments.push({
      criteria:
        'Debe contener al menos ' +
        (customMinLength ? customMinLength : 8) +
        ' caracteres',
      accomplished: true,
    })
  }

  // Check if the password contains at least one special character (#@$!%)
  if (!/[#@$!%]/.test(password)) {
    criteriaCompliments.push({
      criteria: 'Debe contener un caracter especial (#@$!%)',
      accomplished: false,
    })
    passwordValid = false
  } else {
    criteriaCompliments.push({
      criteria: 'Debe contener un caracter especial (#@$!%)',
      accomplished: true,
    })
  }

  return {
    valid: passwordValid,
    criterias: criteriaCompliments,
  }
}

export function isNumeric(input: string): boolean {
  const numericRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/
  return numericRegex.test(input)
}

interface formFieldValidatorProps {
  type:
    | 'name'
    | 'email'
    | 'text-entered'
    | 'password'
    | 'tel'
    | 'number-entered'
    | 'sametext'
  text: string
  customMinLength?: number
  customMaxLength?: number
  altText?: string
}

const formFieldValidator = (
  props: formFieldValidatorProps
): ValidationResults => {
  switch (props.type) {
    case 'name':
      return nameValidator(props.text, props.customMinLength)

    case 'email':
      return emailValidator(props.text)

    case 'password':
      return passwordValidator(props.text, props.customMinLength)

    case 'tel':
      return telValidator(
        props.text,
        props.customMinLength,
        props.customMaxLength
      )

    case 'text-entered':
      return textEnteredValidator(
        props.text,
        props.customMinLength,
        props.customMaxLength
      )

    case 'number-entered':
      return numberEnteredValidator(
        props.text,
        props.customMinLength,
        props.customMaxLength
      )

    case 'sametext':
      return sameTextValidator(props.text, props.altText ?? '')

    default:
      return textEnteredValidator(
        props.text,
        props.customMinLength,
        props.customMaxLength
      )
  }
}

export default formFieldValidator
