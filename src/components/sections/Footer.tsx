import { getT } from "@/lib/getT";

export default async function Footer() {
  const t = await getT("footer");
  const companyDescription = t("companyDescription");
  const quickLinksTitle = t("quickLinksTitle");
  const quickLinks = (await t.raw("quickLinks")) as string[];
  const copyright = t("copyright");
  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🩺 Docentro
            </div>
            <p className="text-gray-300 mb-6 max-w-md">{companyDescription}</p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                📘
              </button>
              <button className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                🐦
              </button>
              <button className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                📷
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{quickLinksTitle}</h3>
            <ul className="space-y-2">
              {Array.isArray(quickLinks) &&
                quickLinks.map((link: string, idx: number) => (
                  <li key={idx}>
                    <a
                      href={
                        idx === 0
                          ? "#"
                          : idx === 1
                            ? "#especialidades"
                            : "#profesionales"
                      }
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
