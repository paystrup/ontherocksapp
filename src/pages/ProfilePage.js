import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProfilePage() {
  // import copy translations from i18n
  const { t } = useTranslation();
  return (
    <div className='mt-20 px-6'>
      <h2 className='text-2xl font-bold'>
        {t("profilepage.title")}
      </h2>
    </div>
  )
}
