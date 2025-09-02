import Image from "next/image";

export default function Search() {
  return (
    // <div className="flex justify-center items-center">
    //   <div className="grid grid-cols-2 bg-white w-[1000px] gap-4 p-4">
    //     <div className="col-span-1 border-r-[.5px] border-gray-400 ">
    //       <div className="flex flex-row">
    //         <div>
    //           <Image src="/globe.svg" alt="Logo" width={50} height={50} />
    //         </div>
    //         <div className="flex flex-col">
    //           <span className="font-bold text-lg">Lucas Nicolini</span>
    //           <span className="text-sm">Psicólogo</span>
    //           <span className="text-sm underline">ver mas</span>
    //           <span className="text-sm">⭐️⭐️⭐️⭐️⭐️ 22 opiniones</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-col ">
    //         <div className="flex flex-col">
    //           <span className="text-base">
    //             Avenida Duarte Quirós, Córdoba Capital • Mapa
    //           </span>
    //           <span className="text-sm">Consultorio Lic Martin serafini</span>
    //         </div>
    //         <div className=" ">
    //           <span className="text-base"> Psicologa</span>
    //           <span className="text-base">$1000</span>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-span-1 flex items-center justify-center">
    //       <span>calendar</span>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 flex gap-6">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/globe.svg"
            alt="Lucía Ramos"
            width={50}
            height={50}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">
              Lic. Lucía Ramos <span className="text-green-500">✔️</span>
            </h2>
            <p className="text-sm text-gray-500">
              Psicólogo{" "}
              <a href="#" className="text-blue-500 underline">
                Ver más
              </a>
            </p>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              ⭐⭐⭐⭐⭐
              <span className="text-gray-500 ml-1">127 opiniones</span>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <h3 className="font-semibold mb-1">Dirección</h3>
          <p className="text-gray-500">
            📍 Córdoba Capital ·{" "}
            <a href="#" className="text-blue-500 underline">
              Mapa
            </a>
          </p>
          <a href="#" className="text-blue-500 text-xs underline">
            Ver calendario EN LÍNEA
          </a>
        </div>

        <div className="mt-auto text-sm">
          <p className="flex justify-between items-center border-t pt-2">
            <span className="text-gray-600">Consulta en línea</span>
            <span className="font-semibold">$ 70.000</span>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 grid grid-cols-4 gap-4 text-center text-sm">
        {[
          { day: "Hoy", date: "9 Jul", times: [] },
          { day: "Mañana", date: "10 Jul", times: ["00:00"] },
          { day: "Vie", date: "11 Jul", times: ["00:00"] },
          { day: "Sáb", date: "12 Jul", times: ["00:00"] },
        ].map(({ day, date, times }, i) => (
          <div key={i} className="rounded-lg p-2">
            <div className="font-semibold">{day}</div>
            <div className="text-gray-500 mb-2">{date}</div>
            {times.length > 0 ? (
              times.map((t, j) => (
                <div
                  key={j}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded mb-1"
                >
                  {t}
                </div>
              ))
            ) : (
              <div className="text-gray-400">-</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
