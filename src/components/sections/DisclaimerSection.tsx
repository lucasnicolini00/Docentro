import { getT } from "@/lib/getT";

export default async function DisclaimerSection({
  locale,
}: {
  locale: string;
}) {
  const t = await getT("disclaimer", locale);
  const paymentsBullets = t.raw("paymentsBullets") as string[];
  const yesBullets = t.raw("yesBullets") as string[];
  const noBullets = t.raw("noBullets") as string[];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 leading-snug">
        <h2 className="text-xl font-bold text-gray-600 mb-2">
          {t("sectionTitle")}
        </h2>
        <p className="mb-3 text-gray-600">{t("sectionDescription")}</p>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-600">
              {t("platformTitle")}
            </h3>
            <p>{t("platformText1")}</p>
            <p>{t("platformText2")}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">
              {t("paymentsTitle")}
            </h3>
            <p>{t("paymentsText")}</p>
            <ul className="ml-2 list-disc">
              {paymentsBullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">
              {t("responsibilitiesTitle")}
            </h3>
            <div className="flex flex-row mb-4">
              <div className="mr-10 col-auto">
                <p className="font-medium">{t("yesTitle")}</p>
                <ul className="ml-2 list-disc">
                  {yesBullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mr-10 col-auto">
                <p className="font-medium mt-1">{t("noTitle")}</p>
                <ul className="ml-2 list-disc">
                  {noBullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-500 mt-1">{t("legalNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
