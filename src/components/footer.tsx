import { ThemeSwitcher } from "./theme-switcher";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
<p>
  Powered by{" "}
  <a
    href="https://adm.mohesr.gov.ae/Applicant2025/"
    target="_blank"
    className="font-bold hover:underline"
    rel="noreferrer"
  >
    MOHESR
  </a>
</p>
<ThemeSwitcher />
</footer>
  )
}