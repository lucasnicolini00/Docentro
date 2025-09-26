export type AppointmentEmailPayload = {
  patientName: string;
  doctorName: string;
  clinicName: string;
  date: string;
  time: string;
  notes?: string;
  status?: "CONFIRMED" | "CANCELED";
};

export type DoctorNotificationPayload = {
  doctorName: string;
  patientName: string;
  clinicName: string;
  date: string;
  time: string;
  notes?: string;
  actionUrl: string;
};

export function appointmentStatusHtml(p: AppointmentEmailPayload) {
  const status = p.status || "CONFIRMED";
  if (status === "CANCELED") {
    return `<!doctype html><html><body style="font-family:sans-serif;background:#f9fafb;padding:24px;"><div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;"><h2 style="color:#ef4444;font-weight:700;font-size:22px;margin-bottom:8px;">Cita cancelada</h2><p style="color:#374151;font-size:16px;margin-bottom:12px;">Hola <strong>${
      p.patientName
    }</strong>,</p><p style="color:#374151;font-size:16px;margin-bottom:18px;">Lamentamos informarte que tu cita con <strong>Dr. ${
      p.doctorName
    }</strong> ha sido <strong style=\"color:#ef4444\">cancelada</strong>.</p><table style=\"width:100%;margin-bottom:20px;\"><tbody><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">Clínica:</td><td style=\"color:#111827;font-weight:500;\">${
      p.clinicName
    }</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">Fecha:</td><td style=\"color:#111827;font-weight:500;\">${
      p.date
    }</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">Hora:</td><td style=\"color:#111827;font-weight:600;\">${
      p.time
    }</td></tr>${
      p.notes
        ? `<tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">Motivo / Notas:</td><td style=\"color:#111827;font-weight:500;\">${p.notes}</td></tr>`
        : ""
    }</tbody></table><div style=\"color:#ef4444;font-weight:700;font-size:15px;margin-bottom:10px;\">Lamentamos los inconvenientes.</div><div style=\"color:#6b7280;font-size:14px;\">Si deseas reprogramar la cita, por favor responde a este correo o comunícate con la clínica para agendar una nueva fecha.</div></div></body></html>`;
  }

  return `<!doctype html><html><body style="font-family:sans-serif;background:#f9fafb;padding:24px;"><div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;"><h2 style="color:#10b981;font-weight:700;font-size:22px;margin-bottom:8px;">${
    status === "CONFIRMED" ? "¡Tu cita ha sido confirmada!" : null
  }</h2><p style="color:#374151;font-size:16px;margin-bottom:24px;">Hola <strong>${
    p.patientName
  }</strong>,<br/>Tu cita con <strong>Dr. ${p.doctorName}</strong> en <strong>${
    p.clinicName
  }</strong>:</p><table style="width:100%;margin-bottom:24px;"><tbody><tr><td style="color:#6b7280;font-weight:600;padding:6px 0;">Fecha:</td><td style="color:#111827;font-weight:500;">${
    p.date
  }</td></tr><tr><td style="color:#6b7280;font-weight:600;padding:6px 0;">Hora:</td><td style="color:#111827;font-weight:500;">${
    p.time
  }</td></tr>${
    p.notes
      ? `<tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">Notas:</td><td style=\"color:#111827;font-weight:500;\">${p.notes}</td></tr>`
      : ""
  }</tbody></table><div style="color:#2563eb;font-weight:600;font-size:16px;margin-bottom:12px;">${
    status === "CONFIRMED" ? "¡Te esperamos!" : null
  }</div><div style="color:#6b7280;font-size:14px;">Si tienes dudas, responde a este correo o comunícate con la clínica.</div></div></body></html>`;
}

export function doctorNotificationHtml(p: DoctorNotificationPayload) {
  return `<!doctype html><html><body style="font-family:sans-serif;background:#f9fafb;padding:24px;"><div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;"><h2 style="color:#2563eb;font-weight:700;font-size:22px;margin-bottom:8px;">Nueva solicitud de cita</h2><p style="color:#374151;font-size:16px;margin-bottom:24px;">Hola <strong>Dr. ${
    p.doctorName
  }</strong>,<br/>El paciente <strong>${
    p.patientName
  }</strong> ha solicitado una cita en <strong>${
    p.clinicName
  }</strong>.</p><table style="width:100%;margin-bottom:24px;"><tbody><tr><td style="color:#6b7280;font-weight:600;padding:6px 0;">Fecha:</td><td style="color:#111827;font-weight:500;">${
    p.date
  }</td></tr><tr><td style="color:#6b7280;font-weight:600;padding:6px 0;">Hora:</td><td style="color:#111827;font-weight:500;">${
    p.time
  }</td></tr>${
    p.notes
      ? `<tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">Notas:</td><td style=\"color:#111827;font-weight:500;\">${p.notes}</td></tr>`
      : ""
  }</tbody></table><div style="color:#2563eb;font-weight:600;font-size:16px;margin-bottom:16px;">Por favor, ingresa al sistema para aprobar o rechazar esta cita.</div><a href="${
    p.actionUrl
  }" style="display:inline-block;background:#2563eb;color:#fff;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:16px;margin-bottom:12px;">Ir al sistema</a><div style="color:#6b7280;font-size:14px;margin-top:16px;">Si tienes dudas, comunícate con la clínica.</div></div></body></html>`;
}
