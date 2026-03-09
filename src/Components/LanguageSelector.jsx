import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-[#F1F2F6] rounded-full px-3 py-2 mx-3 cursor-pointer border-none outline-none text-sm"
    >
      <option value="es">🇨🇴 ES</option>
      <option value="en">🇺🇸 EN</option>
    </select>
  )
}

export default LanguageSelector