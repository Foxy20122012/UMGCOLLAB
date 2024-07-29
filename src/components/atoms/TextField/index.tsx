import { useCallback, useMemo, useState } from 'react'
import ActionButton from '../ActionButton'
import { isNumeric } from '../../../helpers/formValidators'
//import { isNumeric } from '@/helpers/formValidators'
import { useTranslations } from 'next-intl'
import IconEyeClosed from "../../../assets/images/buttons/icon_eye_closed_grey.png"
import IconEyeOpened from "../../../assets/images/buttons/icon_eye_open_grey.png"


export interface TextFieldProps {
  placeholder: string
  value: string
  setValue: (value: string) => void
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'date'
    | 'datetime-local'
  hasError?: boolean
  disabled?: boolean
  readOnly?: boolean
  onKeyDown?: (e: any) => void
  className?: string
  textCentered?: boolean
  prefix?: {
    text: string
    className?: string
  }
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  avoidPastDates?: boolean
  autoRemoveSpaces?: boolean
}

const TextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const today = useMemo(() => {
    return new Date().toISOString().slice(0, 16)
  }, [])

  const handleSetValue = useCallback(
    (val: string) => {
      if (!props.setValue) {
        return
      }

      if (props.type === 'number') {
        if (isNumeric(val)) {
          if (props.min) {
            if (Number(val) >= props.min) {
              if (props.max) {
                if (Number(val) <= props.max) {
                  props.setValue(val)
                } else {
                  props.setValue(String(props.max))
                }
              } else {
                props.setValue(val)
              }
            } else {
              props.setValue(String(props.min))
            }
          } else if (props.max) {
            if (Number(val) <= props.max) {
              props.setValue(val)
            } else {
              props.setValue(String(props.max))
            }
          } else {
            props.setValue(val)
          }
        }
      } else {
        props.setValue(props.autoRemoveSpaces ? val.replaceAll(' ', '') : val)
      }
    },
    [props]
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [setIsFocused])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [setIsFocused])

  return (
    <div className={`w-full ${props.className} relative flex flex-row `}>
      {props.prefix && (
        <div
          className={`flex px- py-0 rounded-lg border ${
            isFocused ? 'border-secondary' : 'border-grey-500'
          } border-l-1 border-t-1 border-b-1 border-r-0  rounded-r-none rounded-l-2`}
        >
          <div className={`${props.prefix.className}`}>{props.prefix.text}</div>
        </div>
      )}
      <input
        className={`
          w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-secondary 
          ${props.disabled ? 'text-opaque1 bg-background1' : 'text-title'}
          ${props.hasError ? ' border-error' : ' border-grey-500'}
          ${props.textCentered ? 'text-center' : ''}
          ${props.prefix ? `border-l-0 rounded-l-none` : ''}
        `}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={
          props.type === 'password'
            ? showPassword
              ? 'text'
              : 'password'
            : props.type
        }
        placeholder={props.placeholder}
        onChange={(event: any) => {
          handleSetValue(event.target.value)
        }}
        value={props.value}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onKeyDown={props.onKeyDown}
        min={props.min ? props.min : props.avoidPastDates ? today : undefined}
        max={props.max}
        minLength={props.minLength}
        maxLength={props.maxLength}
      />
      {props.type === 'password' && (
        <div className="absolute right-[10px] top-[-1px] opacity-40">
          <ActionButton
            title=""
            rightIcon={showPassword ? IconEyeClosed : IconEyeOpened}
            onClick={() => setShowPassword(!showPassword)}
            type={'transparent'}
          />
        </div>
      )}
    </div>
  )
}

export default TextField
