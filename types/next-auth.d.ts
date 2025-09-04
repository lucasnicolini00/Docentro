import { $Enums } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: $Enums.UserRole;
      doctorId?: string | null;
      patientId?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: $Enums.UserRole;
    doctorId?: string | null;
    patientId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: $Enums.UserRole;
    doctorId?: string | null;
    patientId?: string | null;
  }
}
