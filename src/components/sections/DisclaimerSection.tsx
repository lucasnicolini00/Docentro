"use client";

export default function DisclaimerSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 leading-snug">
        <h2 className="text-xl font-bold text-gray-600 mb-2">
          {" "}
          Información Importante
        </h2>
        <p className="mb-3 text-gray-600">
          Conoce cómo funciona nuestra plataforma y nuestras responsabilidades
        </p>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-600">
              Plataforma de Conexión Médica
            </h3>
            <p>
              <strong>Docentro</strong> es una plataforma digital que facilita
              la conexión entre profesionales de la salud y pacientes en
              Bolivia. Nuestro objetivo es simplificar el proceso de búsqueda y
              agendamiento de citas médicas, proporcionando una herramienta
              eficiente y confiable para ambas partes.
            </p>
            <p>
              Como intermediario tecnológico, nos enfocamos exclusivamente en
              facilitar el contacto inicial y la gestión de citas entre médicos
              y pacientes. La plataforma no interviene en la prestación de
              servicios médicos ni en la relación profesional que se establece
              entre el médico y el paciente.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">
              Política de Pagos y Facturación
            </h3>
            <p>
              <strong>Importante:</strong> Docentro <strong>NO</strong> procesa,
              gestiona ni se hace responsable de los pagos por servicios
              médicos. Todos los aspectos financieros relacionados con las
              consultas médicas son manejados directamente entre el profesional
              de la salud y el paciente.
            </p>
            <p className="ml-2">
              * Los precios mostrados son únicamente informativos y
              proporcionados por los profesionales
              <br />
              * Los métodos de pago son acordados directamente con cada médico
              <br />
              * Las facturas y comprobantes son emitidos por el profesional de
              la salud
              <br />* Cualquier disputa de pago debe resolverse directamente con
              el médico
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-600">
              Responsabilidades y Limitaciones
            </h3>
            <div className="flex flex-row mb-4">
              <div className="mr-10 col-auto">
                <p className="font-medium">Lo que SÍ hacemos:</p>
                <p className="ml-2">
                  * Facilitar la búsqueda de profesionales
                  <br />
                  * Gestionar el agendamiento de citas
                  <br />
                  * Verificar credenciales básicas
                  <br />
                  * Proporcionar información de contacto
                  <br />* Mantener la plataforma funcionando
                </p>
              </div>
              <div className="mr-10 col-auto">
                <p className="font-medium mt-1">Lo que NO hacemos:</p>
                <p className="ml-2">
                  * Procesar pagos médicos
                  <br />
                  * Supervisar tratamientos médicos
                  <br />
                  * Garantizar resultados médicos
                  <br />
                  * Intervenir en diagnósticos
                  <br />* Mediar en disputas médicas
                </p>
              </div>
            </div>
            <p className="text-gray-500 mt-1">
              <strong>Nota Legal:</strong> Al utilizar Docentro, el usuario
              acepta que la plataforma actúa únicamente como intermediario
              tecnológico. Toda responsabilidad médica, ética y legal recae
              exclusivamente en los profesionales de la salud registrados y sus
              respectivos colegios profesionales.
            </p>
          </div>

          {/* <p className="text-gray-500 pt-1">
            ¿Tienes preguntas sobre nuestra plataforma?{" "}
            <a
              href="mailto:soporte@docentro.com"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contáctanos
            </a>
          </p> */}
        </div>
      </div>
    </section>
  );
}
