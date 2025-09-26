// Email to doctor: notify of new appointment to approve/deny
interface DoctorNotificationEmailProps {
  doctorName: string;
  patientName: string;
  clinicName: string;
  date: string;
  time: string;
  notes?: string;
  actionUrl: string; // Link to system for approval/denial
}

interface AppointmentEmailProps {
  patientName: string;
  doctorName: string;
  clinicName: string;
  date: string; // formatted date string
  time: string; // formatted time string
  notes?: string;
  status?: "CONFIRMED" | "CANCELED";
}

export function DoctorNewAppointmentEmail({
  doctorName,
  patientName,
  clinicName,
  date,
  time,
  notes,
  actionUrl,
}: DoctorNotificationEmailProps) {
  return (
    <div
      style={{ fontFamily: "sans-serif", background: "#f9fafb", padding: 24 }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #0001",
          padding: 32,
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 8,
          }}
        >
          Nueva solicitud de cita
        </h2>
        <p style={{ color: "#374151", fontSize: 16, marginBottom: 24 }}>
          Hola <b>Dr. {doctorName}</b>,<br />
          El paciente <b>{patientName}</b> ha solicitado una cita en{" "}
          <b>{clinicName}</b>.
        </p>
        <table style={{ width: "100%", marginBottom: 24 }}>
          <tbody>
            <tr>
              <td
                style={{ color: "#6b7280", fontWeight: 600, padding: "6px 0" }}
              >
                Fecha:
              </td>
              <td style={{ color: "#111827", fontWeight: 500 }}>{date}</td>
            </tr>
            <tr>
              <td
                style={{ color: "#6b7280", fontWeight: 600, padding: "6px 0" }}
              >
                Hora:
              </td>
              <td style={{ color: "#111827", fontWeight: 500 }}>{time}</td>
            </tr>
            {notes && (
              <tr>
                <td
                  style={{
                    color: "#6b7280",
                    fontWeight: 600,
                    padding: "6px 0",
                  }}
                >
                  Notas:
                </td>
                <td style={{ color: "#111827", fontWeight: 500 }}>{notes}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div
          style={{
            color: "#2563eb",
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 16,
          }}
        >
          Por favor, ingresa al sistema para aprobar o rechazar esta cita.
        </div>
        <a
          href={actionUrl}
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            padding: "12px 28px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 16,
            marginBottom: 12,
          }}
        >
          Ir al sistema
        </a>
        <div style={{ color: "#6b7280", fontSize: 14, marginTop: 16 }}>
          Si tienes dudas, comunícate con la clínica.
        </div>
      </div>
    </div>
  );
}

// Email to patient: appointment status update (confirmed, canceled, completed, pending)
export function AppointmentStatusUpdateEmail({
  patientName,
  doctorName,
  clinicName,
  date,
  time,
  notes,
  status = "CONFIRMED",
}: AppointmentEmailProps) {
  const statusColor = {
    CONFIRMED: "#10b981",
    CANCELED: "#ef4444",
    COMPLETED: "#3b82f6",
    PENDING: "#f59e0b",
  }[status];

  return (
    <div
      style={{ fontFamily: "sans-serif", background: "#f9fafb", padding: 24 }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #0001",
          padding: 32,
        }}
      >
        <div
          style={{
            color: statusColor,
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 12,
          }}
        >
          {status === "CONFIRMED" ? (
            <>
              <p style={{ color: "#374151", fontSize: 16, marginBottom: 24 }}>
                Hola <b>{patientName}</b>,<br />
                Tu cita con <b>Dr. {doctorName}</b> ha sido Aceptada.
              </p>
              <table style={{ width: "100%", marginBottom: 24 }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        color: "#6b7280",
                        fontWeight: 600,
                        padding: "6px 0",
                      }}
                    >
                      Clínica:
                    </td>
                    <td style={{ color: "#111827", fontWeight: 500 }}>
                      {clinicName}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        color: "#6b7280",
                        fontWeight: 600,
                        padding: "6px 0",
                      }}
                    >
                      Fecha:
                    </td>
                    <td style={{ color: "#111827", fontWeight: 500 }}>
                      {date}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        color: "#6b7280",
                        fontWeight: 600,
                        padding: "6px 0",
                      }}
                    >
                      Hora:
                    </td>
                    <td style={{ color: "#111827", fontWeight: 500 }}>
                      {time}
                    </td>
                  </tr>
                  {notes && (
                    <tr>
                      <td
                        style={{
                          color: "#6b7280",
                          fontWeight: 600,
                          padding: "6px 0",
                        }}
                      >
                        Notas:
                      </td>
                      <td style={{ color: "#111827", fontWeight: 500 }}>
                        {notes}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : status === "CANCELED" ? (
            <>
              <p style={{ color: "#374151", fontSize: 16, marginBottom: 12 }}>
                Hola <b>{patientName}</b>,
              </p>
              <p style={{ color: "#374151", fontSize: 16, marginBottom: 18 }}>
                Lamentamos informarte que tu cita con <b>Dr. {doctorName}</b> ha
                sido <b style={{ color: "#ef4444" }}>cancelada</b>.
              </p>

              <table style={{ width: "100%", marginBottom: 20 }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        color: "#6b7280",
                        fontWeight: 600,
                        padding: "6px 0",
                      }}
                    >
                      Clínica:
                    </td>
                    <td style={{ color: "#111827", fontWeight: 500 }}>
                      {clinicName}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        color: "#6b7280",
                        fontWeight: 600,
                        padding: "6px 0",
                      }}
                    >
                      Fecha:
                    </td>
                    <td style={{ color: "#111827", fontWeight: 500 }}>
                      {date}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        color: "#6b7280",
                        fontWeight: 600,
                        padding: "6px 0",
                      }}
                    >
                      Hora:
                    </td>
                    <td style={{ color: "#111827", fontWeight: 500 }}>
                      {time}
                    </td>
                  </tr>
                  {notes && (
                    <tr>
                      <td
                        style={{
                          color: "#6b7280",
                          fontWeight: 600,
                          padding: "6px 0",
                        }}
                      >
                        Motivo / Notas:
                      </td>
                      <td style={{ color: "#111827", fontWeight: 500 }}>
                        {notes}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div
                style={{
                  color: "#ef4444",
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                Lamentamos los inconvenientes.
              </div>

              <div style={{ color: "#6b7280", fontSize: 14 }}>
                Si deseas reprogramar la cita, por favor responde a este correo
                o comunícate con la clínica para agendar una nueva fecha.
              </div>
            </>
          ) : null}
        </div>
        {status === "CONFIRMED" && (
          <>
            <div
              style={{
                color: "#2563eb",
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              Por favor, preséntate 10 minutos antes de tu cita.
            </div>
            <div style={{ color: "#6b7280", fontSize: 14 }}>
              Si tienes dudas o necesitas reprogramar, responde a este correo o
              comunícate con la clínica.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
