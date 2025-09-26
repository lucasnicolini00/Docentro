"use server";

import { Resend } from "resend";
import type { ActionResult } from "./utils";
import {
  appointmentStatusHtml,
  doctorNotificationHtml,
  type AppointmentEmailPayload,
  type DoctorNotificationPayload,
} from "../email-templates.server";

// const FROM_ADDRESS =
//   process.env.EMAIL_FROM || "Docentro <no-reply@docentro.app>";

function ensureApiKey(): string | ActionResult {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { success: false, error: "RESEND_API_KEY no configurada" };
  return key;
}

async function sendEmailRaw(
  to: string | string[],
  subject: string,
  html: string
) {
  const keyCheck = ensureApiKey();
  if (typeof keyCheck !== "string") return keyCheck;

  const resend = new Resend(keyCheck);
  //TODO. configurate a domain to send real emails
  const { data } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "contact.docentro@gmail.com",
    subject,
    html,
  });
  return { success: true, data } as ActionResult;
}

export async function sendAppointmentStatusUpdateEmail(
  to: string,
  payload: AppointmentEmailPayload
): Promise<ActionResult> {
  try {
    const html = appointmentStatusHtml(payload);
    return await sendEmailRaw(to, "Actualización de cita - Docentro", html);
  } catch (error) {
    console.error("sendAppointmentStatusUpdateEmail error:", error);
    return { success: false, error: "Error enviando correo de actualización" };
  }
}

export async function sendDoctorNewAppointmentEmail(
  to: string,
  payload: DoctorNotificationPayload
): Promise<ActionResult> {
  try {
    const html = doctorNotificationHtml(payload);
    return await sendEmailRaw(to, "Nueva solicitud de cita - Docentro", html);
  } catch (error) {
    console.error("sendDoctorNewAppointmentEmail error:", error);
    return { success: false, error: "Error enviando correo al doctor" };
  }
}
