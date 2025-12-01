import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { $Enums, type Prisma } from "@prisma/client";

// Types for authentication
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  userType: "patient" | "doctor";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: $Enums.UserRole;
  } | null;
  error?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in your existing User table
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            doctor: true,
            patient: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        // Return user data that will be available in session
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          doctorId: user.doctor?.id || null,
          patientId: user.patient?.id || null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    async jwt({ token, user, trigger, account }) {
      // Add your custom fields to JWT
      if (user) {
        token.role = user.role;
        token.doctorId = user.doctorId;
        token.patientId = user.patientId;
      }
      // Store rememberMe flag from credentials on first login
      if (trigger === "signIn" && account?.provider === "credentials") {
        const credentials = account as any;
        token.rememberMe = credentials.rememberMe === "true";
      }
      return token;
    },

    async session({ session, token }) {
      // Make role and IDs available in session
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as $Enums.UserRole;
        session.user.doctorId = token.doctorId as string | null;
        session.user.patientId = token.patientId as string | null;
      }
      // Set session maxAge based on rememberMe
      if (token.rememberMe) {
        session.expires = new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(); // 30 days
      } else {
        session.expires = new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(); // 1 day
      }
      return session;
    },
  },

  // Custom pages - use locale detection for dynamic redirect
  pages: {
    signIn: "/login", // Will be handled by middleware locale detection
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Register a new user
export async function registerUser(data: RegisterData): Promise<AuthResult> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Ya existe una cuenta con este correo electrónico",
        error: "USER_EXISTS",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Determine user role
    const role =
      data.userType === "doctor"
        ? $Enums.UserRole.DOCTOR
        : $Enums.UserRole.PATIENT;

    // Create user in a transaction
    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // Create the user
        const user = await tx.user.create({
          data: {
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            role: role,
          },
        });

        // Create corresponding profile based on user type
        if (data.userType === "patient") {
          await tx.patient.create({
            data: {
              userId: user.id,
            },
          });
        } else if (data.userType === "doctor") {
          await tx.doctor.create({
            data: {
              userId: user.id,
            },
          });
        }

        return user;
      }
    );

    return {
      success: true,
      message: "Cuenta creada exitosamente",
      user: {
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        role: result.role,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Error al crear la cuenta. Intenta nuevamente.",
      error: "REGISTRATION_FAILED",
    };
  }
}

// Login user
export async function loginUser(data: LoginData): Promise<AuthResult> {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        success: false,
        message: "Credenciales incorrectas",
        error: "INVALID_CREDENTIALS",
      };
    }

    // Check if user is active
    if (!user.isActive) {
      return {
        success: false,
        message: "Cuenta desactivada. Contacta al soporte.",
        error: "ACCOUNT_DISABLED",
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Credenciales incorrectas",
        error: "INVALID_CREDENTIALS",
      };
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Error al iniciar sesión. Intenta nuevamente.",
      error: "LOGIN_FAILED",
    };
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        patient: {
          select: {
            id: true,
            birthdate: true,
            gender: true,
          },
        },
        doctor: {
          select: {
            id: true,
            picaddress: true,
            specialities: {
              include: {
                speciality: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    });

    return {
      success: true,
      message: "Perfil actualizado exitosamente",
      user,
    };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      success: false,
      message: "Error al actualizar el perfil",
      error: "UPDATE_FAILED",
    };
  }
}

// Change password
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  try {
    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuario no encontrado",
        error: "USER_NOT_FOUND",
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return {
        success: false,
        message: "Contraseña actual incorrecta",
        error: "INVALID_CURRENT_PASSWORD",
      };
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Contraseña actualizada exitosamente",
    };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      message: "Error al cambiar la contraseña",
      error: "PASSWORD_CHANGE_FAILED",
    };
  }
}
