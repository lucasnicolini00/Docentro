import { getTranslations } from "next-intl/server";
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

export async function appointmentStatusHtml(p: AppointmentEmailPayload) {
  const t = await getTranslations("email.appointmentStatus");
  const status = p.status || "CONFIRMED";
  if (status === "CANCELED") {
    return `<!doctype html><html><body style=\"font-family:sans-serif;background:#f9fafb;padding:24px;\"><div style=\"max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;\"><h2 style=\"color:#ef4444;font-weight:700;font-size:22px;margin-bottom:8px;\">${t("canceledTitle")}</h2><p style=\"color:#374151;font-size:16px;margin-bottom:12px;\">${t("greeting", { name: p.patientName })}</p><p style=\"color:#374151;font-size:16px;margin-bottom:18px;\">${t("canceledText", { doctor: p.doctorName })}</p><table style=\"width:100%;margin-bottom:20px;\"><tbody><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("clinicLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.clinicName}</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("dateLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.date}</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("timeLabel")}</td><td style=\"color:#111827;font-weight:600;\">${p.time}</td></tr>${p.notes ? `<tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("notesLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.notes}</td></tr>` : ""}</tbody></table><div style=\"color:#ef4444;font-weight:700;font-size:15px;margin-bottom:10px;\">${t("apologyText")}</div><div style=\"color:#6b7280;font-size:14px;\">${t("rescheduleText")}</div></div></body></html>`;
  }

  return `<!doctype html><html><body style=\"font-family:sans-serif;background:#f9fafb;padding:24px;\"><div style=\"max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;\"><h2 style=\"color:#10b981;font-weight:700;font-size:22px;margin-bottom:8px;\">${t("confirmedTitle")}</h2><p style=\"color:#374151;font-size:16px;margin-bottom:24px;\">${t("greeting", { name: p.patientName })}<br/>${t("confirmedText", { doctor: p.doctorName })}</p><table style=\"width:100%;margin-bottom:24px;\"><tbody><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("clinicLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.clinicName}</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("dateLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.date}</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("timeLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.time}</td></tr>${p.notes ? `<tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("notesLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.notes}</td></tr>` : ""}</tbody></table><div style=\"color:#2563eb;font-weight:600;font-size:16px;margin-bottom:12px;\">${t("waitingText")}</div><div style=\"color:#6b7280;font-size:14px;\">${t("questionsText")}</div></div></body></html>`;
  // ...function ends here, no extra brace
}

export async function doctorNotificationHtml(p: DoctorNotificationPayload) {
  const t = await getTranslations("email.doctorNotification");
  return `<!doctype html><html><body style=\"font-family:sans-serif;background:#f9fafb;padding:24px;\"><div style=\"max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;\"><h2 style=\"color:#2563eb;font-weight:700;font-size:22px;margin-bottom:8px;\">${t("newRequestTitle")}</h2><p style=\"color:#374151;font-size:16px;margin-bottom:24px;\">${t("greeting", { doctor: p.doctorName })}<br/>${t("requestText", { patient: p.patientName, clinic: p.clinicName })}</p><table style=\"width:100%;margin-bottom:24px;\"><tbody><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("dateLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.date}</td></tr><tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("timeLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.time}</td></tr>${p.notes ? `<tr><td style=\"color:#6b7280;font-weight:600;padding:6px 0;\">${t("notesLabel")}</td><td style=\"color:#111827;font-weight:500;\">${p.notes}</td></tr>` : ""}</tbody></table><div style=\"color:#2563eb;font-weight:600;font-size:16px;margin-bottom:16px;\">${t("approvalInstruction")}</div><a href=\"${p.actionUrl}\" style=\"display:inline-block;background:#2563eb;color:#fff;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:16px;margin-bottom:12px;\">${t("systemButton")}</a><div style=\"color:#6b7280;font-size:14px;margin-top:16px;\">${t("questionsText")}</div></div></body></html>`;
  // ...function ends here, no extra brace
}
