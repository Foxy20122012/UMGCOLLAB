'use client'
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const HomePage =()=>{
  const t = useTranslations('Home')

  return(
    <div className="text-center">
      Hello {t('Home_Page')}
    </div>
  )
}

export default HomePage;