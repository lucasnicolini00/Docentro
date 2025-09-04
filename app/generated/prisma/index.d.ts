
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model Speciality
 * 
 */
export type Speciality = $Result.DefaultSelection<Prisma.$SpecialityPayload>
/**
 * Model DoctorSpeciality
 * 
 */
export type DoctorSpeciality = $Result.DefaultSelection<Prisma.$DoctorSpecialityPayload>
/**
 * Model Experience
 * 
 */
export type Experience = $Result.DefaultSelection<Prisma.$ExperiencePayload>
/**
 * Model Clinic
 * 
 */
export type Clinic = $Result.DefaultSelection<Prisma.$ClinicPayload>
/**
 * Model DoctorClinic
 * 
 */
export type DoctorClinic = $Result.DefaultSelection<Prisma.$DoctorClinicPayload>
/**
 * Model Pricing
 * 
 */
export type Pricing = $Result.DefaultSelection<Prisma.$PricingPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Opinion
 * 
 */
export type Opinion = $Result.DefaultSelection<Prisma.$OpinionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELED: 'CANCELED',
  COMPLETED: 'COMPLETED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const AppointmentType: {
  IN_PERSON: 'IN_PERSON',
  ONLINE: 'ONLINE'
};

export type AppointmentType = (typeof AppointmentType)[keyof typeof AppointmentType]


export const ExperienceType: {
  EDUCATION: 'EDUCATION',
  JOB: 'JOB',
  CERTIFICATION: 'CERTIFICATION',
  OTHER: 'OTHER'
};

export type ExperienceType = (typeof ExperienceType)[keyof typeof ExperienceType]


export const UserRole: {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type AppointmentType = $Enums.AppointmentType

export const AppointmentType: typeof $Enums.AppointmentType

export type ExperienceType = $Enums.ExperienceType

export const ExperienceType: typeof $Enums.ExperienceType

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.speciality`: Exposes CRUD operations for the **Speciality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Specialities
    * const specialities = await prisma.speciality.findMany()
    * ```
    */
  get speciality(): Prisma.SpecialityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorSpeciality`: Exposes CRUD operations for the **DoctorSpeciality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorSpecialities
    * const doctorSpecialities = await prisma.doctorSpeciality.findMany()
    * ```
    */
  get doctorSpeciality(): Prisma.DoctorSpecialityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Experiences
    * const experiences = await prisma.experience.findMany()
    * ```
    */
  get experience(): Prisma.ExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinic`: Exposes CRUD operations for the **Clinic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinics
    * const clinics = await prisma.clinic.findMany()
    * ```
    */
  get clinic(): Prisma.ClinicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorClinic`: Exposes CRUD operations for the **DoctorClinic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorClinics
    * const doctorClinics = await prisma.doctorClinic.findMany()
    * ```
    */
  get doctorClinic(): Prisma.DoctorClinicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pricing`: Exposes CRUD operations for the **Pricing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pricings
    * const pricings = await prisma.pricing.findMany()
    * ```
    */
  get pricing(): Prisma.PricingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.opinion`: Exposes CRUD operations for the **Opinion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Opinions
    * const opinions = await prisma.opinion.findMany()
    * ```
    */
  get opinion(): Prisma.OpinionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Patient: 'Patient',
    Doctor: 'Doctor',
    Speciality: 'Speciality',
    DoctorSpeciality: 'DoctorSpeciality',
    Experience: 'Experience',
    Clinic: 'Clinic',
    DoctorClinic: 'DoctorClinic',
    Pricing: 'Pricing',
    Appointment: 'Appointment',
    Opinion: 'Opinion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "patient" | "doctor" | "speciality" | "doctorSpeciality" | "experience" | "clinic" | "doctorClinic" | "pricing" | "appointment" | "opinion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      Speciality: {
        payload: Prisma.$SpecialityPayload<ExtArgs>
        fields: Prisma.SpecialityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpecialityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpecialityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>
          }
          findFirst: {
            args: Prisma.SpecialityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpecialityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>
          }
          findMany: {
            args: Prisma.SpecialityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>[]
          }
          create: {
            args: Prisma.SpecialityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>
          }
          createMany: {
            args: Prisma.SpecialityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpecialityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>[]
          }
          delete: {
            args: Prisma.SpecialityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>
          }
          update: {
            args: Prisma.SpecialityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>
          }
          deleteMany: {
            args: Prisma.SpecialityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpecialityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpecialityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>[]
          }
          upsert: {
            args: Prisma.SpecialityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpecialityPayload>
          }
          aggregate: {
            args: Prisma.SpecialityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpeciality>
          }
          groupBy: {
            args: Prisma.SpecialityGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpecialityGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpecialityCountArgs<ExtArgs>
            result: $Utils.Optional<SpecialityCountAggregateOutputType> | number
          }
        }
      }
      DoctorSpeciality: {
        payload: Prisma.$DoctorSpecialityPayload<ExtArgs>
        fields: Prisma.DoctorSpecialityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorSpecialityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorSpecialityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>
          }
          findFirst: {
            args: Prisma.DoctorSpecialityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorSpecialityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>
          }
          findMany: {
            args: Prisma.DoctorSpecialityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>[]
          }
          create: {
            args: Prisma.DoctorSpecialityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>
          }
          createMany: {
            args: Prisma.DoctorSpecialityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorSpecialityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>[]
          }
          delete: {
            args: Prisma.DoctorSpecialityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>
          }
          update: {
            args: Prisma.DoctorSpecialityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>
          }
          deleteMany: {
            args: Prisma.DoctorSpecialityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorSpecialityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorSpecialityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>[]
          }
          upsert: {
            args: Prisma.DoctorSpecialityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSpecialityPayload>
          }
          aggregate: {
            args: Prisma.DoctorSpecialityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorSpeciality>
          }
          groupBy: {
            args: Prisma.DoctorSpecialityGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorSpecialityGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorSpecialityCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorSpecialityCountAggregateOutputType> | number
          }
        }
      }
      Experience: {
        payload: Prisma.$ExperiencePayload<ExtArgs>
        fields: Prisma.ExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findFirst: {
            args: Prisma.ExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          findMany: {
            args: Prisma.ExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          create: {
            args: Prisma.ExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          createMany: {
            args: Prisma.ExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          delete: {
            args: Prisma.ExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          update: {
            args: Prisma.ExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          deleteMany: {
            args: Prisma.ExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[]
          }
          upsert: {
            args: Prisma.ExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>
          }
          aggregate: {
            args: Prisma.ExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperience>
          }
          groupBy: {
            args: Prisma.ExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<ExperienceCountAggregateOutputType> | number
          }
        }
      }
      Clinic: {
        payload: Prisma.$ClinicPayload<ExtArgs>
        fields: Prisma.ClinicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findFirst: {
            args: Prisma.ClinicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findMany: {
            args: Prisma.ClinicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          create: {
            args: Prisma.ClinicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          createMany: {
            args: Prisma.ClinicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          delete: {
            args: Prisma.ClinicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          update: {
            args: Prisma.ClinicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          deleteMany: {
            args: Prisma.ClinicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          upsert: {
            args: Prisma.ClinicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          aggregate: {
            args: Prisma.ClinicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinic>
          }
          groupBy: {
            args: Prisma.ClinicGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicCountAggregateOutputType> | number
          }
        }
      }
      DoctorClinic: {
        payload: Prisma.$DoctorClinicPayload<ExtArgs>
        fields: Prisma.DoctorClinicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorClinicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorClinicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>
          }
          findFirst: {
            args: Prisma.DoctorClinicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorClinicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>
          }
          findMany: {
            args: Prisma.DoctorClinicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>[]
          }
          create: {
            args: Prisma.DoctorClinicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>
          }
          createMany: {
            args: Prisma.DoctorClinicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorClinicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>[]
          }
          delete: {
            args: Prisma.DoctorClinicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>
          }
          update: {
            args: Prisma.DoctorClinicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>
          }
          deleteMany: {
            args: Prisma.DoctorClinicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorClinicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorClinicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>[]
          }
          upsert: {
            args: Prisma.DoctorClinicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorClinicPayload>
          }
          aggregate: {
            args: Prisma.DoctorClinicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorClinic>
          }
          groupBy: {
            args: Prisma.DoctorClinicGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorClinicGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorClinicCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorClinicCountAggregateOutputType> | number
          }
        }
      }
      Pricing: {
        payload: Prisma.$PricingPayload<ExtArgs>
        fields: Prisma.PricingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          findFirst: {
            args: Prisma.PricingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          findMany: {
            args: Prisma.PricingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>[]
          }
          create: {
            args: Prisma.PricingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          createMany: {
            args: Prisma.PricingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PricingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>[]
          }
          delete: {
            args: Prisma.PricingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          update: {
            args: Prisma.PricingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          deleteMany: {
            args: Prisma.PricingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PricingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>[]
          }
          upsert: {
            args: Prisma.PricingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPayload>
          }
          aggregate: {
            args: Prisma.PricingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricing>
          }
          groupBy: {
            args: Prisma.PricingGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingCountArgs<ExtArgs>
            result: $Utils.Optional<PricingCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Opinion: {
        payload: Prisma.$OpinionPayload<ExtArgs>
        fields: Prisma.OpinionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OpinionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OpinionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>
          }
          findFirst: {
            args: Prisma.OpinionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OpinionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>
          }
          findMany: {
            args: Prisma.OpinionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>[]
          }
          create: {
            args: Prisma.OpinionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>
          }
          createMany: {
            args: Prisma.OpinionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OpinionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>[]
          }
          delete: {
            args: Prisma.OpinionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>
          }
          update: {
            args: Prisma.OpinionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>
          }
          deleteMany: {
            args: Prisma.OpinionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OpinionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OpinionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>[]
          }
          upsert: {
            args: Prisma.OpinionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OpinionPayload>
          }
          aggregate: {
            args: Prisma.OpinionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOpinion>
          }
          groupBy: {
            args: Prisma.OpinionGroupByArgs<ExtArgs>
            result: $Utils.Optional<OpinionGroupByOutputType>[]
          }
          count: {
            args: Prisma.OpinionCountArgs<ExtArgs>
            result: $Utils.Optional<OpinionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    patient?: PatientOmit
    doctor?: DoctorOmit
    speciality?: SpecialityOmit
    doctorSpeciality?: DoctorSpecialityOmit
    experience?: ExperienceOmit
    clinic?: ClinicOmit
    doctorClinic?: DoctorClinicOmit
    pricing?: PricingOmit
    appointment?: AppointmentOmit
    opinion?: OpinionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    appointments: number
    opinions: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs
    opinions?: boolean | PatientCountOutputTypeCountOpinionsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpinionWhereInput
  }


  /**
   * Count Type DoctorCountOutputType
   */

  export type DoctorCountOutputType = {
    specialities: number
    experiences: number
    pricings: number
    clinics: number
    appointments: number
    opinions: number
  }

  export type DoctorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    specialities?: boolean | DoctorCountOutputTypeCountSpecialitiesArgs
    experiences?: boolean | DoctorCountOutputTypeCountExperiencesArgs
    pricings?: boolean | DoctorCountOutputTypeCountPricingsArgs
    clinics?: boolean | DoctorCountOutputTypeCountClinicsArgs
    appointments?: boolean | DoctorCountOutputTypeCountAppointmentsArgs
    opinions?: boolean | DoctorCountOutputTypeCountOpinionsArgs
  }

  // Custom InputTypes
  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorCountOutputType
     */
    select?: DoctorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountSpecialitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorSpecialityWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountPricingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountClinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorClinicWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpinionWhereInput
  }


  /**
   * Count Type SpecialityCountOutputType
   */

  export type SpecialityCountOutputType = {
    doctors: number
  }

  export type SpecialityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | SpecialityCountOutputTypeCountDoctorsArgs
  }

  // Custom InputTypes
  /**
   * SpecialityCountOutputType without action
   */
  export type SpecialityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpecialityCountOutputType
     */
    select?: SpecialityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpecialityCountOutputType without action
   */
  export type SpecialityCountOutputTypeCountDoctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorSpecialityWhereInput
  }


  /**
   * Count Type ClinicCountOutputType
   */

  export type ClinicCountOutputType = {
    doctorLinks: number
    pricing: number
    appointments: number
  }

  export type ClinicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorLinks?: boolean | ClinicCountOutputTypeCountDoctorLinksArgs
    pricing?: boolean | ClinicCountOutputTypeCountPricingArgs
    appointments?: boolean | ClinicCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCountOutputType
     */
    select?: ClinicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountDoctorLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorClinicWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountPricingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type PricingCountOutputType
   */

  export type PricingCountOutputType = {
    appointments: number
  }

  export type PricingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | PricingCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * PricingCountOutputType without action
   */
  export type PricingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingCountOutputType
     */
    select?: PricingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PricingCountOutputType without action
   */
  export type PricingCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    emailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    emailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    phone: number
    role: number
    isActive: number
    emailVerified: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    role?: true
    isActive?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    role?: true
    isActive?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    phone?: true
    role?: true
    isActive?: true
    emailVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string | null
    role: $Enums.UserRole
    isActive: boolean
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    patient?: boolean | User$patientArgs<ExtArgs>
    doctor?: boolean | User$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "phone" | "role" | "isActive" | "emailVerified" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | User$patientArgs<ExtArgs>
    doctor?: boolean | User$doctorArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs> | null
      doctor: Prisma.$DoctorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      phone: string | null
      role: $Enums.UserRole
      isActive: boolean
      emailVerified: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends User$patientArgs<ExtArgs> = {}>(args?: Subset<T, User$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    doctor<T extends User$doctorArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.patient
   */
  export type User$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * User.doctor
   */
  export type User$doctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    surname: string | null
    email: string | null
    phone: string | null
    birthdate: Date | null
    gender: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    surname: string | null
    email: string | null
    phone: string | null
    birthdate: Date | null
    gender: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    surname: number
    email: number
    phone: number
    birthdate: number
    gender: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    surname?: true
    email?: true
    phone?: true
    birthdate?: true
    gender?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    surname?: true
    email?: true
    phone?: true
    birthdate?: true
    gender?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    surname?: true
    email?: true
    phone?: true
    birthdate?: true
    gender?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    userId: string
    name: string
    surname: string
    email: string
    phone: string | null
    birthdate: Date | null
    gender: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    birthdate?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    opinions?: boolean | Patient$opinionsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    birthdate?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    birthdate?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    birthdate?: boolean
    gender?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "surname" | "email" | "phone" | "birthdate" | "gender" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | Patient$appointmentsArgs<ExtArgs>
    opinions?: boolean | Patient$opinionsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      opinions: Prisma.$OpinionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      surname: string
      email: string
      phone: string | null
      birthdate: Date | null
      gender: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointments<T extends Patient$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    opinions<T extends Patient$opinionsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$opinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly userId: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly surname: FieldRef<"Patient", 'String'>
    readonly email: FieldRef<"Patient", 'String'>
    readonly phone: FieldRef<"Patient", 'String'>
    readonly birthdate: FieldRef<"Patient", 'DateTime'>
    readonly gender: FieldRef<"Patient", 'String'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
    readonly deletedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.appointments
   */
  export type Patient$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Patient.opinions
   */
  export type Patient$opinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    where?: OpinionWhereInput
    orderBy?: OpinionOrderByWithRelationInput | OpinionOrderByWithRelationInput[]
    cursor?: OpinionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OpinionScalarFieldEnum | OpinionScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    surname: string | null
    email: string | null
    phone: string | null
    picaddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DoctorMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    surname: string | null
    email: string | null
    phone: string | null
    picaddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DoctorCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    surname: number
    email: number
    phone: number
    picaddress: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type DoctorMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    surname?: true
    email?: true
    phone?: true
    picaddress?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DoctorMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    surname?: true
    email?: true
    phone?: true
    picaddress?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DoctorCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    surname?: true
    email?: true
    phone?: true
    picaddress?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    id: string
    userId: string
    name: string
    surname: string
    email: string | null
    phone: string | null
    picaddress: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: DoctorCountAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    picaddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    specialities?: boolean | Doctor$specialitiesArgs<ExtArgs>
    experiences?: boolean | Doctor$experiencesArgs<ExtArgs>
    pricings?: boolean | Doctor$pricingsArgs<ExtArgs>
    clinics?: boolean | Doctor$clinicsArgs<ExtArgs>
    appointments?: boolean | Doctor$appointmentsArgs<ExtArgs>
    opinions?: boolean | Doctor$opinionsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    picaddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    picaddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    surname?: boolean
    email?: boolean
    phone?: boolean
    picaddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type DoctorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "surname" | "email" | "phone" | "picaddress" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["doctor"]>
  export type DoctorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    specialities?: boolean | Doctor$specialitiesArgs<ExtArgs>
    experiences?: boolean | Doctor$experiencesArgs<ExtArgs>
    pricings?: boolean | Doctor$pricingsArgs<ExtArgs>
    clinics?: boolean | Doctor$clinicsArgs<ExtArgs>
    appointments?: boolean | Doctor$appointmentsArgs<ExtArgs>
    opinions?: boolean | Doctor$opinionsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      specialities: Prisma.$DoctorSpecialityPayload<ExtArgs>[]
      experiences: Prisma.$ExperiencePayload<ExtArgs>[]
      pricings: Prisma.$PricingPayload<ExtArgs>[]
      clinics: Prisma.$DoctorClinicPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      opinions: Prisma.$OpinionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      surname: string
      email: string | null
      phone: string | null
      picaddress: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors and returns the data updated in the database.
     * @param {DoctorUpdateManyAndReturnArgs} args - Arguments to update many Doctors.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    specialities<T extends Doctor$specialitiesArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$specialitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    experiences<T extends Doctor$experiencesArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$experiencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pricings<T extends Doctor$pricingsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$pricingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clinics<T extends Doctor$clinicsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$clinicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Doctor$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    opinions<T extends Doctor$opinionsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$opinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doctor model
   */
  interface DoctorFieldRefs {
    readonly id: FieldRef<"Doctor", 'String'>
    readonly userId: FieldRef<"Doctor", 'String'>
    readonly name: FieldRef<"Doctor", 'String'>
    readonly surname: FieldRef<"Doctor", 'String'>
    readonly email: FieldRef<"Doctor", 'String'>
    readonly phone: FieldRef<"Doctor", 'String'>
    readonly picaddress: FieldRef<"Doctor", 'String'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
    readonly updatedAt: FieldRef<"Doctor", 'DateTime'>
    readonly deletedAt: FieldRef<"Doctor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
  }

  /**
   * Doctor updateManyAndReturn
   */
  export type DoctorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to delete.
     */
    limit?: number
  }

  /**
   * Doctor.specialities
   */
  export type Doctor$specialitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    where?: DoctorSpecialityWhereInput
    orderBy?: DoctorSpecialityOrderByWithRelationInput | DoctorSpecialityOrderByWithRelationInput[]
    cursor?: DoctorSpecialityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorSpecialityScalarFieldEnum | DoctorSpecialityScalarFieldEnum[]
  }

  /**
   * Doctor.experiences
   */
  export type Doctor$experiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    cursor?: ExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Doctor.pricings
   */
  export type Doctor$pricingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    where?: PricingWhereInput
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    cursor?: PricingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Doctor.clinics
   */
  export type Doctor$clinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    where?: DoctorClinicWhereInput
    orderBy?: DoctorClinicOrderByWithRelationInput | DoctorClinicOrderByWithRelationInput[]
    cursor?: DoctorClinicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorClinicScalarFieldEnum | DoctorClinicScalarFieldEnum[]
  }

  /**
   * Doctor.appointments
   */
  export type Doctor$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Doctor.opinions
   */
  export type Doctor$opinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    where?: OpinionWhereInput
    orderBy?: OpinionOrderByWithRelationInput | OpinionOrderByWithRelationInput[]
    cursor?: OpinionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OpinionScalarFieldEnum | OpinionScalarFieldEnum[]
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
  }


  /**
   * Model Speciality
   */

  export type AggregateSpeciality = {
    _count: SpecialityCountAggregateOutputType | null
    _min: SpecialityMinAggregateOutputType | null
    _max: SpecialityMaxAggregateOutputType | null
  }

  export type SpecialityMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type SpecialityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type SpecialityCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type SpecialityMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type SpecialityMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type SpecialityCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type SpecialityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Speciality to aggregate.
     */
    where?: SpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialities to fetch.
     */
    orderBy?: SpecialityOrderByWithRelationInput | SpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Specialities
    **/
    _count?: true | SpecialityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpecialityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpecialityMaxAggregateInputType
  }

  export type GetSpecialityAggregateType<T extends SpecialityAggregateArgs> = {
        [P in keyof T & keyof AggregateSpeciality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpeciality[P]>
      : GetScalarType<T[P], AggregateSpeciality[P]>
  }




  export type SpecialityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpecialityWhereInput
    orderBy?: SpecialityOrderByWithAggregationInput | SpecialityOrderByWithAggregationInput[]
    by: SpecialityScalarFieldEnum[] | SpecialityScalarFieldEnum
    having?: SpecialityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpecialityCountAggregateInputType | true
    _min?: SpecialityMinAggregateInputType
    _max?: SpecialityMaxAggregateInputType
  }

  export type SpecialityGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: SpecialityCountAggregateOutputType | null
    _min: SpecialityMinAggregateOutputType | null
    _max: SpecialityMaxAggregateOutputType | null
  }

  type GetSpecialityGroupByPayload<T extends SpecialityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpecialityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpecialityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpecialityGroupByOutputType[P]>
            : GetScalarType<T[P], SpecialityGroupByOutputType[P]>
        }
      >
    >


  export type SpecialitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctors?: boolean | Speciality$doctorsArgs<ExtArgs>
    _count?: boolean | SpecialityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["speciality"]>

  export type SpecialitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["speciality"]>

  export type SpecialitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["speciality"]>

  export type SpecialitySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type SpecialityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["speciality"]>
  export type SpecialityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | Speciality$doctorsArgs<ExtArgs>
    _count?: boolean | SpecialityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpecialityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SpecialityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SpecialityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Speciality"
    objects: {
      doctors: Prisma.$DoctorSpecialityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["speciality"]>
    composites: {}
  }

  type SpecialityGetPayload<S extends boolean | null | undefined | SpecialityDefaultArgs> = $Result.GetResult<Prisma.$SpecialityPayload, S>

  type SpecialityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpecialityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpecialityCountAggregateInputType | true
    }

  export interface SpecialityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Speciality'], meta: { name: 'Speciality' } }
    /**
     * Find zero or one Speciality that matches the filter.
     * @param {SpecialityFindUniqueArgs} args - Arguments to find a Speciality
     * @example
     * // Get one Speciality
     * const speciality = await prisma.speciality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpecialityFindUniqueArgs>(args: SelectSubset<T, SpecialityFindUniqueArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Speciality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpecialityFindUniqueOrThrowArgs} args - Arguments to find a Speciality
     * @example
     * // Get one Speciality
     * const speciality = await prisma.speciality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpecialityFindUniqueOrThrowArgs>(args: SelectSubset<T, SpecialityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speciality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityFindFirstArgs} args - Arguments to find a Speciality
     * @example
     * // Get one Speciality
     * const speciality = await prisma.speciality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpecialityFindFirstArgs>(args?: SelectSubset<T, SpecialityFindFirstArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speciality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityFindFirstOrThrowArgs} args - Arguments to find a Speciality
     * @example
     * // Get one Speciality
     * const speciality = await prisma.speciality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpecialityFindFirstOrThrowArgs>(args?: SelectSubset<T, SpecialityFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Specialities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Specialities
     * const specialities = await prisma.speciality.findMany()
     * 
     * // Get first 10 Specialities
     * const specialities = await prisma.speciality.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const specialityWithIdOnly = await prisma.speciality.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpecialityFindManyArgs>(args?: SelectSubset<T, SpecialityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Speciality.
     * @param {SpecialityCreateArgs} args - Arguments to create a Speciality.
     * @example
     * // Create one Speciality
     * const Speciality = await prisma.speciality.create({
     *   data: {
     *     // ... data to create a Speciality
     *   }
     * })
     * 
     */
    create<T extends SpecialityCreateArgs>(args: SelectSubset<T, SpecialityCreateArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Specialities.
     * @param {SpecialityCreateManyArgs} args - Arguments to create many Specialities.
     * @example
     * // Create many Specialities
     * const speciality = await prisma.speciality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpecialityCreateManyArgs>(args?: SelectSubset<T, SpecialityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Specialities and returns the data saved in the database.
     * @param {SpecialityCreateManyAndReturnArgs} args - Arguments to create many Specialities.
     * @example
     * // Create many Specialities
     * const speciality = await prisma.speciality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Specialities and only return the `id`
     * const specialityWithIdOnly = await prisma.speciality.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpecialityCreateManyAndReturnArgs>(args?: SelectSubset<T, SpecialityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Speciality.
     * @param {SpecialityDeleteArgs} args - Arguments to delete one Speciality.
     * @example
     * // Delete one Speciality
     * const Speciality = await prisma.speciality.delete({
     *   where: {
     *     // ... filter to delete one Speciality
     *   }
     * })
     * 
     */
    delete<T extends SpecialityDeleteArgs>(args: SelectSubset<T, SpecialityDeleteArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Speciality.
     * @param {SpecialityUpdateArgs} args - Arguments to update one Speciality.
     * @example
     * // Update one Speciality
     * const speciality = await prisma.speciality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpecialityUpdateArgs>(args: SelectSubset<T, SpecialityUpdateArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Specialities.
     * @param {SpecialityDeleteManyArgs} args - Arguments to filter Specialities to delete.
     * @example
     * // Delete a few Specialities
     * const { count } = await prisma.speciality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpecialityDeleteManyArgs>(args?: SelectSubset<T, SpecialityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specialities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Specialities
     * const speciality = await prisma.speciality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpecialityUpdateManyArgs>(args: SelectSubset<T, SpecialityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Specialities and returns the data updated in the database.
     * @param {SpecialityUpdateManyAndReturnArgs} args - Arguments to update many Specialities.
     * @example
     * // Update many Specialities
     * const speciality = await prisma.speciality.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Specialities and only return the `id`
     * const specialityWithIdOnly = await prisma.speciality.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpecialityUpdateManyAndReturnArgs>(args: SelectSubset<T, SpecialityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Speciality.
     * @param {SpecialityUpsertArgs} args - Arguments to update or create a Speciality.
     * @example
     * // Update or create a Speciality
     * const speciality = await prisma.speciality.upsert({
     *   create: {
     *     // ... data to create a Speciality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Speciality we want to update
     *   }
     * })
     */
    upsert<T extends SpecialityUpsertArgs>(args: SelectSubset<T, SpecialityUpsertArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Specialities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityCountArgs} args - Arguments to filter Specialities to count.
     * @example
     * // Count the number of Specialities
     * const count = await prisma.speciality.count({
     *   where: {
     *     // ... the filter for the Specialities we want to count
     *   }
     * })
    **/
    count<T extends SpecialityCountArgs>(
      args?: Subset<T, SpecialityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpecialityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Speciality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpecialityAggregateArgs>(args: Subset<T, SpecialityAggregateArgs>): Prisma.PrismaPromise<GetSpecialityAggregateType<T>>

    /**
     * Group by Speciality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpecialityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpecialityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpecialityGroupByArgs['orderBy'] }
        : { orderBy?: SpecialityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpecialityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpecialityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Speciality model
   */
  readonly fields: SpecialityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Speciality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpecialityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctors<T extends Speciality$doctorsArgs<ExtArgs> = {}>(args?: Subset<T, Speciality$doctorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Speciality model
   */
  interface SpecialityFieldRefs {
    readonly id: FieldRef<"Speciality", 'String'>
    readonly name: FieldRef<"Speciality", 'String'>
    readonly description: FieldRef<"Speciality", 'String'>
    readonly createdAt: FieldRef<"Speciality", 'DateTime'>
    readonly updatedAt: FieldRef<"Speciality", 'DateTime'>
    readonly deletedAt: FieldRef<"Speciality", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Speciality findUnique
   */
  export type SpecialityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * Filter, which Speciality to fetch.
     */
    where: SpecialityWhereUniqueInput
  }

  /**
   * Speciality findUniqueOrThrow
   */
  export type SpecialityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * Filter, which Speciality to fetch.
     */
    where: SpecialityWhereUniqueInput
  }

  /**
   * Speciality findFirst
   */
  export type SpecialityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * Filter, which Speciality to fetch.
     */
    where?: SpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialities to fetch.
     */
    orderBy?: SpecialityOrderByWithRelationInput | SpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specialities.
     */
    cursor?: SpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialities.
     */
    distinct?: SpecialityScalarFieldEnum | SpecialityScalarFieldEnum[]
  }

  /**
   * Speciality findFirstOrThrow
   */
  export type SpecialityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * Filter, which Speciality to fetch.
     */
    where?: SpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialities to fetch.
     */
    orderBy?: SpecialityOrderByWithRelationInput | SpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Specialities.
     */
    cursor?: SpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Specialities.
     */
    distinct?: SpecialityScalarFieldEnum | SpecialityScalarFieldEnum[]
  }

  /**
   * Speciality findMany
   */
  export type SpecialityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * Filter, which Specialities to fetch.
     */
    where?: SpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Specialities to fetch.
     */
    orderBy?: SpecialityOrderByWithRelationInput | SpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Specialities.
     */
    cursor?: SpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Specialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Specialities.
     */
    skip?: number
    distinct?: SpecialityScalarFieldEnum | SpecialityScalarFieldEnum[]
  }

  /**
   * Speciality create
   */
  export type SpecialityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * The data needed to create a Speciality.
     */
    data: XOR<SpecialityCreateInput, SpecialityUncheckedCreateInput>
  }

  /**
   * Speciality createMany
   */
  export type SpecialityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Specialities.
     */
    data: SpecialityCreateManyInput | SpecialityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Speciality createManyAndReturn
   */
  export type SpecialityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * The data used to create many Specialities.
     */
    data: SpecialityCreateManyInput | SpecialityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Speciality update
   */
  export type SpecialityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * The data needed to update a Speciality.
     */
    data: XOR<SpecialityUpdateInput, SpecialityUncheckedUpdateInput>
    /**
     * Choose, which Speciality to update.
     */
    where: SpecialityWhereUniqueInput
  }

  /**
   * Speciality updateMany
   */
  export type SpecialityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Specialities.
     */
    data: XOR<SpecialityUpdateManyMutationInput, SpecialityUncheckedUpdateManyInput>
    /**
     * Filter which Specialities to update
     */
    where?: SpecialityWhereInput
    /**
     * Limit how many Specialities to update.
     */
    limit?: number
  }

  /**
   * Speciality updateManyAndReturn
   */
  export type SpecialityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * The data used to update Specialities.
     */
    data: XOR<SpecialityUpdateManyMutationInput, SpecialityUncheckedUpdateManyInput>
    /**
     * Filter which Specialities to update
     */
    where?: SpecialityWhereInput
    /**
     * Limit how many Specialities to update.
     */
    limit?: number
  }

  /**
   * Speciality upsert
   */
  export type SpecialityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * The filter to search for the Speciality to update in case it exists.
     */
    where: SpecialityWhereUniqueInput
    /**
     * In case the Speciality found by the `where` argument doesn't exist, create a new Speciality with this data.
     */
    create: XOR<SpecialityCreateInput, SpecialityUncheckedCreateInput>
    /**
     * In case the Speciality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpecialityUpdateInput, SpecialityUncheckedUpdateInput>
  }

  /**
   * Speciality delete
   */
  export type SpecialityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
    /**
     * Filter which Speciality to delete.
     */
    where: SpecialityWhereUniqueInput
  }

  /**
   * Speciality deleteMany
   */
  export type SpecialityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Specialities to delete
     */
    where?: SpecialityWhereInput
    /**
     * Limit how many Specialities to delete.
     */
    limit?: number
  }

  /**
   * Speciality.doctors
   */
  export type Speciality$doctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    where?: DoctorSpecialityWhereInput
    orderBy?: DoctorSpecialityOrderByWithRelationInput | DoctorSpecialityOrderByWithRelationInput[]
    cursor?: DoctorSpecialityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorSpecialityScalarFieldEnum | DoctorSpecialityScalarFieldEnum[]
  }

  /**
   * Speciality without action
   */
  export type SpecialityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speciality
     */
    select?: SpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speciality
     */
    omit?: SpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpecialityInclude<ExtArgs> | null
  }


  /**
   * Model DoctorSpeciality
   */

  export type AggregateDoctorSpeciality = {
    _count: DoctorSpecialityCountAggregateOutputType | null
    _min: DoctorSpecialityMinAggregateOutputType | null
    _max: DoctorSpecialityMaxAggregateOutputType | null
  }

  export type DoctorSpecialityMinAggregateOutputType = {
    doctorId: string | null
    specialityId: string | null
    createdAt: Date | null
  }

  export type DoctorSpecialityMaxAggregateOutputType = {
    doctorId: string | null
    specialityId: string | null
    createdAt: Date | null
  }

  export type DoctorSpecialityCountAggregateOutputType = {
    doctorId: number
    specialityId: number
    createdAt: number
    _all: number
  }


  export type DoctorSpecialityMinAggregateInputType = {
    doctorId?: true
    specialityId?: true
    createdAt?: true
  }

  export type DoctorSpecialityMaxAggregateInputType = {
    doctorId?: true
    specialityId?: true
    createdAt?: true
  }

  export type DoctorSpecialityCountAggregateInputType = {
    doctorId?: true
    specialityId?: true
    createdAt?: true
    _all?: true
  }

  export type DoctorSpecialityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorSpeciality to aggregate.
     */
    where?: DoctorSpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSpecialities to fetch.
     */
    orderBy?: DoctorSpecialityOrderByWithRelationInput | DoctorSpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorSpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSpecialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSpecialities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorSpecialities
    **/
    _count?: true | DoctorSpecialityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorSpecialityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorSpecialityMaxAggregateInputType
  }

  export type GetDoctorSpecialityAggregateType<T extends DoctorSpecialityAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorSpeciality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorSpeciality[P]>
      : GetScalarType<T[P], AggregateDoctorSpeciality[P]>
  }




  export type DoctorSpecialityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorSpecialityWhereInput
    orderBy?: DoctorSpecialityOrderByWithAggregationInput | DoctorSpecialityOrderByWithAggregationInput[]
    by: DoctorSpecialityScalarFieldEnum[] | DoctorSpecialityScalarFieldEnum
    having?: DoctorSpecialityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorSpecialityCountAggregateInputType | true
    _min?: DoctorSpecialityMinAggregateInputType
    _max?: DoctorSpecialityMaxAggregateInputType
  }

  export type DoctorSpecialityGroupByOutputType = {
    doctorId: string
    specialityId: string
    createdAt: Date
    _count: DoctorSpecialityCountAggregateOutputType | null
    _min: DoctorSpecialityMinAggregateOutputType | null
    _max: DoctorSpecialityMaxAggregateOutputType | null
  }

  type GetDoctorSpecialityGroupByPayload<T extends DoctorSpecialityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorSpecialityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorSpecialityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorSpecialityGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorSpecialityGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSpecialitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctorId?: boolean
    specialityId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    speciality?: boolean | SpecialityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSpeciality"]>

  export type DoctorSpecialitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctorId?: boolean
    specialityId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    speciality?: boolean | SpecialityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSpeciality"]>

  export type DoctorSpecialitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctorId?: boolean
    specialityId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    speciality?: boolean | SpecialityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSpeciality"]>

  export type DoctorSpecialitySelectScalar = {
    doctorId?: boolean
    specialityId?: boolean
    createdAt?: boolean
  }

  export type DoctorSpecialityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"doctorId" | "specialityId" | "createdAt", ExtArgs["result"]["doctorSpeciality"]>
  export type DoctorSpecialityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    speciality?: boolean | SpecialityDefaultArgs<ExtArgs>
  }
  export type DoctorSpecialityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    speciality?: boolean | SpecialityDefaultArgs<ExtArgs>
  }
  export type DoctorSpecialityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    speciality?: boolean | SpecialityDefaultArgs<ExtArgs>
  }

  export type $DoctorSpecialityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorSpeciality"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      speciality: Prisma.$SpecialityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      doctorId: string
      specialityId: string
      createdAt: Date
    }, ExtArgs["result"]["doctorSpeciality"]>
    composites: {}
  }

  type DoctorSpecialityGetPayload<S extends boolean | null | undefined | DoctorSpecialityDefaultArgs> = $Result.GetResult<Prisma.$DoctorSpecialityPayload, S>

  type DoctorSpecialityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorSpecialityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorSpecialityCountAggregateInputType | true
    }

  export interface DoctorSpecialityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorSpeciality'], meta: { name: 'DoctorSpeciality' } }
    /**
     * Find zero or one DoctorSpeciality that matches the filter.
     * @param {DoctorSpecialityFindUniqueArgs} args - Arguments to find a DoctorSpeciality
     * @example
     * // Get one DoctorSpeciality
     * const doctorSpeciality = await prisma.doctorSpeciality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorSpecialityFindUniqueArgs>(args: SelectSubset<T, DoctorSpecialityFindUniqueArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorSpeciality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorSpecialityFindUniqueOrThrowArgs} args - Arguments to find a DoctorSpeciality
     * @example
     * // Get one DoctorSpeciality
     * const doctorSpeciality = await prisma.doctorSpeciality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorSpecialityFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorSpecialityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorSpeciality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityFindFirstArgs} args - Arguments to find a DoctorSpeciality
     * @example
     * // Get one DoctorSpeciality
     * const doctorSpeciality = await prisma.doctorSpeciality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorSpecialityFindFirstArgs>(args?: SelectSubset<T, DoctorSpecialityFindFirstArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorSpeciality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityFindFirstOrThrowArgs} args - Arguments to find a DoctorSpeciality
     * @example
     * // Get one DoctorSpeciality
     * const doctorSpeciality = await prisma.doctorSpeciality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorSpecialityFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorSpecialityFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorSpecialities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorSpecialities
     * const doctorSpecialities = await prisma.doctorSpeciality.findMany()
     * 
     * // Get first 10 DoctorSpecialities
     * const doctorSpecialities = await prisma.doctorSpeciality.findMany({ take: 10 })
     * 
     * // Only select the `doctorId`
     * const doctorSpecialityWithDoctorIdOnly = await prisma.doctorSpeciality.findMany({ select: { doctorId: true } })
     * 
     */
    findMany<T extends DoctorSpecialityFindManyArgs>(args?: SelectSubset<T, DoctorSpecialityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorSpeciality.
     * @param {DoctorSpecialityCreateArgs} args - Arguments to create a DoctorSpeciality.
     * @example
     * // Create one DoctorSpeciality
     * const DoctorSpeciality = await prisma.doctorSpeciality.create({
     *   data: {
     *     // ... data to create a DoctorSpeciality
     *   }
     * })
     * 
     */
    create<T extends DoctorSpecialityCreateArgs>(args: SelectSubset<T, DoctorSpecialityCreateArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorSpecialities.
     * @param {DoctorSpecialityCreateManyArgs} args - Arguments to create many DoctorSpecialities.
     * @example
     * // Create many DoctorSpecialities
     * const doctorSpeciality = await prisma.doctorSpeciality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorSpecialityCreateManyArgs>(args?: SelectSubset<T, DoctorSpecialityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorSpecialities and returns the data saved in the database.
     * @param {DoctorSpecialityCreateManyAndReturnArgs} args - Arguments to create many DoctorSpecialities.
     * @example
     * // Create many DoctorSpecialities
     * const doctorSpeciality = await prisma.doctorSpeciality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorSpecialities and only return the `doctorId`
     * const doctorSpecialityWithDoctorIdOnly = await prisma.doctorSpeciality.createManyAndReturn({
     *   select: { doctorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorSpecialityCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorSpecialityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorSpeciality.
     * @param {DoctorSpecialityDeleteArgs} args - Arguments to delete one DoctorSpeciality.
     * @example
     * // Delete one DoctorSpeciality
     * const DoctorSpeciality = await prisma.doctorSpeciality.delete({
     *   where: {
     *     // ... filter to delete one DoctorSpeciality
     *   }
     * })
     * 
     */
    delete<T extends DoctorSpecialityDeleteArgs>(args: SelectSubset<T, DoctorSpecialityDeleteArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorSpeciality.
     * @param {DoctorSpecialityUpdateArgs} args - Arguments to update one DoctorSpeciality.
     * @example
     * // Update one DoctorSpeciality
     * const doctorSpeciality = await prisma.doctorSpeciality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorSpecialityUpdateArgs>(args: SelectSubset<T, DoctorSpecialityUpdateArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorSpecialities.
     * @param {DoctorSpecialityDeleteManyArgs} args - Arguments to filter DoctorSpecialities to delete.
     * @example
     * // Delete a few DoctorSpecialities
     * const { count } = await prisma.doctorSpeciality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorSpecialityDeleteManyArgs>(args?: SelectSubset<T, DoctorSpecialityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorSpecialities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorSpecialities
     * const doctorSpeciality = await prisma.doctorSpeciality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorSpecialityUpdateManyArgs>(args: SelectSubset<T, DoctorSpecialityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorSpecialities and returns the data updated in the database.
     * @param {DoctorSpecialityUpdateManyAndReturnArgs} args - Arguments to update many DoctorSpecialities.
     * @example
     * // Update many DoctorSpecialities
     * const doctorSpeciality = await prisma.doctorSpeciality.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorSpecialities and only return the `doctorId`
     * const doctorSpecialityWithDoctorIdOnly = await prisma.doctorSpeciality.updateManyAndReturn({
     *   select: { doctorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorSpecialityUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorSpecialityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorSpeciality.
     * @param {DoctorSpecialityUpsertArgs} args - Arguments to update or create a DoctorSpeciality.
     * @example
     * // Update or create a DoctorSpeciality
     * const doctorSpeciality = await prisma.doctorSpeciality.upsert({
     *   create: {
     *     // ... data to create a DoctorSpeciality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorSpeciality we want to update
     *   }
     * })
     */
    upsert<T extends DoctorSpecialityUpsertArgs>(args: SelectSubset<T, DoctorSpecialityUpsertArgs<ExtArgs>>): Prisma__DoctorSpecialityClient<$Result.GetResult<Prisma.$DoctorSpecialityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorSpecialities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityCountArgs} args - Arguments to filter DoctorSpecialities to count.
     * @example
     * // Count the number of DoctorSpecialities
     * const count = await prisma.doctorSpeciality.count({
     *   where: {
     *     // ... the filter for the DoctorSpecialities we want to count
     *   }
     * })
    **/
    count<T extends DoctorSpecialityCountArgs>(
      args?: Subset<T, DoctorSpecialityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorSpecialityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorSpeciality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorSpecialityAggregateArgs>(args: Subset<T, DoctorSpecialityAggregateArgs>): Prisma.PrismaPromise<GetDoctorSpecialityAggregateType<T>>

    /**
     * Group by DoctorSpeciality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSpecialityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorSpecialityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorSpecialityGroupByArgs['orderBy'] }
        : { orderBy?: DoctorSpecialityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorSpecialityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorSpecialityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorSpeciality model
   */
  readonly fields: DoctorSpecialityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorSpeciality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorSpecialityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    speciality<T extends SpecialityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpecialityDefaultArgs<ExtArgs>>): Prisma__SpecialityClient<$Result.GetResult<Prisma.$SpecialityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorSpeciality model
   */
  interface DoctorSpecialityFieldRefs {
    readonly doctorId: FieldRef<"DoctorSpeciality", 'String'>
    readonly specialityId: FieldRef<"DoctorSpeciality", 'String'>
    readonly createdAt: FieldRef<"DoctorSpeciality", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorSpeciality findUnique
   */
  export type DoctorSpecialityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSpeciality to fetch.
     */
    where: DoctorSpecialityWhereUniqueInput
  }

  /**
   * DoctorSpeciality findUniqueOrThrow
   */
  export type DoctorSpecialityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSpeciality to fetch.
     */
    where: DoctorSpecialityWhereUniqueInput
  }

  /**
   * DoctorSpeciality findFirst
   */
  export type DoctorSpecialityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSpeciality to fetch.
     */
    where?: DoctorSpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSpecialities to fetch.
     */
    orderBy?: DoctorSpecialityOrderByWithRelationInput | DoctorSpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorSpecialities.
     */
    cursor?: DoctorSpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSpecialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSpecialities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSpecialities.
     */
    distinct?: DoctorSpecialityScalarFieldEnum | DoctorSpecialityScalarFieldEnum[]
  }

  /**
   * DoctorSpeciality findFirstOrThrow
   */
  export type DoctorSpecialityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSpeciality to fetch.
     */
    where?: DoctorSpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSpecialities to fetch.
     */
    orderBy?: DoctorSpecialityOrderByWithRelationInput | DoctorSpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorSpecialities.
     */
    cursor?: DoctorSpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSpecialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSpecialities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSpecialities.
     */
    distinct?: DoctorSpecialityScalarFieldEnum | DoctorSpecialityScalarFieldEnum[]
  }

  /**
   * DoctorSpeciality findMany
   */
  export type DoctorSpecialityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSpecialities to fetch.
     */
    where?: DoctorSpecialityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSpecialities to fetch.
     */
    orderBy?: DoctorSpecialityOrderByWithRelationInput | DoctorSpecialityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorSpecialities.
     */
    cursor?: DoctorSpecialityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSpecialities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSpecialities.
     */
    skip?: number
    distinct?: DoctorSpecialityScalarFieldEnum | DoctorSpecialityScalarFieldEnum[]
  }

  /**
   * DoctorSpeciality create
   */
  export type DoctorSpecialityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorSpeciality.
     */
    data: XOR<DoctorSpecialityCreateInput, DoctorSpecialityUncheckedCreateInput>
  }

  /**
   * DoctorSpeciality createMany
   */
  export type DoctorSpecialityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorSpecialities.
     */
    data: DoctorSpecialityCreateManyInput | DoctorSpecialityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorSpeciality createManyAndReturn
   */
  export type DoctorSpecialityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorSpecialities.
     */
    data: DoctorSpecialityCreateManyInput | DoctorSpecialityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorSpeciality update
   */
  export type DoctorSpecialityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorSpeciality.
     */
    data: XOR<DoctorSpecialityUpdateInput, DoctorSpecialityUncheckedUpdateInput>
    /**
     * Choose, which DoctorSpeciality to update.
     */
    where: DoctorSpecialityWhereUniqueInput
  }

  /**
   * DoctorSpeciality updateMany
   */
  export type DoctorSpecialityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorSpecialities.
     */
    data: XOR<DoctorSpecialityUpdateManyMutationInput, DoctorSpecialityUncheckedUpdateManyInput>
    /**
     * Filter which DoctorSpecialities to update
     */
    where?: DoctorSpecialityWhereInput
    /**
     * Limit how many DoctorSpecialities to update.
     */
    limit?: number
  }

  /**
   * DoctorSpeciality updateManyAndReturn
   */
  export type DoctorSpecialityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * The data used to update DoctorSpecialities.
     */
    data: XOR<DoctorSpecialityUpdateManyMutationInput, DoctorSpecialityUncheckedUpdateManyInput>
    /**
     * Filter which DoctorSpecialities to update
     */
    where?: DoctorSpecialityWhereInput
    /**
     * Limit how many DoctorSpecialities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorSpeciality upsert
   */
  export type DoctorSpecialityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorSpeciality to update in case it exists.
     */
    where: DoctorSpecialityWhereUniqueInput
    /**
     * In case the DoctorSpeciality found by the `where` argument doesn't exist, create a new DoctorSpeciality with this data.
     */
    create: XOR<DoctorSpecialityCreateInput, DoctorSpecialityUncheckedCreateInput>
    /**
     * In case the DoctorSpeciality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorSpecialityUpdateInput, DoctorSpecialityUncheckedUpdateInput>
  }

  /**
   * DoctorSpeciality delete
   */
  export type DoctorSpecialityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
    /**
     * Filter which DoctorSpeciality to delete.
     */
    where: DoctorSpecialityWhereUniqueInput
  }

  /**
   * DoctorSpeciality deleteMany
   */
  export type DoctorSpecialityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorSpecialities to delete
     */
    where?: DoctorSpecialityWhereInput
    /**
     * Limit how many DoctorSpecialities to delete.
     */
    limit?: number
  }

  /**
   * DoctorSpeciality without action
   */
  export type DoctorSpecialityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSpeciality
     */
    select?: DoctorSpecialitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSpeciality
     */
    omit?: DoctorSpecialityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSpecialityInclude<ExtArgs> | null
  }


  /**
   * Model Experience
   */

  export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  export type ExperienceMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    experienceType: $Enums.ExperienceType | null
    title: string | null
    institution: string | null
    startDate: Date | null
    endDate: Date | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ExperienceMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    experienceType: $Enums.ExperienceType | null
    title: string | null
    institution: string | null
    startDate: Date | null
    endDate: Date | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ExperienceCountAggregateOutputType = {
    id: number
    doctorId: number
    experienceType: number
    title: number
    institution: number
    startDate: number
    endDate: number
    description: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ExperienceMinAggregateInputType = {
    id?: true
    doctorId?: true
    experienceType?: true
    title?: true
    institution?: true
    startDate?: true
    endDate?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ExperienceMaxAggregateInputType = {
    id?: true
    doctorId?: true
    experienceType?: true
    title?: true
    institution?: true
    startDate?: true
    endDate?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ExperienceCountAggregateInputType = {
    id?: true
    doctorId?: true
    experienceType?: true
    title?: true
    institution?: true
    startDate?: true
    endDate?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experience to aggregate.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Experiences
    **/
    _count?: true | ExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperienceMaxAggregateInputType
  }

  export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperience[P]>
      : GetScalarType<T[P], AggregateExperience[P]>
  }




  export type ExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperienceWhereInput
    orderBy?: ExperienceOrderByWithAggregationInput | ExperienceOrderByWithAggregationInput[]
    by: ExperienceScalarFieldEnum[] | ExperienceScalarFieldEnum
    having?: ExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperienceCountAggregateInputType | true
    _min?: ExperienceMinAggregateInputType
    _max?: ExperienceMaxAggregateInputType
  }

  export type ExperienceGroupByOutputType = {
    id: string
    doctorId: string
    experienceType: $Enums.ExperienceType
    title: string
    institution: string | null
    startDate: Date | null
    endDate: Date | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ExperienceCountAggregateOutputType | null
    _min: ExperienceMinAggregateOutputType | null
    _max: ExperienceMaxAggregateOutputType | null
  }

  type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
        }
      >
    >


  export type ExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    experienceType?: boolean
    title?: boolean
    institution?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    experienceType?: boolean
    title?: boolean
    institution?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    experienceType?: boolean
    title?: boolean
    institution?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experience"]>

  export type ExperienceSelectScalar = {
    id?: boolean
    doctorId?: boolean
    experienceType?: boolean
    title?: boolean
    institution?: boolean
    startDate?: boolean
    endDate?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "experienceType" | "title" | "institution" | "startDate" | "endDate" | "description" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["experience"]>
  export type ExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type ExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type ExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }

  export type $ExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Experience"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      experienceType: $Enums.ExperienceType
      title: string
      institution: string | null
      startDate: Date | null
      endDate: Date | null
      description: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["experience"]>
    composites: {}
  }

  type ExperienceGetPayload<S extends boolean | null | undefined | ExperienceDefaultArgs> = $Result.GetResult<Prisma.$ExperiencePayload, S>

  type ExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperienceCountAggregateInputType | true
    }

  export interface ExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Experience'], meta: { name: 'Experience' } }
    /**
     * Find zero or one Experience that matches the filter.
     * @param {ExperienceFindUniqueArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperienceFindUniqueArgs>(args: SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Experience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperienceFindUniqueOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperienceFindFirstArgs>(args?: SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Experiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiences
     * const experiences = await prisma.experience.findMany()
     * 
     * // Get first 10 Experiences
     * const experiences = await prisma.experience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experienceWithIdOnly = await prisma.experience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperienceFindManyArgs>(args?: SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Experience.
     * @param {ExperienceCreateArgs} args - Arguments to create a Experience.
     * @example
     * // Create one Experience
     * const Experience = await prisma.experience.create({
     *   data: {
     *     // ... data to create a Experience
     *   }
     * })
     * 
     */
    create<T extends ExperienceCreateArgs>(args: SelectSubset<T, ExperienceCreateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Experiences.
     * @param {ExperienceCreateManyArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperienceCreateManyArgs>(args?: SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Experiences and returns the data saved in the database.
     * @param {ExperienceCreateManyAndReturnArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Experience.
     * @param {ExperienceDeleteArgs} args - Arguments to delete one Experience.
     * @example
     * // Delete one Experience
     * const Experience = await prisma.experience.delete({
     *   where: {
     *     // ... filter to delete one Experience
     *   }
     * })
     * 
     */
    delete<T extends ExperienceDeleteArgs>(args: SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Experience.
     * @param {ExperienceUpdateArgs} args - Arguments to update one Experience.
     * @example
     * // Update one Experience
     * const experience = await prisma.experience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperienceUpdateArgs>(args: SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Experiences.
     * @param {ExperienceDeleteManyArgs} args - Arguments to filter Experiences to delete.
     * @example
     * // Delete a few Experiences
     * const { count } = await prisma.experience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperienceDeleteManyArgs>(args?: SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperienceUpdateManyArgs>(args: SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiences and returns the data updated in the database.
     * @param {ExperienceUpdateManyAndReturnArgs} args - Arguments to update many Experiences.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Experience.
     * @param {ExperienceUpsertArgs} args - Arguments to update or create a Experience.
     * @example
     * // Update or create a Experience
     * const experience = await prisma.experience.upsert({
     *   create: {
     *     // ... data to create a Experience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experience we want to update
     *   }
     * })
     */
    upsert<T extends ExperienceUpsertArgs>(args: SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>): Prisma__ExperienceClient<$Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceCountArgs} args - Arguments to filter Experiences to count.
     * @example
     * // Count the number of Experiences
     * const count = await prisma.experience.count({
     *   where: {
     *     // ... the filter for the Experiences we want to count
     *   }
     * })
    **/
    count<T extends ExperienceCountArgs>(
      args?: Subset<T, ExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExperienceAggregateArgs>(args: Subset<T, ExperienceAggregateArgs>): Prisma.PrismaPromise<GetExperienceAggregateType<T>>

    /**
     * Group by Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperienceGroupByArgs['orderBy'] }
        : { orderBy?: ExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Experience model
   */
  readonly fields: ExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Experience model
   */
  interface ExperienceFieldRefs {
    readonly id: FieldRef<"Experience", 'String'>
    readonly doctorId: FieldRef<"Experience", 'String'>
    readonly experienceType: FieldRef<"Experience", 'ExperienceType'>
    readonly title: FieldRef<"Experience", 'String'>
    readonly institution: FieldRef<"Experience", 'String'>
    readonly startDate: FieldRef<"Experience", 'DateTime'>
    readonly endDate: FieldRef<"Experience", 'DateTime'>
    readonly description: FieldRef<"Experience", 'String'>
    readonly createdAt: FieldRef<"Experience", 'DateTime'>
    readonly updatedAt: FieldRef<"Experience", 'DateTime'>
    readonly deletedAt: FieldRef<"Experience", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Experience findUnique
   */
  export type ExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findUniqueOrThrow
   */
  export type ExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience findFirst
   */
  export type ExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findFirstOrThrow
   */
  export type ExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience findMany
   */
  export type ExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter, which Experiences to fetch.
     */
    where?: ExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiences to fetch.
     */
    orderBy?: ExperienceOrderByWithRelationInput | ExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Experiences.
     */
    cursor?: ExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiences.
     */
    skip?: number
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[]
  }

  /**
   * Experience create
   */
  export type ExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a Experience.
     */
    data: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
  }

  /**
   * Experience createMany
   */
  export type ExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Experience createManyAndReturn
   */
  export type ExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Experience update
   */
  export type ExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a Experience.
     */
    data: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
    /**
     * Choose, which Experience to update.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience updateMany
   */
  export type ExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
  }

  /**
   * Experience updateManyAndReturn
   */
  export type ExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * The data used to update Experiences.
     */
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyInput>
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Experience upsert
   */
  export type ExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the Experience to update in case it exists.
     */
    where: ExperienceWhereUniqueInput
    /**
     * In case the Experience found by the `where` argument doesn't exist, create a new Experience with this data.
     */
    create: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>
    /**
     * In case the Experience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>
  }

  /**
   * Experience delete
   */
  export type ExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
    /**
     * Filter which Experience to delete.
     */
    where: ExperienceWhereUniqueInput
  }

  /**
   * Experience deleteMany
   */
  export type ExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiences to delete
     */
    where?: ExperienceWhereInput
    /**
     * Limit how many Experiences to delete.
     */
    limit?: number
  }

  /**
   * Experience without action
   */
  export type ExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null
  }


  /**
   * Model Clinic
   */

  export type AggregateClinic = {
    _count: ClinicCountAggregateOutputType | null
    _avg: ClinicAvgAggregateOutputType | null
    _sum: ClinicSumAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  export type ClinicAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type ClinicSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type ClinicMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    country: string | null
    city: string | null
    neighborhood: string | null
    latitude: number | null
    longitude: number | null
    isVirtual: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ClinicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    country: string | null
    city: string | null
    neighborhood: string | null
    latitude: number | null
    longitude: number | null
    isVirtual: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ClinicCountAggregateOutputType = {
    id: number
    name: number
    address: number
    country: number
    city: number
    neighborhood: number
    latitude: number
    longitude: number
    isVirtual: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ClinicAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type ClinicSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type ClinicMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    country?: true
    city?: true
    neighborhood?: true
    latitude?: true
    longitude?: true
    isVirtual?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ClinicMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    country?: true
    city?: true
    neighborhood?: true
    latitude?: true
    longitude?: true
    isVirtual?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ClinicCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    country?: true
    city?: true
    neighborhood?: true
    latitude?: true
    longitude?: true
    isVirtual?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinic to aggregate.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clinics
    **/
    _count?: true | ClinicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClinicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClinicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicMaxAggregateInputType
  }

  export type GetClinicAggregateType<T extends ClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateClinic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinic[P]>
      : GetScalarType<T[P], AggregateClinic[P]>
  }




  export type ClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWhereInput
    orderBy?: ClinicOrderByWithAggregationInput | ClinicOrderByWithAggregationInput[]
    by: ClinicScalarFieldEnum[] | ClinicScalarFieldEnum
    having?: ClinicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicCountAggregateInputType | true
    _avg?: ClinicAvgAggregateInputType
    _sum?: ClinicSumAggregateInputType
    _min?: ClinicMinAggregateInputType
    _max?: ClinicMaxAggregateInputType
  }

  export type ClinicGroupByOutputType = {
    id: string
    name: string
    address: string | null
    country: string | null
    city: string | null
    neighborhood: string | null
    latitude: number | null
    longitude: number | null
    isVirtual: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ClinicCountAggregateOutputType | null
    _avg: ClinicAvgAggregateOutputType | null
    _sum: ClinicSumAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  type GetClinicGroupByPayload<T extends ClinicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    neighborhood?: boolean
    latitude?: boolean
    longitude?: boolean
    isVirtual?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctorLinks?: boolean | Clinic$doctorLinksArgs<ExtArgs>
    pricing?: boolean | Clinic$pricingArgs<ExtArgs>
    appointments?: boolean | Clinic$appointmentsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    neighborhood?: boolean
    latitude?: boolean
    longitude?: boolean
    isVirtual?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    neighborhood?: boolean
    latitude?: boolean
    longitude?: boolean
    isVirtual?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    country?: boolean
    city?: boolean
    neighborhood?: boolean
    latitude?: boolean
    longitude?: boolean
    isVirtual?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "country" | "city" | "neighborhood" | "latitude" | "longitude" | "isVirtual" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["clinic"]>
  export type ClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorLinks?: boolean | Clinic$doctorLinksArgs<ExtArgs>
    pricing?: boolean | Clinic$pricingArgs<ExtArgs>
    appointments?: boolean | Clinic$appointmentsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clinic"
    objects: {
      doctorLinks: Prisma.$DoctorClinicPayload<ExtArgs>[]
      pricing: Prisma.$PricingPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      country: string | null
      city: string | null
      neighborhood: string | null
      latitude: number | null
      longitude: number | null
      isVirtual: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["clinic"]>
    composites: {}
  }

  type ClinicGetPayload<S extends boolean | null | undefined | ClinicDefaultArgs> = $Result.GetResult<Prisma.$ClinicPayload, S>

  type ClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicCountAggregateInputType | true
    }

  export interface ClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinic'], meta: { name: 'Clinic' } }
    /**
     * Find zero or one Clinic that matches the filter.
     * @param {ClinicFindUniqueArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicFindUniqueArgs>(args: SelectSubset<T, ClinicFindUniqueArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicFindUniqueOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicFindFirstArgs>(args?: SelectSubset<T, ClinicFindFirstArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinics
     * const clinics = await prisma.clinic.findMany()
     * 
     * // Get first 10 Clinics
     * const clinics = await prisma.clinic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicWithIdOnly = await prisma.clinic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicFindManyArgs>(args?: SelectSubset<T, ClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinic.
     * @param {ClinicCreateArgs} args - Arguments to create a Clinic.
     * @example
     * // Create one Clinic
     * const Clinic = await prisma.clinic.create({
     *   data: {
     *     // ... data to create a Clinic
     *   }
     * })
     * 
     */
    create<T extends ClinicCreateArgs>(args: SelectSubset<T, ClinicCreateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinics.
     * @param {ClinicCreateManyArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicCreateManyArgs>(args?: SelectSubset<T, ClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinics and returns the data saved in the database.
     * @param {ClinicCreateManyAndReturnArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinic.
     * @param {ClinicDeleteArgs} args - Arguments to delete one Clinic.
     * @example
     * // Delete one Clinic
     * const Clinic = await prisma.clinic.delete({
     *   where: {
     *     // ... filter to delete one Clinic
     *   }
     * })
     * 
     */
    delete<T extends ClinicDeleteArgs>(args: SelectSubset<T, ClinicDeleteArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinic.
     * @param {ClinicUpdateArgs} args - Arguments to update one Clinic.
     * @example
     * // Update one Clinic
     * const clinic = await prisma.clinic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicUpdateArgs>(args: SelectSubset<T, ClinicUpdateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinics.
     * @param {ClinicDeleteManyArgs} args - Arguments to filter Clinics to delete.
     * @example
     * // Delete a few Clinics
     * const { count } = await prisma.clinic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicDeleteManyArgs>(args?: SelectSubset<T, ClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicUpdateManyArgs>(args: SelectSubset<T, ClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics and returns the data updated in the database.
     * @param {ClinicUpdateManyAndReturnArgs} args - Arguments to update many Clinics.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinic.
     * @param {ClinicUpsertArgs} args - Arguments to update or create a Clinic.
     * @example
     * // Update or create a Clinic
     * const clinic = await prisma.clinic.upsert({
     *   create: {
     *     // ... data to create a Clinic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinic we want to update
     *   }
     * })
     */
    upsert<T extends ClinicUpsertArgs>(args: SelectSubset<T, ClinicUpsertArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCountArgs} args - Arguments to filter Clinics to count.
     * @example
     * // Count the number of Clinics
     * const count = await prisma.clinic.count({
     *   where: {
     *     // ... the filter for the Clinics we want to count
     *   }
     * })
    **/
    count<T extends ClinicCountArgs>(
      args?: Subset<T, ClinicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicAggregateArgs>(args: Subset<T, ClinicAggregateArgs>): Prisma.PrismaPromise<GetClinicAggregateType<T>>

    /**
     * Group by Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicGroupByArgs['orderBy'] }
        : { orderBy?: ClinicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clinic model
   */
  readonly fields: ClinicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clinic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctorLinks<T extends Clinic$doctorLinksArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$doctorLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pricing<T extends Clinic$pricingArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$pricingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Clinic$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clinic model
   */
  interface ClinicFieldRefs {
    readonly id: FieldRef<"Clinic", 'String'>
    readonly name: FieldRef<"Clinic", 'String'>
    readonly address: FieldRef<"Clinic", 'String'>
    readonly country: FieldRef<"Clinic", 'String'>
    readonly city: FieldRef<"Clinic", 'String'>
    readonly neighborhood: FieldRef<"Clinic", 'String'>
    readonly latitude: FieldRef<"Clinic", 'Float'>
    readonly longitude: FieldRef<"Clinic", 'Float'>
    readonly isVirtual: FieldRef<"Clinic", 'Boolean'>
    readonly createdAt: FieldRef<"Clinic", 'DateTime'>
    readonly updatedAt: FieldRef<"Clinic", 'DateTime'>
    readonly deletedAt: FieldRef<"Clinic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clinic findUnique
   */
  export type ClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findUniqueOrThrow
   */
  export type ClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findFirst
   */
  export type ClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findFirstOrThrow
   */
  export type ClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findMany
   */
  export type ClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinics to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic create
   */
  export type ClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to create a Clinic.
     */
    data: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
  }

  /**
   * Clinic createMany
   */
  export type ClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic createManyAndReturn
   */
  export type ClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic update
   */
  export type ClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to update a Clinic.
     */
    data: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
    /**
     * Choose, which Clinic to update.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic updateMany
   */
  export type ClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic updateManyAndReturn
   */
  export type ClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic upsert
   */
  export type ClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The filter to search for the Clinic to update in case it exists.
     */
    where: ClinicWhereUniqueInput
    /**
     * In case the Clinic found by the `where` argument doesn't exist, create a new Clinic with this data.
     */
    create: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
    /**
     * In case the Clinic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
  }

  /**
   * Clinic delete
   */
  export type ClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter which Clinic to delete.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic deleteMany
   */
  export type ClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinics to delete
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to delete.
     */
    limit?: number
  }

  /**
   * Clinic.doctorLinks
   */
  export type Clinic$doctorLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    where?: DoctorClinicWhereInput
    orderBy?: DoctorClinicOrderByWithRelationInput | DoctorClinicOrderByWithRelationInput[]
    cursor?: DoctorClinicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorClinicScalarFieldEnum | DoctorClinicScalarFieldEnum[]
  }

  /**
   * Clinic.pricing
   */
  export type Clinic$pricingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    where?: PricingWhereInput
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    cursor?: PricingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Clinic.appointments
   */
  export type Clinic$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Clinic without action
   */
  export type ClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
  }


  /**
   * Model DoctorClinic
   */

  export type AggregateDoctorClinic = {
    _count: DoctorClinicCountAggregateOutputType | null
    _min: DoctorClinicMinAggregateOutputType | null
    _max: DoctorClinicMaxAggregateOutputType | null
  }

  export type DoctorClinicMinAggregateOutputType = {
    doctorId: string | null
    clinicId: string | null
    createdAt: Date | null
  }

  export type DoctorClinicMaxAggregateOutputType = {
    doctorId: string | null
    clinicId: string | null
    createdAt: Date | null
  }

  export type DoctorClinicCountAggregateOutputType = {
    doctorId: number
    clinicId: number
    createdAt: number
    _all: number
  }


  export type DoctorClinicMinAggregateInputType = {
    doctorId?: true
    clinicId?: true
    createdAt?: true
  }

  export type DoctorClinicMaxAggregateInputType = {
    doctorId?: true
    clinicId?: true
    createdAt?: true
  }

  export type DoctorClinicCountAggregateInputType = {
    doctorId?: true
    clinicId?: true
    createdAt?: true
    _all?: true
  }

  export type DoctorClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorClinic to aggregate.
     */
    where?: DoctorClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorClinics to fetch.
     */
    orderBy?: DoctorClinicOrderByWithRelationInput | DoctorClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorClinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorClinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorClinics
    **/
    _count?: true | DoctorClinicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorClinicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorClinicMaxAggregateInputType
  }

  export type GetDoctorClinicAggregateType<T extends DoctorClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorClinic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorClinic[P]>
      : GetScalarType<T[P], AggregateDoctorClinic[P]>
  }




  export type DoctorClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorClinicWhereInput
    orderBy?: DoctorClinicOrderByWithAggregationInput | DoctorClinicOrderByWithAggregationInput[]
    by: DoctorClinicScalarFieldEnum[] | DoctorClinicScalarFieldEnum
    having?: DoctorClinicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorClinicCountAggregateInputType | true
    _min?: DoctorClinicMinAggregateInputType
    _max?: DoctorClinicMaxAggregateInputType
  }

  export type DoctorClinicGroupByOutputType = {
    doctorId: string
    clinicId: string
    createdAt: Date
    _count: DoctorClinicCountAggregateOutputType | null
    _min: DoctorClinicMinAggregateOutputType | null
    _max: DoctorClinicMaxAggregateOutputType | null
  }

  type GetDoctorClinicGroupByPayload<T extends DoctorClinicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorClinicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorClinicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorClinicGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorClinicGroupByOutputType[P]>
        }
      >
    >


  export type DoctorClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctorId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorClinic"]>

  export type DoctorClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctorId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorClinic"]>

  export type DoctorClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    doctorId?: boolean
    clinicId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorClinic"]>

  export type DoctorClinicSelectScalar = {
    doctorId?: boolean
    clinicId?: boolean
    createdAt?: boolean
  }

  export type DoctorClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"doctorId" | "clinicId" | "createdAt", ExtArgs["result"]["doctorClinic"]>
  export type DoctorClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type DoctorClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type DoctorClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $DoctorClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorClinic"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      clinic: Prisma.$ClinicPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      doctorId: string
      clinicId: string
      createdAt: Date
    }, ExtArgs["result"]["doctorClinic"]>
    composites: {}
  }

  type DoctorClinicGetPayload<S extends boolean | null | undefined | DoctorClinicDefaultArgs> = $Result.GetResult<Prisma.$DoctorClinicPayload, S>

  type DoctorClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorClinicCountAggregateInputType | true
    }

  export interface DoctorClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorClinic'], meta: { name: 'DoctorClinic' } }
    /**
     * Find zero or one DoctorClinic that matches the filter.
     * @param {DoctorClinicFindUniqueArgs} args - Arguments to find a DoctorClinic
     * @example
     * // Get one DoctorClinic
     * const doctorClinic = await prisma.doctorClinic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorClinicFindUniqueArgs>(args: SelectSubset<T, DoctorClinicFindUniqueArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorClinic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorClinicFindUniqueOrThrowArgs} args - Arguments to find a DoctorClinic
     * @example
     * // Get one DoctorClinic
     * const doctorClinic = await prisma.doctorClinic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorClinic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicFindFirstArgs} args - Arguments to find a DoctorClinic
     * @example
     * // Get one DoctorClinic
     * const doctorClinic = await prisma.doctorClinic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorClinicFindFirstArgs>(args?: SelectSubset<T, DoctorClinicFindFirstArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorClinic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicFindFirstOrThrowArgs} args - Arguments to find a DoctorClinic
     * @example
     * // Get one DoctorClinic
     * const doctorClinic = await prisma.doctorClinic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorClinics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorClinics
     * const doctorClinics = await prisma.doctorClinic.findMany()
     * 
     * // Get first 10 DoctorClinics
     * const doctorClinics = await prisma.doctorClinic.findMany({ take: 10 })
     * 
     * // Only select the `doctorId`
     * const doctorClinicWithDoctorIdOnly = await prisma.doctorClinic.findMany({ select: { doctorId: true } })
     * 
     */
    findMany<T extends DoctorClinicFindManyArgs>(args?: SelectSubset<T, DoctorClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorClinic.
     * @param {DoctorClinicCreateArgs} args - Arguments to create a DoctorClinic.
     * @example
     * // Create one DoctorClinic
     * const DoctorClinic = await prisma.doctorClinic.create({
     *   data: {
     *     // ... data to create a DoctorClinic
     *   }
     * })
     * 
     */
    create<T extends DoctorClinicCreateArgs>(args: SelectSubset<T, DoctorClinicCreateArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorClinics.
     * @param {DoctorClinicCreateManyArgs} args - Arguments to create many DoctorClinics.
     * @example
     * // Create many DoctorClinics
     * const doctorClinic = await prisma.doctorClinic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorClinicCreateManyArgs>(args?: SelectSubset<T, DoctorClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorClinics and returns the data saved in the database.
     * @param {DoctorClinicCreateManyAndReturnArgs} args - Arguments to create many DoctorClinics.
     * @example
     * // Create many DoctorClinics
     * const doctorClinic = await prisma.doctorClinic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorClinics and only return the `doctorId`
     * const doctorClinicWithDoctorIdOnly = await prisma.doctorClinic.createManyAndReturn({
     *   select: { doctorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorClinic.
     * @param {DoctorClinicDeleteArgs} args - Arguments to delete one DoctorClinic.
     * @example
     * // Delete one DoctorClinic
     * const DoctorClinic = await prisma.doctorClinic.delete({
     *   where: {
     *     // ... filter to delete one DoctorClinic
     *   }
     * })
     * 
     */
    delete<T extends DoctorClinicDeleteArgs>(args: SelectSubset<T, DoctorClinicDeleteArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorClinic.
     * @param {DoctorClinicUpdateArgs} args - Arguments to update one DoctorClinic.
     * @example
     * // Update one DoctorClinic
     * const doctorClinic = await prisma.doctorClinic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorClinicUpdateArgs>(args: SelectSubset<T, DoctorClinicUpdateArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorClinics.
     * @param {DoctorClinicDeleteManyArgs} args - Arguments to filter DoctorClinics to delete.
     * @example
     * // Delete a few DoctorClinics
     * const { count } = await prisma.doctorClinic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorClinicDeleteManyArgs>(args?: SelectSubset<T, DoctorClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorClinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorClinics
     * const doctorClinic = await prisma.doctorClinic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorClinicUpdateManyArgs>(args: SelectSubset<T, DoctorClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorClinics and returns the data updated in the database.
     * @param {DoctorClinicUpdateManyAndReturnArgs} args - Arguments to update many DoctorClinics.
     * @example
     * // Update many DoctorClinics
     * const doctorClinic = await prisma.doctorClinic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorClinics and only return the `doctorId`
     * const doctorClinicWithDoctorIdOnly = await prisma.doctorClinic.updateManyAndReturn({
     *   select: { doctorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorClinic.
     * @param {DoctorClinicUpsertArgs} args - Arguments to update or create a DoctorClinic.
     * @example
     * // Update or create a DoctorClinic
     * const doctorClinic = await prisma.doctorClinic.upsert({
     *   create: {
     *     // ... data to create a DoctorClinic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorClinic we want to update
     *   }
     * })
     */
    upsert<T extends DoctorClinicUpsertArgs>(args: SelectSubset<T, DoctorClinicUpsertArgs<ExtArgs>>): Prisma__DoctorClinicClient<$Result.GetResult<Prisma.$DoctorClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorClinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicCountArgs} args - Arguments to filter DoctorClinics to count.
     * @example
     * // Count the number of DoctorClinics
     * const count = await prisma.doctorClinic.count({
     *   where: {
     *     // ... the filter for the DoctorClinics we want to count
     *   }
     * })
    **/
    count<T extends DoctorClinicCountArgs>(
      args?: Subset<T, DoctorClinicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorClinicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorClinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorClinicAggregateArgs>(args: Subset<T, DoctorClinicAggregateArgs>): Prisma.PrismaPromise<GetDoctorClinicAggregateType<T>>

    /**
     * Group by DoctorClinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorClinicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorClinicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorClinicGroupByArgs['orderBy'] }
        : { orderBy?: DoctorClinicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorClinic model
   */
  readonly fields: DoctorClinicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorClinic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorClinic model
   */
  interface DoctorClinicFieldRefs {
    readonly doctorId: FieldRef<"DoctorClinic", 'String'>
    readonly clinicId: FieldRef<"DoctorClinic", 'String'>
    readonly createdAt: FieldRef<"DoctorClinic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorClinic findUnique
   */
  export type DoctorClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * Filter, which DoctorClinic to fetch.
     */
    where: DoctorClinicWhereUniqueInput
  }

  /**
   * DoctorClinic findUniqueOrThrow
   */
  export type DoctorClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * Filter, which DoctorClinic to fetch.
     */
    where: DoctorClinicWhereUniqueInput
  }

  /**
   * DoctorClinic findFirst
   */
  export type DoctorClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * Filter, which DoctorClinic to fetch.
     */
    where?: DoctorClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorClinics to fetch.
     */
    orderBy?: DoctorClinicOrderByWithRelationInput | DoctorClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorClinics.
     */
    cursor?: DoctorClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorClinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorClinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorClinics.
     */
    distinct?: DoctorClinicScalarFieldEnum | DoctorClinicScalarFieldEnum[]
  }

  /**
   * DoctorClinic findFirstOrThrow
   */
  export type DoctorClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * Filter, which DoctorClinic to fetch.
     */
    where?: DoctorClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorClinics to fetch.
     */
    orderBy?: DoctorClinicOrderByWithRelationInput | DoctorClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorClinics.
     */
    cursor?: DoctorClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorClinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorClinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorClinics.
     */
    distinct?: DoctorClinicScalarFieldEnum | DoctorClinicScalarFieldEnum[]
  }

  /**
   * DoctorClinic findMany
   */
  export type DoctorClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * Filter, which DoctorClinics to fetch.
     */
    where?: DoctorClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorClinics to fetch.
     */
    orderBy?: DoctorClinicOrderByWithRelationInput | DoctorClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorClinics.
     */
    cursor?: DoctorClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorClinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorClinics.
     */
    skip?: number
    distinct?: DoctorClinicScalarFieldEnum | DoctorClinicScalarFieldEnum[]
  }

  /**
   * DoctorClinic create
   */
  export type DoctorClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorClinic.
     */
    data: XOR<DoctorClinicCreateInput, DoctorClinicUncheckedCreateInput>
  }

  /**
   * DoctorClinic createMany
   */
  export type DoctorClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorClinics.
     */
    data: DoctorClinicCreateManyInput | DoctorClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorClinic createManyAndReturn
   */
  export type DoctorClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorClinics.
     */
    data: DoctorClinicCreateManyInput | DoctorClinicCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorClinic update
   */
  export type DoctorClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorClinic.
     */
    data: XOR<DoctorClinicUpdateInput, DoctorClinicUncheckedUpdateInput>
    /**
     * Choose, which DoctorClinic to update.
     */
    where: DoctorClinicWhereUniqueInput
  }

  /**
   * DoctorClinic updateMany
   */
  export type DoctorClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorClinics.
     */
    data: XOR<DoctorClinicUpdateManyMutationInput, DoctorClinicUncheckedUpdateManyInput>
    /**
     * Filter which DoctorClinics to update
     */
    where?: DoctorClinicWhereInput
    /**
     * Limit how many DoctorClinics to update.
     */
    limit?: number
  }

  /**
   * DoctorClinic updateManyAndReturn
   */
  export type DoctorClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * The data used to update DoctorClinics.
     */
    data: XOR<DoctorClinicUpdateManyMutationInput, DoctorClinicUncheckedUpdateManyInput>
    /**
     * Filter which DoctorClinics to update
     */
    where?: DoctorClinicWhereInput
    /**
     * Limit how many DoctorClinics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorClinic upsert
   */
  export type DoctorClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorClinic to update in case it exists.
     */
    where: DoctorClinicWhereUniqueInput
    /**
     * In case the DoctorClinic found by the `where` argument doesn't exist, create a new DoctorClinic with this data.
     */
    create: XOR<DoctorClinicCreateInput, DoctorClinicUncheckedCreateInput>
    /**
     * In case the DoctorClinic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorClinicUpdateInput, DoctorClinicUncheckedUpdateInput>
  }

  /**
   * DoctorClinic delete
   */
  export type DoctorClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
    /**
     * Filter which DoctorClinic to delete.
     */
    where: DoctorClinicWhereUniqueInput
  }

  /**
   * DoctorClinic deleteMany
   */
  export type DoctorClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorClinics to delete
     */
    where?: DoctorClinicWhereInput
    /**
     * Limit how many DoctorClinics to delete.
     */
    limit?: number
  }

  /**
   * DoctorClinic without action
   */
  export type DoctorClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorClinic
     */
    select?: DoctorClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorClinic
     */
    omit?: DoctorClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorClinicInclude<ExtArgs> | null
  }


  /**
   * Model Pricing
   */

  export type AggregatePricing = {
    _count: PricingCountAggregateOutputType | null
    _avg: PricingAvgAggregateOutputType | null
    _sum: PricingSumAggregateOutputType | null
    _min: PricingMinAggregateOutputType | null
    _max: PricingMaxAggregateOutputType | null
  }

  export type PricingAvgAggregateOutputType = {
    price: Decimal | null
    durationMinutes: number | null
  }

  export type PricingSumAggregateOutputType = {
    price: Decimal | null
    durationMinutes: number | null
  }

  export type PricingMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    clinicId: string | null
    title: string | null
    price: Decimal | null
    currency: string | null
    durationMinutes: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PricingMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    clinicId: string | null
    title: string | null
    price: Decimal | null
    currency: string | null
    durationMinutes: number | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PricingCountAggregateOutputType = {
    id: number
    doctorId: number
    clinicId: number
    title: number
    price: number
    currency: number
    durationMinutes: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PricingAvgAggregateInputType = {
    price?: true
    durationMinutes?: true
  }

  export type PricingSumAggregateInputType = {
    price?: true
    durationMinutes?: true
  }

  export type PricingMinAggregateInputType = {
    id?: true
    doctorId?: true
    clinicId?: true
    title?: true
    price?: true
    currency?: true
    durationMinutes?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PricingMaxAggregateInputType = {
    id?: true
    doctorId?: true
    clinicId?: true
    title?: true
    price?: true
    currency?: true
    durationMinutes?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PricingCountAggregateInputType = {
    id?: true
    doctorId?: true
    clinicId?: true
    title?: true
    price?: true
    currency?: true
    durationMinutes?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PricingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pricing to aggregate.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pricings
    **/
    _count?: true | PricingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingMaxAggregateInputType
  }

  export type GetPricingAggregateType<T extends PricingAggregateArgs> = {
        [P in keyof T & keyof AggregatePricing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricing[P]>
      : GetScalarType<T[P], AggregatePricing[P]>
  }




  export type PricingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingWhereInput
    orderBy?: PricingOrderByWithAggregationInput | PricingOrderByWithAggregationInput[]
    by: PricingScalarFieldEnum[] | PricingScalarFieldEnum
    having?: PricingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingCountAggregateInputType | true
    _avg?: PricingAvgAggregateInputType
    _sum?: PricingSumAggregateInputType
    _min?: PricingMinAggregateInputType
    _max?: PricingMaxAggregateInputType
  }

  export type PricingGroupByOutputType = {
    id: string
    doctorId: string
    clinicId: string
    title: string
    price: Decimal
    currency: string
    durationMinutes: number
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PricingCountAggregateOutputType | null
    _avg: PricingAvgAggregateOutputType | null
    _sum: PricingSumAggregateOutputType | null
    _min: PricingMinAggregateOutputType | null
    _max: PricingMaxAggregateOutputType | null
  }

  type GetPricingGroupByPayload<T extends PricingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingGroupByOutputType[P]>
            : GetScalarType<T[P], PricingGroupByOutputType[P]>
        }
      >
    >


  export type PricingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    clinicId?: boolean
    title?: boolean
    price?: boolean
    currency?: boolean
    durationMinutes?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    appointments?: boolean | Pricing$appointmentsArgs<ExtArgs>
    _count?: boolean | PricingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricing"]>

  export type PricingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    clinicId?: boolean
    title?: boolean
    price?: boolean
    currency?: boolean
    durationMinutes?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricing"]>

  export type PricingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    clinicId?: boolean
    title?: boolean
    price?: boolean
    currency?: boolean
    durationMinutes?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pricing"]>

  export type PricingSelectScalar = {
    id?: boolean
    doctorId?: boolean
    clinicId?: boolean
    title?: boolean
    price?: boolean
    currency?: boolean
    durationMinutes?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type PricingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "clinicId" | "title" | "price" | "currency" | "durationMinutes" | "description" | "isActive" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["pricing"]>
  export type PricingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    appointments?: boolean | Pricing$appointmentsArgs<ExtArgs>
    _count?: boolean | PricingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PricingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type PricingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $PricingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pricing"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      clinic: Prisma.$ClinicPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      clinicId: string
      title: string
      price: Prisma.Decimal
      currency: string
      durationMinutes: number
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["pricing"]>
    composites: {}
  }

  type PricingGetPayload<S extends boolean | null | undefined | PricingDefaultArgs> = $Result.GetResult<Prisma.$PricingPayload, S>

  type PricingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PricingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PricingCountAggregateInputType | true
    }

  export interface PricingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pricing'], meta: { name: 'Pricing' } }
    /**
     * Find zero or one Pricing that matches the filter.
     * @param {PricingFindUniqueArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingFindUniqueArgs>(args: SelectSubset<T, PricingFindUniqueArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pricing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PricingFindUniqueOrThrowArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pricing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFindFirstArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingFindFirstArgs>(args?: SelectSubset<T, PricingFindFirstArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pricing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFindFirstOrThrowArgs} args - Arguments to find a Pricing
     * @example
     * // Get one Pricing
     * const pricing = await prisma.pricing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pricings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pricings
     * const pricings = await prisma.pricing.findMany()
     * 
     * // Get first 10 Pricings
     * const pricings = await prisma.pricing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingWithIdOnly = await prisma.pricing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingFindManyArgs>(args?: SelectSubset<T, PricingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pricing.
     * @param {PricingCreateArgs} args - Arguments to create a Pricing.
     * @example
     * // Create one Pricing
     * const Pricing = await prisma.pricing.create({
     *   data: {
     *     // ... data to create a Pricing
     *   }
     * })
     * 
     */
    create<T extends PricingCreateArgs>(args: SelectSubset<T, PricingCreateArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pricings.
     * @param {PricingCreateManyArgs} args - Arguments to create many Pricings.
     * @example
     * // Create many Pricings
     * const pricing = await prisma.pricing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingCreateManyArgs>(args?: SelectSubset<T, PricingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pricings and returns the data saved in the database.
     * @param {PricingCreateManyAndReturnArgs} args - Arguments to create many Pricings.
     * @example
     * // Create many Pricings
     * const pricing = await prisma.pricing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pricings and only return the `id`
     * const pricingWithIdOnly = await prisma.pricing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PricingCreateManyAndReturnArgs>(args?: SelectSubset<T, PricingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pricing.
     * @param {PricingDeleteArgs} args - Arguments to delete one Pricing.
     * @example
     * // Delete one Pricing
     * const Pricing = await prisma.pricing.delete({
     *   where: {
     *     // ... filter to delete one Pricing
     *   }
     * })
     * 
     */
    delete<T extends PricingDeleteArgs>(args: SelectSubset<T, PricingDeleteArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pricing.
     * @param {PricingUpdateArgs} args - Arguments to update one Pricing.
     * @example
     * // Update one Pricing
     * const pricing = await prisma.pricing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingUpdateArgs>(args: SelectSubset<T, PricingUpdateArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pricings.
     * @param {PricingDeleteManyArgs} args - Arguments to filter Pricings to delete.
     * @example
     * // Delete a few Pricings
     * const { count } = await prisma.pricing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingDeleteManyArgs>(args?: SelectSubset<T, PricingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pricings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pricings
     * const pricing = await prisma.pricing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingUpdateManyArgs>(args: SelectSubset<T, PricingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pricings and returns the data updated in the database.
     * @param {PricingUpdateManyAndReturnArgs} args - Arguments to update many Pricings.
     * @example
     * // Update many Pricings
     * const pricing = await prisma.pricing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pricings and only return the `id`
     * const pricingWithIdOnly = await prisma.pricing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PricingUpdateManyAndReturnArgs>(args: SelectSubset<T, PricingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pricing.
     * @param {PricingUpsertArgs} args - Arguments to update or create a Pricing.
     * @example
     * // Update or create a Pricing
     * const pricing = await prisma.pricing.upsert({
     *   create: {
     *     // ... data to create a Pricing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pricing we want to update
     *   }
     * })
     */
    upsert<T extends PricingUpsertArgs>(args: SelectSubset<T, PricingUpsertArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pricings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingCountArgs} args - Arguments to filter Pricings to count.
     * @example
     * // Count the number of Pricings
     * const count = await prisma.pricing.count({
     *   where: {
     *     // ... the filter for the Pricings we want to count
     *   }
     * })
    **/
    count<T extends PricingCountArgs>(
      args?: Subset<T, PricingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pricing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PricingAggregateArgs>(args: Subset<T, PricingAggregateArgs>): Prisma.PrismaPromise<GetPricingAggregateType<T>>

    /**
     * Group by Pricing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PricingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingGroupByArgs['orderBy'] }
        : { orderBy?: PricingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PricingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pricing model
   */
  readonly fields: PricingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pricing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointments<T extends Pricing$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Pricing$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pricing model
   */
  interface PricingFieldRefs {
    readonly id: FieldRef<"Pricing", 'String'>
    readonly doctorId: FieldRef<"Pricing", 'String'>
    readonly clinicId: FieldRef<"Pricing", 'String'>
    readonly title: FieldRef<"Pricing", 'String'>
    readonly price: FieldRef<"Pricing", 'Decimal'>
    readonly currency: FieldRef<"Pricing", 'String'>
    readonly durationMinutes: FieldRef<"Pricing", 'Int'>
    readonly description: FieldRef<"Pricing", 'String'>
    readonly isActive: FieldRef<"Pricing", 'Boolean'>
    readonly createdAt: FieldRef<"Pricing", 'DateTime'>
    readonly updatedAt: FieldRef<"Pricing", 'DateTime'>
    readonly deletedAt: FieldRef<"Pricing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pricing findUnique
   */
  export type PricingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing findUniqueOrThrow
   */
  export type PricingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing findFirst
   */
  export type PricingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pricings.
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pricings.
     */
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Pricing findFirstOrThrow
   */
  export type PricingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * Filter, which Pricing to fetch.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pricings.
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pricings.
     */
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Pricing findMany
   */
  export type PricingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * Filter, which Pricings to fetch.
     */
    where?: PricingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pricings to fetch.
     */
    orderBy?: PricingOrderByWithRelationInput | PricingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pricings.
     */
    cursor?: PricingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pricings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pricings.
     */
    skip?: number
    distinct?: PricingScalarFieldEnum | PricingScalarFieldEnum[]
  }

  /**
   * Pricing create
   */
  export type PricingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * The data needed to create a Pricing.
     */
    data: XOR<PricingCreateInput, PricingUncheckedCreateInput>
  }

  /**
   * Pricing createMany
   */
  export type PricingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pricings.
     */
    data: PricingCreateManyInput | PricingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pricing createManyAndReturn
   */
  export type PricingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The data used to create many Pricings.
     */
    data: PricingCreateManyInput | PricingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pricing update
   */
  export type PricingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * The data needed to update a Pricing.
     */
    data: XOR<PricingUpdateInput, PricingUncheckedUpdateInput>
    /**
     * Choose, which Pricing to update.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing updateMany
   */
  export type PricingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pricings.
     */
    data: XOR<PricingUpdateManyMutationInput, PricingUncheckedUpdateManyInput>
    /**
     * Filter which Pricings to update
     */
    where?: PricingWhereInput
    /**
     * Limit how many Pricings to update.
     */
    limit?: number
  }

  /**
   * Pricing updateManyAndReturn
   */
  export type PricingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * The data used to update Pricings.
     */
    data: XOR<PricingUpdateManyMutationInput, PricingUncheckedUpdateManyInput>
    /**
     * Filter which Pricings to update
     */
    where?: PricingWhereInput
    /**
     * Limit how many Pricings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pricing upsert
   */
  export type PricingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * The filter to search for the Pricing to update in case it exists.
     */
    where: PricingWhereUniqueInput
    /**
     * In case the Pricing found by the `where` argument doesn't exist, create a new Pricing with this data.
     */
    create: XOR<PricingCreateInput, PricingUncheckedCreateInput>
    /**
     * In case the Pricing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingUpdateInput, PricingUncheckedUpdateInput>
  }

  /**
   * Pricing delete
   */
  export type PricingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    /**
     * Filter which Pricing to delete.
     */
    where: PricingWhereUniqueInput
  }

  /**
   * Pricing deleteMany
   */
  export type PricingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pricings to delete
     */
    where?: PricingWhereInput
    /**
     * Limit how many Pricings to delete.
     */
    limit?: number
  }

  /**
   * Pricing.appointments
   */
  export type Pricing$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Pricing without action
   */
  export type PricingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    durationMinutes: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    durationMinutes: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    clinicId: string | null
    pricingId: string | null
    datetime: Date | null
    durationMinutes: number | null
    type: $Enums.AppointmentType | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    clinicId: string | null
    pricingId: string | null
    datetime: Date | null
    durationMinutes: number | null
    type: $Enums.AppointmentType | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    doctorId: number
    patientId: number
    clinicId: number
    pricingId: number
    datetime: number
    durationMinutes: number
    type: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    durationMinutes?: true
  }

  export type AppointmentSumAggregateInputType = {
    durationMinutes?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    clinicId?: true
    pricingId?: true
    datetime?: true
    durationMinutes?: true
    type?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    clinicId?: true
    pricingId?: true
    datetime?: true
    durationMinutes?: true
    type?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    clinicId?: true
    pricingId?: true
    datetime?: true
    durationMinutes?: true
    type?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    doctorId: string
    patientId: string
    clinicId: string
    pricingId: string | null
    datetime: Date
    durationMinutes: number
    type: $Enums.AppointmentType
    status: $Enums.AppointmentStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    clinicId?: boolean
    pricingId?: boolean
    datetime?: boolean
    durationMinutes?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    pricing?: boolean | Appointment$pricingArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    clinicId?: boolean
    pricingId?: boolean
    datetime?: boolean
    durationMinutes?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    pricing?: boolean | Appointment$pricingArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    clinicId?: boolean
    pricingId?: boolean
    datetime?: boolean
    durationMinutes?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    pricing?: boolean | Appointment$pricingArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    clinicId?: boolean
    pricingId?: boolean
    datetime?: boolean
    durationMinutes?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "patientId" | "clinicId" | "pricingId" | "datetime" | "durationMinutes" | "type" | "status" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    pricing?: boolean | Appointment$pricingArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    pricing?: boolean | Appointment$pricingArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    pricing?: boolean | Appointment$pricingArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
      clinic: Prisma.$ClinicPayload<ExtArgs>
      pricing: Prisma.$PricingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      patientId: string
      clinicId: string
      pricingId: string | null
      datetime: Date
      durationMinutes: number
      type: $Enums.AppointmentType
      status: $Enums.AppointmentStatus
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pricing<T extends Appointment$pricingArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$pricingArgs<ExtArgs>>): Prisma__PricingClient<$Result.GetResult<Prisma.$PricingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly doctorId: FieldRef<"Appointment", 'String'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly clinicId: FieldRef<"Appointment", 'String'>
    readonly pricingId: FieldRef<"Appointment", 'String'>
    readonly datetime: FieldRef<"Appointment", 'DateTime'>
    readonly durationMinutes: FieldRef<"Appointment", 'Int'>
    readonly type: FieldRef<"Appointment", 'AppointmentType'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
    readonly deletedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment.pricing
   */
  export type Appointment$pricingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pricing
     */
    select?: PricingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pricing
     */
    omit?: PricingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PricingInclude<ExtArgs> | null
    where?: PricingWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Opinion
   */

  export type AggregateOpinion = {
    _count: OpinionCountAggregateOutputType | null
    _avg: OpinionAvgAggregateOutputType | null
    _sum: OpinionSumAggregateOutputType | null
    _min: OpinionMinAggregateOutputType | null
    _max: OpinionMaxAggregateOutputType | null
  }

  export type OpinionAvgAggregateOutputType = {
    rating: number | null
  }

  export type OpinionSumAggregateOutputType = {
    rating: number | null
  }

  export type OpinionMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    rating: number | null
    title: string | null
    description: string | null
    anonymized: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type OpinionMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    rating: number | null
    title: string | null
    description: string | null
    anonymized: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type OpinionCountAggregateOutputType = {
    id: number
    doctorId: number
    patientId: number
    rating: number
    title: number
    description: number
    anonymized: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type OpinionAvgAggregateInputType = {
    rating?: true
  }

  export type OpinionSumAggregateInputType = {
    rating?: true
  }

  export type OpinionMinAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    rating?: true
    title?: true
    description?: true
    anonymized?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type OpinionMaxAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    rating?: true
    title?: true
    description?: true
    anonymized?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type OpinionCountAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    rating?: true
    title?: true
    description?: true
    anonymized?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type OpinionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Opinion to aggregate.
     */
    where?: OpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Opinions to fetch.
     */
    orderBy?: OpinionOrderByWithRelationInput | OpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Opinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Opinions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Opinions
    **/
    _count?: true | OpinionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OpinionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OpinionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OpinionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OpinionMaxAggregateInputType
  }

  export type GetOpinionAggregateType<T extends OpinionAggregateArgs> = {
        [P in keyof T & keyof AggregateOpinion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOpinion[P]>
      : GetScalarType<T[P], AggregateOpinion[P]>
  }




  export type OpinionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OpinionWhereInput
    orderBy?: OpinionOrderByWithAggregationInput | OpinionOrderByWithAggregationInput[]
    by: OpinionScalarFieldEnum[] | OpinionScalarFieldEnum
    having?: OpinionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OpinionCountAggregateInputType | true
    _avg?: OpinionAvgAggregateInputType
    _sum?: OpinionSumAggregateInputType
    _min?: OpinionMinAggregateInputType
    _max?: OpinionMaxAggregateInputType
  }

  export type OpinionGroupByOutputType = {
    id: string
    doctorId: string
    patientId: string
    rating: number
    title: string | null
    description: string | null
    anonymized: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: OpinionCountAggregateOutputType | null
    _avg: OpinionAvgAggregateOutputType | null
    _sum: OpinionSumAggregateOutputType | null
    _min: OpinionMinAggregateOutputType | null
    _max: OpinionMaxAggregateOutputType | null
  }

  type GetOpinionGroupByPayload<T extends OpinionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OpinionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OpinionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OpinionGroupByOutputType[P]>
            : GetScalarType<T[P], OpinionGroupByOutputType[P]>
        }
      >
    >


  export type OpinionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    rating?: boolean
    title?: boolean
    description?: boolean
    anonymized?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["opinion"]>

  export type OpinionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    rating?: boolean
    title?: boolean
    description?: boolean
    anonymized?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["opinion"]>

  export type OpinionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    rating?: boolean
    title?: boolean
    description?: boolean
    anonymized?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["opinion"]>

  export type OpinionSelectScalar = {
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    rating?: boolean
    title?: boolean
    description?: boolean
    anonymized?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type OpinionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "patientId" | "rating" | "title" | "description" | "anonymized" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["opinion"]>
  export type OpinionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type OpinionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type OpinionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $OpinionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Opinion"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      patientId: string
      rating: number
      title: string | null
      description: string | null
      anonymized: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["opinion"]>
    composites: {}
  }

  type OpinionGetPayload<S extends boolean | null | undefined | OpinionDefaultArgs> = $Result.GetResult<Prisma.$OpinionPayload, S>

  type OpinionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OpinionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OpinionCountAggregateInputType | true
    }

  export interface OpinionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Opinion'], meta: { name: 'Opinion' } }
    /**
     * Find zero or one Opinion that matches the filter.
     * @param {OpinionFindUniqueArgs} args - Arguments to find a Opinion
     * @example
     * // Get one Opinion
     * const opinion = await prisma.opinion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OpinionFindUniqueArgs>(args: SelectSubset<T, OpinionFindUniqueArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Opinion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OpinionFindUniqueOrThrowArgs} args - Arguments to find a Opinion
     * @example
     * // Get one Opinion
     * const opinion = await prisma.opinion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OpinionFindUniqueOrThrowArgs>(args: SelectSubset<T, OpinionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Opinion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionFindFirstArgs} args - Arguments to find a Opinion
     * @example
     * // Get one Opinion
     * const opinion = await prisma.opinion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OpinionFindFirstArgs>(args?: SelectSubset<T, OpinionFindFirstArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Opinion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionFindFirstOrThrowArgs} args - Arguments to find a Opinion
     * @example
     * // Get one Opinion
     * const opinion = await prisma.opinion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OpinionFindFirstOrThrowArgs>(args?: SelectSubset<T, OpinionFindFirstOrThrowArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Opinions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Opinions
     * const opinions = await prisma.opinion.findMany()
     * 
     * // Get first 10 Opinions
     * const opinions = await prisma.opinion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const opinionWithIdOnly = await prisma.opinion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OpinionFindManyArgs>(args?: SelectSubset<T, OpinionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Opinion.
     * @param {OpinionCreateArgs} args - Arguments to create a Opinion.
     * @example
     * // Create one Opinion
     * const Opinion = await prisma.opinion.create({
     *   data: {
     *     // ... data to create a Opinion
     *   }
     * })
     * 
     */
    create<T extends OpinionCreateArgs>(args: SelectSubset<T, OpinionCreateArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Opinions.
     * @param {OpinionCreateManyArgs} args - Arguments to create many Opinions.
     * @example
     * // Create many Opinions
     * const opinion = await prisma.opinion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OpinionCreateManyArgs>(args?: SelectSubset<T, OpinionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Opinions and returns the data saved in the database.
     * @param {OpinionCreateManyAndReturnArgs} args - Arguments to create many Opinions.
     * @example
     * // Create many Opinions
     * const opinion = await prisma.opinion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Opinions and only return the `id`
     * const opinionWithIdOnly = await prisma.opinion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OpinionCreateManyAndReturnArgs>(args?: SelectSubset<T, OpinionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Opinion.
     * @param {OpinionDeleteArgs} args - Arguments to delete one Opinion.
     * @example
     * // Delete one Opinion
     * const Opinion = await prisma.opinion.delete({
     *   where: {
     *     // ... filter to delete one Opinion
     *   }
     * })
     * 
     */
    delete<T extends OpinionDeleteArgs>(args: SelectSubset<T, OpinionDeleteArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Opinion.
     * @param {OpinionUpdateArgs} args - Arguments to update one Opinion.
     * @example
     * // Update one Opinion
     * const opinion = await prisma.opinion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OpinionUpdateArgs>(args: SelectSubset<T, OpinionUpdateArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Opinions.
     * @param {OpinionDeleteManyArgs} args - Arguments to filter Opinions to delete.
     * @example
     * // Delete a few Opinions
     * const { count } = await prisma.opinion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OpinionDeleteManyArgs>(args?: SelectSubset<T, OpinionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Opinions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Opinions
     * const opinion = await prisma.opinion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OpinionUpdateManyArgs>(args: SelectSubset<T, OpinionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Opinions and returns the data updated in the database.
     * @param {OpinionUpdateManyAndReturnArgs} args - Arguments to update many Opinions.
     * @example
     * // Update many Opinions
     * const opinion = await prisma.opinion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Opinions and only return the `id`
     * const opinionWithIdOnly = await prisma.opinion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OpinionUpdateManyAndReturnArgs>(args: SelectSubset<T, OpinionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Opinion.
     * @param {OpinionUpsertArgs} args - Arguments to update or create a Opinion.
     * @example
     * // Update or create a Opinion
     * const opinion = await prisma.opinion.upsert({
     *   create: {
     *     // ... data to create a Opinion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Opinion we want to update
     *   }
     * })
     */
    upsert<T extends OpinionUpsertArgs>(args: SelectSubset<T, OpinionUpsertArgs<ExtArgs>>): Prisma__OpinionClient<$Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Opinions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionCountArgs} args - Arguments to filter Opinions to count.
     * @example
     * // Count the number of Opinions
     * const count = await prisma.opinion.count({
     *   where: {
     *     // ... the filter for the Opinions we want to count
     *   }
     * })
    **/
    count<T extends OpinionCountArgs>(
      args?: Subset<T, OpinionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OpinionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Opinion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OpinionAggregateArgs>(args: Subset<T, OpinionAggregateArgs>): Prisma.PrismaPromise<GetOpinionAggregateType<T>>

    /**
     * Group by Opinion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OpinionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OpinionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OpinionGroupByArgs['orderBy'] }
        : { orderBy?: OpinionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OpinionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpinionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Opinion model
   */
  readonly fields: OpinionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Opinion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OpinionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Opinion model
   */
  interface OpinionFieldRefs {
    readonly id: FieldRef<"Opinion", 'String'>
    readonly doctorId: FieldRef<"Opinion", 'String'>
    readonly patientId: FieldRef<"Opinion", 'String'>
    readonly rating: FieldRef<"Opinion", 'Int'>
    readonly title: FieldRef<"Opinion", 'String'>
    readonly description: FieldRef<"Opinion", 'String'>
    readonly anonymized: FieldRef<"Opinion", 'Boolean'>
    readonly createdAt: FieldRef<"Opinion", 'DateTime'>
    readonly updatedAt: FieldRef<"Opinion", 'DateTime'>
    readonly deletedAt: FieldRef<"Opinion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Opinion findUnique
   */
  export type OpinionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * Filter, which Opinion to fetch.
     */
    where: OpinionWhereUniqueInput
  }

  /**
   * Opinion findUniqueOrThrow
   */
  export type OpinionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * Filter, which Opinion to fetch.
     */
    where: OpinionWhereUniqueInput
  }

  /**
   * Opinion findFirst
   */
  export type OpinionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * Filter, which Opinion to fetch.
     */
    where?: OpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Opinions to fetch.
     */
    orderBy?: OpinionOrderByWithRelationInput | OpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Opinions.
     */
    cursor?: OpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Opinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Opinions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Opinions.
     */
    distinct?: OpinionScalarFieldEnum | OpinionScalarFieldEnum[]
  }

  /**
   * Opinion findFirstOrThrow
   */
  export type OpinionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * Filter, which Opinion to fetch.
     */
    where?: OpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Opinions to fetch.
     */
    orderBy?: OpinionOrderByWithRelationInput | OpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Opinions.
     */
    cursor?: OpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Opinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Opinions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Opinions.
     */
    distinct?: OpinionScalarFieldEnum | OpinionScalarFieldEnum[]
  }

  /**
   * Opinion findMany
   */
  export type OpinionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * Filter, which Opinions to fetch.
     */
    where?: OpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Opinions to fetch.
     */
    orderBy?: OpinionOrderByWithRelationInput | OpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Opinions.
     */
    cursor?: OpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Opinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Opinions.
     */
    skip?: number
    distinct?: OpinionScalarFieldEnum | OpinionScalarFieldEnum[]
  }

  /**
   * Opinion create
   */
  export type OpinionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * The data needed to create a Opinion.
     */
    data: XOR<OpinionCreateInput, OpinionUncheckedCreateInput>
  }

  /**
   * Opinion createMany
   */
  export type OpinionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Opinions.
     */
    data: OpinionCreateManyInput | OpinionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Opinion createManyAndReturn
   */
  export type OpinionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * The data used to create many Opinions.
     */
    data: OpinionCreateManyInput | OpinionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Opinion update
   */
  export type OpinionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * The data needed to update a Opinion.
     */
    data: XOR<OpinionUpdateInput, OpinionUncheckedUpdateInput>
    /**
     * Choose, which Opinion to update.
     */
    where: OpinionWhereUniqueInput
  }

  /**
   * Opinion updateMany
   */
  export type OpinionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Opinions.
     */
    data: XOR<OpinionUpdateManyMutationInput, OpinionUncheckedUpdateManyInput>
    /**
     * Filter which Opinions to update
     */
    where?: OpinionWhereInput
    /**
     * Limit how many Opinions to update.
     */
    limit?: number
  }

  /**
   * Opinion updateManyAndReturn
   */
  export type OpinionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * The data used to update Opinions.
     */
    data: XOR<OpinionUpdateManyMutationInput, OpinionUncheckedUpdateManyInput>
    /**
     * Filter which Opinions to update
     */
    where?: OpinionWhereInput
    /**
     * Limit how many Opinions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Opinion upsert
   */
  export type OpinionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * The filter to search for the Opinion to update in case it exists.
     */
    where: OpinionWhereUniqueInput
    /**
     * In case the Opinion found by the `where` argument doesn't exist, create a new Opinion with this data.
     */
    create: XOR<OpinionCreateInput, OpinionUncheckedCreateInput>
    /**
     * In case the Opinion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OpinionUpdateInput, OpinionUncheckedUpdateInput>
  }

  /**
   * Opinion delete
   */
  export type OpinionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
    /**
     * Filter which Opinion to delete.
     */
    where: OpinionWhereUniqueInput
  }

  /**
   * Opinion deleteMany
   */
  export type OpinionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Opinions to delete
     */
    where?: OpinionWhereInput
    /**
     * Limit how many Opinions to delete.
     */
    limit?: number
  }

  /**
   * Opinion without action
   */
  export type OpinionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Opinion
     */
    select?: OpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Opinion
     */
    omit?: OpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OpinionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    role: 'role',
    isActive: 'isActive',
    emailVerified: 'emailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    surname: 'surname',
    email: 'email',
    phone: 'phone',
    birthdate: 'birthdate',
    gender: 'gender',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    surname: 'surname',
    email: 'email',
    phone: 'phone',
    picaddress: 'picaddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const SpecialityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type SpecialityScalarFieldEnum = (typeof SpecialityScalarFieldEnum)[keyof typeof SpecialityScalarFieldEnum]


  export const DoctorSpecialityScalarFieldEnum: {
    doctorId: 'doctorId',
    specialityId: 'specialityId',
    createdAt: 'createdAt'
  };

  export type DoctorSpecialityScalarFieldEnum = (typeof DoctorSpecialityScalarFieldEnum)[keyof typeof DoctorSpecialityScalarFieldEnum]


  export const ExperienceScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    experienceType: 'experienceType',
    title: 'title',
    institution: 'institution',
    startDate: 'startDate',
    endDate: 'endDate',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum]


  export const ClinicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    country: 'country',
    city: 'city',
    neighborhood: 'neighborhood',
    latitude: 'latitude',
    longitude: 'longitude',
    isVirtual: 'isVirtual',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ClinicScalarFieldEnum = (typeof ClinicScalarFieldEnum)[keyof typeof ClinicScalarFieldEnum]


  export const DoctorClinicScalarFieldEnum: {
    doctorId: 'doctorId',
    clinicId: 'clinicId',
    createdAt: 'createdAt'
  };

  export type DoctorClinicScalarFieldEnum = (typeof DoctorClinicScalarFieldEnum)[keyof typeof DoctorClinicScalarFieldEnum]


  export const PricingScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    clinicId: 'clinicId',
    title: 'title',
    price: 'price',
    currency: 'currency',
    durationMinutes: 'durationMinutes',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type PricingScalarFieldEnum = (typeof PricingScalarFieldEnum)[keyof typeof PricingScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    patientId: 'patientId',
    clinicId: 'clinicId',
    pricingId: 'pricingId',
    datetime: 'datetime',
    durationMinutes: 'durationMinutes',
    type: 'type',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const OpinionScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    patientId: 'patientId',
    rating: 'rating',
    title: 'title',
    description: 'description',
    anonymized: 'anonymized',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type OpinionScalarFieldEnum = (typeof OpinionScalarFieldEnum)[keyof typeof OpinionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ExperienceType'
   */
  export type EnumExperienceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceType'>
    


  /**
   * Reference to a field of type 'ExperienceType[]'
   */
  export type ListEnumExperienceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AppointmentType'
   */
  export type EnumAppointmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentType'>
    


  /**
   * Reference to a field of type 'AppointmentType[]'
   */
  export type ListEnumAppointmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentType[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    doctor?: XOR<DoctorNullableScalarRelationFilter, DoctorWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    doctor?: XOR<DoctorNullableScalarRelationFilter, DoctorWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    userId?: StringFilter<"Patient"> | string
    name?: StringFilter<"Patient"> | string
    surname?: StringFilter<"Patient"> | string
    email?: StringFilter<"Patient"> | string
    phone?: StringNullableFilter<"Patient"> | string | null
    birthdate?: DateTimeNullableFilter<"Patient"> | Date | string | null
    gender?: StringNullableFilter<"Patient"> | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    opinions?: OpinionListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    opinions?: OpinionOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    email?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    surname?: StringFilter<"Patient"> | string
    phone?: StringNullableFilter<"Patient"> | string | null
    birthdate?: DateTimeNullableFilter<"Patient"> | Date | string | null
    gender?: StringNullableFilter<"Patient"> | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    opinions?: OpinionListRelationFilter
  }, "id" | "userId" | "email">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    userId?: StringWithAggregatesFilter<"Patient"> | string
    name?: StringWithAggregatesFilter<"Patient"> | string
    surname?: StringWithAggregatesFilter<"Patient"> | string
    email?: StringWithAggregatesFilter<"Patient"> | string
    phone?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    birthdate?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    id?: StringFilter<"Doctor"> | string
    userId?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    surname?: StringFilter<"Doctor"> | string
    email?: StringNullableFilter<"Doctor"> | string | null
    phone?: StringNullableFilter<"Doctor"> | string | null
    picaddress?: StringNullableFilter<"Doctor"> | string | null
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Doctor"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    specialities?: DoctorSpecialityListRelationFilter
    experiences?: ExperienceListRelationFilter
    pricings?: PricingListRelationFilter
    clinics?: DoctorClinicListRelationFilter
    appointments?: AppointmentListRelationFilter
    opinions?: OpinionListRelationFilter
  }

  export type DoctorOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    picaddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    specialities?: DoctorSpecialityOrderByRelationAggregateInput
    experiences?: ExperienceOrderByRelationAggregateInput
    pricings?: PricingOrderByRelationAggregateInput
    clinics?: DoctorClinicOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    opinions?: OpinionOrderByRelationAggregateInput
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    email?: string
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    name?: StringFilter<"Doctor"> | string
    surname?: StringFilter<"Doctor"> | string
    phone?: StringNullableFilter<"Doctor"> | string | null
    picaddress?: StringNullableFilter<"Doctor"> | string | null
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Doctor"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    specialities?: DoctorSpecialityListRelationFilter
    experiences?: ExperienceListRelationFilter
    pricings?: PricingListRelationFilter
    clinics?: DoctorClinicListRelationFilter
    appointments?: AppointmentListRelationFilter
    opinions?: OpinionListRelationFilter
  }, "id" | "userId" | "email">

  export type DoctorOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    picaddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doctor"> | string
    userId?: StringWithAggregatesFilter<"Doctor"> | string
    name?: StringWithAggregatesFilter<"Doctor"> | string
    surname?: StringWithAggregatesFilter<"Doctor"> | string
    email?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    picaddress?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Doctor"> | Date | string | null
  }

  export type SpecialityWhereInput = {
    AND?: SpecialityWhereInput | SpecialityWhereInput[]
    OR?: SpecialityWhereInput[]
    NOT?: SpecialityWhereInput | SpecialityWhereInput[]
    id?: StringFilter<"Speciality"> | string
    name?: StringFilter<"Speciality"> | string
    description?: StringNullableFilter<"Speciality"> | string | null
    createdAt?: DateTimeFilter<"Speciality"> | Date | string
    updatedAt?: DateTimeFilter<"Speciality"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Speciality"> | Date | string | null
    doctors?: DoctorSpecialityListRelationFilter
  }

  export type SpecialityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    doctors?: DoctorSpecialityOrderByRelationAggregateInput
  }

  export type SpecialityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SpecialityWhereInput | SpecialityWhereInput[]
    OR?: SpecialityWhereInput[]
    NOT?: SpecialityWhereInput | SpecialityWhereInput[]
    description?: StringNullableFilter<"Speciality"> | string | null
    createdAt?: DateTimeFilter<"Speciality"> | Date | string
    updatedAt?: DateTimeFilter<"Speciality"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Speciality"> | Date | string | null
    doctors?: DoctorSpecialityListRelationFilter
  }, "id" | "name">

  export type SpecialityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: SpecialityCountOrderByAggregateInput
    _max?: SpecialityMaxOrderByAggregateInput
    _min?: SpecialityMinOrderByAggregateInput
  }

  export type SpecialityScalarWhereWithAggregatesInput = {
    AND?: SpecialityScalarWhereWithAggregatesInput | SpecialityScalarWhereWithAggregatesInput[]
    OR?: SpecialityScalarWhereWithAggregatesInput[]
    NOT?: SpecialityScalarWhereWithAggregatesInput | SpecialityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Speciality"> | string
    name?: StringWithAggregatesFilter<"Speciality"> | string
    description?: StringNullableWithAggregatesFilter<"Speciality"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Speciality"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Speciality"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Speciality"> | Date | string | null
  }

  export type DoctorSpecialityWhereInput = {
    AND?: DoctorSpecialityWhereInput | DoctorSpecialityWhereInput[]
    OR?: DoctorSpecialityWhereInput[]
    NOT?: DoctorSpecialityWhereInput | DoctorSpecialityWhereInput[]
    doctorId?: StringFilter<"DoctorSpeciality"> | string
    specialityId?: StringFilter<"DoctorSpeciality"> | string
    createdAt?: DateTimeFilter<"DoctorSpeciality"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    speciality?: XOR<SpecialityScalarRelationFilter, SpecialityWhereInput>
  }

  export type DoctorSpecialityOrderByWithRelationInput = {
    doctorId?: SortOrder
    specialityId?: SortOrder
    createdAt?: SortOrder
    doctor?: DoctorOrderByWithRelationInput
    speciality?: SpecialityOrderByWithRelationInput
  }

  export type DoctorSpecialityWhereUniqueInput = Prisma.AtLeast<{
    doctorId_specialityId?: DoctorSpecialityDoctorIdSpecialityIdCompoundUniqueInput
    AND?: DoctorSpecialityWhereInput | DoctorSpecialityWhereInput[]
    OR?: DoctorSpecialityWhereInput[]
    NOT?: DoctorSpecialityWhereInput | DoctorSpecialityWhereInput[]
    doctorId?: StringFilter<"DoctorSpeciality"> | string
    specialityId?: StringFilter<"DoctorSpeciality"> | string
    createdAt?: DateTimeFilter<"DoctorSpeciality"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    speciality?: XOR<SpecialityScalarRelationFilter, SpecialityWhereInput>
  }, "doctorId_specialityId">

  export type DoctorSpecialityOrderByWithAggregationInput = {
    doctorId?: SortOrder
    specialityId?: SortOrder
    createdAt?: SortOrder
    _count?: DoctorSpecialityCountOrderByAggregateInput
    _max?: DoctorSpecialityMaxOrderByAggregateInput
    _min?: DoctorSpecialityMinOrderByAggregateInput
  }

  export type DoctorSpecialityScalarWhereWithAggregatesInput = {
    AND?: DoctorSpecialityScalarWhereWithAggregatesInput | DoctorSpecialityScalarWhereWithAggregatesInput[]
    OR?: DoctorSpecialityScalarWhereWithAggregatesInput[]
    NOT?: DoctorSpecialityScalarWhereWithAggregatesInput | DoctorSpecialityScalarWhereWithAggregatesInput[]
    doctorId?: StringWithAggregatesFilter<"DoctorSpeciality"> | string
    specialityId?: StringWithAggregatesFilter<"DoctorSpeciality"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DoctorSpeciality"> | Date | string
  }

  export type ExperienceWhereInput = {
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    id?: StringFilter<"Experience"> | string
    doctorId?: StringFilter<"Experience"> | string
    experienceType?: EnumExperienceTypeFilter<"Experience"> | $Enums.ExperienceType
    title?: StringFilter<"Experience"> | string
    institution?: StringNullableFilter<"Experience"> | string | null
    startDate?: DateTimeNullableFilter<"Experience"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Experience"> | Date | string | null
    description?: StringNullableFilter<"Experience"> | string | null
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    updatedAt?: DateTimeFilter<"Experience"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Experience"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
  }

  export type ExperienceOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    experienceType?: SortOrder
    title?: SortOrder
    institution?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    doctor?: DoctorOrderByWithRelationInput
  }

  export type ExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperienceWhereInput | ExperienceWhereInput[]
    OR?: ExperienceWhereInput[]
    NOT?: ExperienceWhereInput | ExperienceWhereInput[]
    doctorId?: StringFilter<"Experience"> | string
    experienceType?: EnumExperienceTypeFilter<"Experience"> | $Enums.ExperienceType
    title?: StringFilter<"Experience"> | string
    institution?: StringNullableFilter<"Experience"> | string | null
    startDate?: DateTimeNullableFilter<"Experience"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Experience"> | Date | string | null
    description?: StringNullableFilter<"Experience"> | string | null
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    updatedAt?: DateTimeFilter<"Experience"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Experience"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
  }, "id">

  export type ExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    experienceType?: SortOrder
    title?: SortOrder
    institution?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ExperienceCountOrderByAggregateInput
    _max?: ExperienceMaxOrderByAggregateInput
    _min?: ExperienceMinOrderByAggregateInput
  }

  export type ExperienceScalarWhereWithAggregatesInput = {
    AND?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    OR?: ExperienceScalarWhereWithAggregatesInput[]
    NOT?: ExperienceScalarWhereWithAggregatesInput | ExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Experience"> | string
    doctorId?: StringWithAggregatesFilter<"Experience"> | string
    experienceType?: EnumExperienceTypeWithAggregatesFilter<"Experience"> | $Enums.ExperienceType
    title?: StringWithAggregatesFilter<"Experience"> | string
    institution?: StringNullableWithAggregatesFilter<"Experience"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Experience"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Experience"> | Date | string | null
    description?: StringNullableWithAggregatesFilter<"Experience"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Experience"> | Date | string | null
  }

  export type ClinicWhereInput = {
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    id?: StringFilter<"Clinic"> | string
    name?: StringFilter<"Clinic"> | string
    address?: StringNullableFilter<"Clinic"> | string | null
    country?: StringNullableFilter<"Clinic"> | string | null
    city?: StringNullableFilter<"Clinic"> | string | null
    neighborhood?: StringNullableFilter<"Clinic"> | string | null
    latitude?: FloatNullableFilter<"Clinic"> | number | null
    longitude?: FloatNullableFilter<"Clinic"> | number | null
    isVirtual?: BoolFilter<"Clinic"> | boolean
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Clinic"> | Date | string | null
    doctorLinks?: DoctorClinicListRelationFilter
    pricing?: PricingListRelationFilter
    appointments?: AppointmentListRelationFilter
  }

  export type ClinicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    neighborhood?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    isVirtual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    doctorLinks?: DoctorClinicOrderByRelationAggregateInput
    pricing?: PricingOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type ClinicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    name?: StringFilter<"Clinic"> | string
    address?: StringNullableFilter<"Clinic"> | string | null
    country?: StringNullableFilter<"Clinic"> | string | null
    city?: StringNullableFilter<"Clinic"> | string | null
    neighborhood?: StringNullableFilter<"Clinic"> | string | null
    latitude?: FloatNullableFilter<"Clinic"> | number | null
    longitude?: FloatNullableFilter<"Clinic"> | number | null
    isVirtual?: BoolFilter<"Clinic"> | boolean
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Clinic"> | Date | string | null
    doctorLinks?: DoctorClinicListRelationFilter
    pricing?: PricingListRelationFilter
    appointments?: AppointmentListRelationFilter
  }, "id">

  export type ClinicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    neighborhood?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    isVirtual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ClinicCountOrderByAggregateInput
    _avg?: ClinicAvgOrderByAggregateInput
    _max?: ClinicMaxOrderByAggregateInput
    _min?: ClinicMinOrderByAggregateInput
    _sum?: ClinicSumOrderByAggregateInput
  }

  export type ClinicScalarWhereWithAggregatesInput = {
    AND?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    OR?: ClinicScalarWhereWithAggregatesInput[]
    NOT?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clinic"> | string
    name?: StringWithAggregatesFilter<"Clinic"> | string
    address?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    country?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    city?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    neighborhood?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Clinic"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Clinic"> | number | null
    isVirtual?: BoolWithAggregatesFilter<"Clinic"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Clinic"> | Date | string | null
  }

  export type DoctorClinicWhereInput = {
    AND?: DoctorClinicWhereInput | DoctorClinicWhereInput[]
    OR?: DoctorClinicWhereInput[]
    NOT?: DoctorClinicWhereInput | DoctorClinicWhereInput[]
    doctorId?: StringFilter<"DoctorClinic"> | string
    clinicId?: StringFilter<"DoctorClinic"> | string
    createdAt?: DateTimeFilter<"DoctorClinic"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }

  export type DoctorClinicOrderByWithRelationInput = {
    doctorId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    doctor?: DoctorOrderByWithRelationInput
    clinic?: ClinicOrderByWithRelationInput
  }

  export type DoctorClinicWhereUniqueInput = Prisma.AtLeast<{
    doctorId_clinicId?: DoctorClinicDoctorIdClinicIdCompoundUniqueInput
    AND?: DoctorClinicWhereInput | DoctorClinicWhereInput[]
    OR?: DoctorClinicWhereInput[]
    NOT?: DoctorClinicWhereInput | DoctorClinicWhereInput[]
    doctorId?: StringFilter<"DoctorClinic"> | string
    clinicId?: StringFilter<"DoctorClinic"> | string
    createdAt?: DateTimeFilter<"DoctorClinic"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
  }, "doctorId_clinicId">

  export type DoctorClinicOrderByWithAggregationInput = {
    doctorId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    _count?: DoctorClinicCountOrderByAggregateInput
    _max?: DoctorClinicMaxOrderByAggregateInput
    _min?: DoctorClinicMinOrderByAggregateInput
  }

  export type DoctorClinicScalarWhereWithAggregatesInput = {
    AND?: DoctorClinicScalarWhereWithAggregatesInput | DoctorClinicScalarWhereWithAggregatesInput[]
    OR?: DoctorClinicScalarWhereWithAggregatesInput[]
    NOT?: DoctorClinicScalarWhereWithAggregatesInput | DoctorClinicScalarWhereWithAggregatesInput[]
    doctorId?: StringWithAggregatesFilter<"DoctorClinic"> | string
    clinicId?: StringWithAggregatesFilter<"DoctorClinic"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DoctorClinic"> | Date | string
  }

  export type PricingWhereInput = {
    AND?: PricingWhereInput | PricingWhereInput[]
    OR?: PricingWhereInput[]
    NOT?: PricingWhereInput | PricingWhereInput[]
    id?: StringFilter<"Pricing"> | string
    doctorId?: StringFilter<"Pricing"> | string
    clinicId?: StringFilter<"Pricing"> | string
    title?: StringFilter<"Pricing"> | string
    price?: DecimalFilter<"Pricing"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Pricing"> | string
    durationMinutes?: IntFilter<"Pricing"> | number
    description?: StringNullableFilter<"Pricing"> | string | null
    isActive?: BoolFilter<"Pricing"> | boolean
    createdAt?: DateTimeFilter<"Pricing"> | Date | string
    updatedAt?: DateTimeFilter<"Pricing"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Pricing"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    appointments?: AppointmentListRelationFilter
  }

  export type PricingOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    clinicId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationMinutes?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    doctor?: DoctorOrderByWithRelationInput
    clinic?: ClinicOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
  }

  export type PricingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PricingWhereInput | PricingWhereInput[]
    OR?: PricingWhereInput[]
    NOT?: PricingWhereInput | PricingWhereInput[]
    doctorId?: StringFilter<"Pricing"> | string
    clinicId?: StringFilter<"Pricing"> | string
    title?: StringFilter<"Pricing"> | string
    price?: DecimalFilter<"Pricing"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Pricing"> | string
    durationMinutes?: IntFilter<"Pricing"> | number
    description?: StringNullableFilter<"Pricing"> | string | null
    isActive?: BoolFilter<"Pricing"> | boolean
    createdAt?: DateTimeFilter<"Pricing"> | Date | string
    updatedAt?: DateTimeFilter<"Pricing"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Pricing"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    appointments?: AppointmentListRelationFilter
  }, "id">

  export type PricingOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    clinicId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationMinutes?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: PricingCountOrderByAggregateInput
    _avg?: PricingAvgOrderByAggregateInput
    _max?: PricingMaxOrderByAggregateInput
    _min?: PricingMinOrderByAggregateInput
    _sum?: PricingSumOrderByAggregateInput
  }

  export type PricingScalarWhereWithAggregatesInput = {
    AND?: PricingScalarWhereWithAggregatesInput | PricingScalarWhereWithAggregatesInput[]
    OR?: PricingScalarWhereWithAggregatesInput[]
    NOT?: PricingScalarWhereWithAggregatesInput | PricingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pricing"> | string
    doctorId?: StringWithAggregatesFilter<"Pricing"> | string
    clinicId?: StringWithAggregatesFilter<"Pricing"> | string
    title?: StringWithAggregatesFilter<"Pricing"> | string
    price?: DecimalWithAggregatesFilter<"Pricing"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Pricing"> | string
    durationMinutes?: IntWithAggregatesFilter<"Pricing"> | number
    description?: StringNullableWithAggregatesFilter<"Pricing"> | string | null
    isActive?: BoolWithAggregatesFilter<"Pricing"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Pricing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pricing"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Pricing"> | Date | string | null
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    clinicId?: StringFilter<"Appointment"> | string
    pricingId?: StringNullableFilter<"Appointment"> | string | null
    datetime?: DateTimeFilter<"Appointment"> | Date | string
    durationMinutes?: IntFilter<"Appointment"> | number
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    pricing?: XOR<PricingNullableScalarRelationFilter, PricingWhereInput> | null
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    clinicId?: SortOrder
    pricingId?: SortOrderInput | SortOrder
    datetime?: SortOrder
    durationMinutes?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    doctor?: DoctorOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
    clinic?: ClinicOrderByWithRelationInput
    pricing?: PricingOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    doctorId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    clinicId?: StringFilter<"Appointment"> | string
    pricingId?: StringNullableFilter<"Appointment"> | string | null
    datetime?: DateTimeFilter<"Appointment"> | Date | string
    durationMinutes?: IntFilter<"Appointment"> | number
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    pricing?: XOR<PricingNullableScalarRelationFilter, PricingWhereInput> | null
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    clinicId?: SortOrder
    pricingId?: SortOrderInput | SortOrder
    datetime?: SortOrder
    durationMinutes?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    doctorId?: StringWithAggregatesFilter<"Appointment"> | string
    patientId?: StringWithAggregatesFilter<"Appointment"> | string
    clinicId?: StringWithAggregatesFilter<"Appointment"> | string
    pricingId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    datetime?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    durationMinutes?: IntWithAggregatesFilter<"Appointment"> | number
    type?: EnumAppointmentTypeWithAggregatesFilter<"Appointment"> | $Enums.AppointmentType
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
  }

  export type OpinionWhereInput = {
    AND?: OpinionWhereInput | OpinionWhereInput[]
    OR?: OpinionWhereInput[]
    NOT?: OpinionWhereInput | OpinionWhereInput[]
    id?: StringFilter<"Opinion"> | string
    doctorId?: StringFilter<"Opinion"> | string
    patientId?: StringFilter<"Opinion"> | string
    rating?: IntFilter<"Opinion"> | number
    title?: StringNullableFilter<"Opinion"> | string | null
    description?: StringNullableFilter<"Opinion"> | string | null
    anonymized?: BoolFilter<"Opinion"> | boolean
    createdAt?: DateTimeFilter<"Opinion"> | Date | string
    updatedAt?: DateTimeFilter<"Opinion"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Opinion"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type OpinionOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    rating?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    anonymized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    doctor?: DoctorOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
  }

  export type OpinionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OpinionWhereInput | OpinionWhereInput[]
    OR?: OpinionWhereInput[]
    NOT?: OpinionWhereInput | OpinionWhereInput[]
    doctorId?: StringFilter<"Opinion"> | string
    patientId?: StringFilter<"Opinion"> | string
    rating?: IntFilter<"Opinion"> | number
    title?: StringNullableFilter<"Opinion"> | string | null
    description?: StringNullableFilter<"Opinion"> | string | null
    anonymized?: BoolFilter<"Opinion"> | boolean
    createdAt?: DateTimeFilter<"Opinion"> | Date | string
    updatedAt?: DateTimeFilter<"Opinion"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Opinion"> | Date | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id">

  export type OpinionOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    rating?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    anonymized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: OpinionCountOrderByAggregateInput
    _avg?: OpinionAvgOrderByAggregateInput
    _max?: OpinionMaxOrderByAggregateInput
    _min?: OpinionMinOrderByAggregateInput
    _sum?: OpinionSumOrderByAggregateInput
  }

  export type OpinionScalarWhereWithAggregatesInput = {
    AND?: OpinionScalarWhereWithAggregatesInput | OpinionScalarWhereWithAggregatesInput[]
    OR?: OpinionScalarWhereWithAggregatesInput[]
    NOT?: OpinionScalarWhereWithAggregatesInput | OpinionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Opinion"> | string
    doctorId?: StringWithAggregatesFilter<"Opinion"> | string
    patientId?: StringWithAggregatesFilter<"Opinion"> | string
    rating?: IntWithAggregatesFilter<"Opinion"> | number
    title?: StringNullableWithAggregatesFilter<"Opinion"> | string | null
    description?: StringNullableWithAggregatesFilter<"Opinion"> | string | null
    anonymized?: BoolWithAggregatesFilter<"Opinion"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Opinion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Opinion"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Opinion"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patient?: PatientCreateNestedOneWithoutUserInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneWithoutUserNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatientCreateInput = {
    id?: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    opinions?: OpinionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    opinions?: OpinionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorCreateInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorCreateManyInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DoctorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SpecialityCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctors?: DoctorSpecialityCreateNestedManyWithoutSpecialityInput
  }

  export type SpecialityUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctors?: DoctorSpecialityUncheckedCreateNestedManyWithoutSpecialityInput
  }

  export type SpecialityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctors?: DoctorSpecialityUpdateManyWithoutSpecialityNestedInput
  }

  export type SpecialityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctors?: DoctorSpecialityUncheckedUpdateManyWithoutSpecialityNestedInput
  }

  export type SpecialityCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SpecialityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SpecialityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorSpecialityCreateInput = {
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutSpecialitiesInput
    speciality: SpecialityCreateNestedOneWithoutDoctorsInput
  }

  export type DoctorSpecialityUncheckedCreateInput = {
    doctorId: string
    specialityId: string
    createdAt?: Date | string
  }

  export type DoctorSpecialityUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutSpecialitiesNestedInput
    speciality?: SpecialityUpdateOneRequiredWithoutDoctorsNestedInput
  }

  export type DoctorSpecialityUncheckedUpdateInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    specialityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorSpecialityCreateManyInput = {
    doctorId: string
    specialityId: string
    createdAt?: Date | string
  }

  export type DoctorSpecialityUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorSpecialityUncheckedUpdateManyInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    specialityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceCreateInput = {
    id?: string
    experienceType?: $Enums.ExperienceType
    title: string
    institution?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutExperiencesInput
  }

  export type ExperienceUncheckedCreateInput = {
    id?: string
    doctorId: string
    experienceType?: $Enums.ExperienceType
    title: string
    institution?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutExperiencesNestedInput
  }

  export type ExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExperienceCreateManyInput = {
    id?: string
    doctorId: string
    experienceType?: $Enums.ExperienceType
    title: string
    institution?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClinicCreateInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctorLinks?: DoctorClinicCreateNestedManyWithoutClinicInput
    pricing?: PricingCreateNestedManyWithoutClinicInput
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctorLinks?: DoctorClinicUncheckedCreateNestedManyWithoutClinicInput
    pricing?: PricingUncheckedCreateNestedManyWithoutClinicInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctorLinks?: DoctorClinicUpdateManyWithoutClinicNestedInput
    pricing?: PricingUpdateManyWithoutClinicNestedInput
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctorLinks?: DoctorClinicUncheckedUpdateManyWithoutClinicNestedInput
    pricing?: PricingUncheckedUpdateManyWithoutClinicNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ClinicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClinicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorClinicCreateInput = {
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutClinicsInput
    clinic: ClinicCreateNestedOneWithoutDoctorLinksInput
  }

  export type DoctorClinicUncheckedCreateInput = {
    doctorId: string
    clinicId: string
    createdAt?: Date | string
  }

  export type DoctorClinicUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutClinicsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutDoctorLinksNestedInput
  }

  export type DoctorClinicUncheckedUpdateInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorClinicCreateManyInput = {
    doctorId: string
    clinicId: string
    createdAt?: Date | string
  }

  export type DoctorClinicUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorClinicUncheckedUpdateManyInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingCreateInput = {
    id?: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutPricingsInput
    clinic: ClinicCreateNestedOneWithoutPricingInput
    appointments?: AppointmentCreateNestedManyWithoutPricingInput
  }

  export type PricingUncheckedCreateInput = {
    id?: string
    doctorId: string
    clinicId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPricingInput
  }

  export type PricingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutPricingsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutPricingNestedInput
    appointments?: AppointmentUpdateManyWithoutPricingNestedInput
  }

  export type PricingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUncheckedUpdateManyWithoutPricingNestedInput
  }

  export type PricingCreateManyInput = {
    id?: string
    doctorId: string
    clinicId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PricingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PricingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentCreateInput = {
    id?: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    clinic: ClinicCreateNestedOneWithoutAppointmentsInput
    pricing?: PricingCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    doctorId: string
    patientId: string
    clinicId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutAppointmentsNestedInput
    pricing?: PricingUpdateOneWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentCreateManyInput = {
    id?: string
    doctorId: string
    patientId: string
    clinicId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionCreateInput = {
    id?: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutOpinionsInput
    patient: PatientCreateNestedOneWithoutOpinionsInput
  }

  export type OpinionUncheckedCreateInput = {
    id?: string
    doctorId: string
    patientId: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type OpinionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutOpinionsNestedInput
    patient?: PatientUpdateOneRequiredWithoutOpinionsNestedInput
  }

  export type OpinionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionCreateManyInput = {
    id?: string
    doctorId: string
    patientId: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type OpinionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PatientNullableScalarRelationFilter = {
    is?: PatientWhereInput | null
    isNot?: PatientWhereInput | null
  }

  export type DoctorNullableScalarRelationFilter = {
    is?: DoctorWhereInput | null
    isNot?: DoctorWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type OpinionListRelationFilter = {
    every?: OpinionWhereInput
    some?: OpinionWhereInput
    none?: OpinionWhereInput
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OpinionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    birthdate?: SortOrder
    gender?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DoctorSpecialityListRelationFilter = {
    every?: DoctorSpecialityWhereInput
    some?: DoctorSpecialityWhereInput
    none?: DoctorSpecialityWhereInput
  }

  export type ExperienceListRelationFilter = {
    every?: ExperienceWhereInput
    some?: ExperienceWhereInput
    none?: ExperienceWhereInput
  }

  export type PricingListRelationFilter = {
    every?: PricingWhereInput
    some?: PricingWhereInput
    none?: PricingWhereInput
  }

  export type DoctorClinicListRelationFilter = {
    every?: DoctorClinicWhereInput
    some?: DoctorClinicWhereInput
    none?: DoctorClinicWhereInput
  }

  export type DoctorSpecialityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PricingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorClinicOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    picaddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    picaddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    picaddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type SpecialityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type SpecialityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type SpecialityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DoctorScalarRelationFilter = {
    is?: DoctorWhereInput
    isNot?: DoctorWhereInput
  }

  export type SpecialityScalarRelationFilter = {
    is?: SpecialityWhereInput
    isNot?: SpecialityWhereInput
  }

  export type DoctorSpecialityDoctorIdSpecialityIdCompoundUniqueInput = {
    doctorId: string
    specialityId: string
  }

  export type DoctorSpecialityCountOrderByAggregateInput = {
    doctorId?: SortOrder
    specialityId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorSpecialityMaxOrderByAggregateInput = {
    doctorId?: SortOrder
    specialityId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorSpecialityMinOrderByAggregateInput = {
    doctorId?: SortOrder
    specialityId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumExperienceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeFilter<$PrismaModel> | $Enums.ExperienceType
  }

  export type ExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    experienceType?: SortOrder
    title?: SortOrder
    institution?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    experienceType?: SortOrder
    title?: SortOrder
    institution?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    experienceType?: SortOrder
    title?: SortOrder
    institution?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type EnumExperienceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperienceTypeFilter<$PrismaModel>
    _max?: NestedEnumExperienceTypeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ClinicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    country?: SortOrder
    city?: SortOrder
    neighborhood?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    isVirtual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ClinicAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type ClinicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    country?: SortOrder
    city?: SortOrder
    neighborhood?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    isVirtual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ClinicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    country?: SortOrder
    city?: SortOrder
    neighborhood?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    isVirtual?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ClinicSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ClinicScalarRelationFilter = {
    is?: ClinicWhereInput
    isNot?: ClinicWhereInput
  }

  export type DoctorClinicDoctorIdClinicIdCompoundUniqueInput = {
    doctorId: string
    clinicId: string
  }

  export type DoctorClinicCountOrderByAggregateInput = {
    doctorId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorClinicMaxOrderByAggregateInput = {
    doctorId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorClinicMinOrderByAggregateInput = {
    doctorId?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PricingCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    clinicId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationMinutes?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PricingAvgOrderByAggregateInput = {
    price?: SortOrder
    durationMinutes?: SortOrder
  }

  export type PricingMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    clinicId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationMinutes?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PricingMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    clinicId?: SortOrder
    title?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationMinutes?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PricingSumOrderByAggregateInput = {
    price?: SortOrder
    durationMinutes?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumAppointmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeFilter<$PrismaModel> | $Enums.AppointmentType
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type PricingNullableScalarRelationFilter = {
    is?: PricingWhereInput | null
    isNot?: PricingWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    clinicId?: SortOrder
    pricingId?: SortOrder
    datetime?: SortOrder
    durationMinutes?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    durationMinutes?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    clinicId?: SortOrder
    pricingId?: SortOrder
    datetime?: SortOrder
    durationMinutes?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    clinicId?: SortOrder
    pricingId?: SortOrder
    datetime?: SortOrder
    durationMinutes?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    durationMinutes?: SortOrder
  }

  export type EnumAppointmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAppointmentTypeFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type OpinionCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    description?: SortOrder
    anonymized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type OpinionAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type OpinionMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    description?: SortOrder
    anonymized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type OpinionMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    description?: SortOrder
    anonymized?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type OpinionSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type PatientCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    connect?: DoctorWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PatientUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    upsert?: DoctorUpsertWithoutUserInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutUserInput, DoctorUpdateWithoutUserInput>, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type PatientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    upsert?: DoctorUpsertWithoutUserInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutUserInput, DoctorUpdateWithoutUserInput>, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPatientInput = {
    create?: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientInput
    connect?: UserWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type OpinionCreateNestedManyWithoutPatientInput = {
    create?: XOR<OpinionCreateWithoutPatientInput, OpinionUncheckedCreateWithoutPatientInput> | OpinionCreateWithoutPatientInput[] | OpinionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutPatientInput | OpinionCreateOrConnectWithoutPatientInput[]
    createMany?: OpinionCreateManyPatientInputEnvelope
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type OpinionUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<OpinionCreateWithoutPatientInput, OpinionUncheckedCreateWithoutPatientInput> | OpinionCreateWithoutPatientInput[] | OpinionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutPatientInput | OpinionCreateOrConnectWithoutPatientInput[]
    createMany?: OpinionCreateManyPatientInputEnvelope
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPatientNestedInput = {
    create?: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientInput
    upsert?: UserUpsertWithoutPatientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientInput, UserUpdateWithoutPatientInput>, UserUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type OpinionUpdateManyWithoutPatientNestedInput = {
    create?: XOR<OpinionCreateWithoutPatientInput, OpinionUncheckedCreateWithoutPatientInput> | OpinionCreateWithoutPatientInput[] | OpinionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutPatientInput | OpinionCreateOrConnectWithoutPatientInput[]
    upsert?: OpinionUpsertWithWhereUniqueWithoutPatientInput | OpinionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: OpinionCreateManyPatientInputEnvelope
    set?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    disconnect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    delete?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    update?: OpinionUpdateWithWhereUniqueWithoutPatientInput | OpinionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: OpinionUpdateManyWithWhereWithoutPatientInput | OpinionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: OpinionScalarWhereInput | OpinionScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type OpinionUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<OpinionCreateWithoutPatientInput, OpinionUncheckedCreateWithoutPatientInput> | OpinionCreateWithoutPatientInput[] | OpinionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutPatientInput | OpinionCreateOrConnectWithoutPatientInput[]
    upsert?: OpinionUpsertWithWhereUniqueWithoutPatientInput | OpinionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: OpinionCreateManyPatientInputEnvelope
    set?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    disconnect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    delete?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    update?: OpinionUpdateWithWhereUniqueWithoutPatientInput | OpinionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: OpinionUpdateManyWithWhereWithoutPatientInput | OpinionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: OpinionScalarWhereInput | OpinionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDoctorInput = {
    create?: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorInput
    connect?: UserWhereUniqueInput
  }

  export type DoctorSpecialityCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorSpecialityCreateWithoutDoctorInput, DoctorSpecialityUncheckedCreateWithoutDoctorInput> | DoctorSpecialityCreateWithoutDoctorInput[] | DoctorSpecialityUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutDoctorInput | DoctorSpecialityCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorSpecialityCreateManyDoctorInputEnvelope
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
  }

  export type ExperienceCreateNestedManyWithoutDoctorInput = {
    create?: XOR<ExperienceCreateWithoutDoctorInput, ExperienceUncheckedCreateWithoutDoctorInput> | ExperienceCreateWithoutDoctorInput[] | ExperienceUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutDoctorInput | ExperienceCreateOrConnectWithoutDoctorInput[]
    createMany?: ExperienceCreateManyDoctorInputEnvelope
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
  }

  export type PricingCreateNestedManyWithoutDoctorInput = {
    create?: XOR<PricingCreateWithoutDoctorInput, PricingUncheckedCreateWithoutDoctorInput> | PricingCreateWithoutDoctorInput[] | PricingUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutDoctorInput | PricingCreateOrConnectWithoutDoctorInput[]
    createMany?: PricingCreateManyDoctorInputEnvelope
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
  }

  export type DoctorClinicCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorClinicCreateWithoutDoctorInput, DoctorClinicUncheckedCreateWithoutDoctorInput> | DoctorClinicCreateWithoutDoctorInput[] | DoctorClinicUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutDoctorInput | DoctorClinicCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorClinicCreateManyDoctorInputEnvelope
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type OpinionCreateNestedManyWithoutDoctorInput = {
    create?: XOR<OpinionCreateWithoutDoctorInput, OpinionUncheckedCreateWithoutDoctorInput> | OpinionCreateWithoutDoctorInput[] | OpinionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutDoctorInput | OpinionCreateOrConnectWithoutDoctorInput[]
    createMany?: OpinionCreateManyDoctorInputEnvelope
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
  }

  export type DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorSpecialityCreateWithoutDoctorInput, DoctorSpecialityUncheckedCreateWithoutDoctorInput> | DoctorSpecialityCreateWithoutDoctorInput[] | DoctorSpecialityUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutDoctorInput | DoctorSpecialityCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorSpecialityCreateManyDoctorInputEnvelope
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
  }

  export type ExperienceUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<ExperienceCreateWithoutDoctorInput, ExperienceUncheckedCreateWithoutDoctorInput> | ExperienceCreateWithoutDoctorInput[] | ExperienceUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutDoctorInput | ExperienceCreateOrConnectWithoutDoctorInput[]
    createMany?: ExperienceCreateManyDoctorInputEnvelope
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
  }

  export type PricingUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<PricingCreateWithoutDoctorInput, PricingUncheckedCreateWithoutDoctorInput> | PricingCreateWithoutDoctorInput[] | PricingUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutDoctorInput | PricingCreateOrConnectWithoutDoctorInput[]
    createMany?: PricingCreateManyDoctorInputEnvelope
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
  }

  export type DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorClinicCreateWithoutDoctorInput, DoctorClinicUncheckedCreateWithoutDoctorInput> | DoctorClinicCreateWithoutDoctorInput[] | DoctorClinicUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutDoctorInput | DoctorClinicCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorClinicCreateManyDoctorInputEnvelope
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type OpinionUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<OpinionCreateWithoutDoctorInput, OpinionUncheckedCreateWithoutDoctorInput> | OpinionCreateWithoutDoctorInput[] | OpinionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutDoctorInput | OpinionCreateOrConnectWithoutDoctorInput[]
    createMany?: OpinionCreateManyDoctorInputEnvelope
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDoctorNestedInput = {
    create?: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorInput
    upsert?: UserUpsertWithoutDoctorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorInput, UserUpdateWithoutDoctorInput>, UserUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorSpecialityUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorSpecialityCreateWithoutDoctorInput, DoctorSpecialityUncheckedCreateWithoutDoctorInput> | DoctorSpecialityCreateWithoutDoctorInput[] | DoctorSpecialityUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutDoctorInput | DoctorSpecialityCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorSpecialityUpsertWithWhereUniqueWithoutDoctorInput | DoctorSpecialityUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorSpecialityCreateManyDoctorInputEnvelope
    set?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    disconnect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    delete?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    update?: DoctorSpecialityUpdateWithWhereUniqueWithoutDoctorInput | DoctorSpecialityUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorSpecialityUpdateManyWithWhereWithoutDoctorInput | DoctorSpecialityUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorSpecialityScalarWhereInput | DoctorSpecialityScalarWhereInput[]
  }

  export type ExperienceUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<ExperienceCreateWithoutDoctorInput, ExperienceUncheckedCreateWithoutDoctorInput> | ExperienceCreateWithoutDoctorInput[] | ExperienceUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutDoctorInput | ExperienceCreateOrConnectWithoutDoctorInput[]
    upsert?: ExperienceUpsertWithWhereUniqueWithoutDoctorInput | ExperienceUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: ExperienceCreateManyDoctorInputEnvelope
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    update?: ExperienceUpdateWithWhereUniqueWithoutDoctorInput | ExperienceUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: ExperienceUpdateManyWithWhereWithoutDoctorInput | ExperienceUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
  }

  export type PricingUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<PricingCreateWithoutDoctorInput, PricingUncheckedCreateWithoutDoctorInput> | PricingCreateWithoutDoctorInput[] | PricingUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutDoctorInput | PricingCreateOrConnectWithoutDoctorInput[]
    upsert?: PricingUpsertWithWhereUniqueWithoutDoctorInput | PricingUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: PricingCreateManyDoctorInputEnvelope
    set?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    disconnect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    delete?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    update?: PricingUpdateWithWhereUniqueWithoutDoctorInput | PricingUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: PricingUpdateManyWithWhereWithoutDoctorInput | PricingUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: PricingScalarWhereInput | PricingScalarWhereInput[]
  }

  export type DoctorClinicUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorClinicCreateWithoutDoctorInput, DoctorClinicUncheckedCreateWithoutDoctorInput> | DoctorClinicCreateWithoutDoctorInput[] | DoctorClinicUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutDoctorInput | DoctorClinicCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorClinicUpsertWithWhereUniqueWithoutDoctorInput | DoctorClinicUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorClinicCreateManyDoctorInputEnvelope
    set?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    disconnect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    delete?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    update?: DoctorClinicUpdateWithWhereUniqueWithoutDoctorInput | DoctorClinicUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorClinicUpdateManyWithWhereWithoutDoctorInput | DoctorClinicUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorClinicScalarWhereInput | DoctorClinicScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type OpinionUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<OpinionCreateWithoutDoctorInput, OpinionUncheckedCreateWithoutDoctorInput> | OpinionCreateWithoutDoctorInput[] | OpinionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutDoctorInput | OpinionCreateOrConnectWithoutDoctorInput[]
    upsert?: OpinionUpsertWithWhereUniqueWithoutDoctorInput | OpinionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: OpinionCreateManyDoctorInputEnvelope
    set?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    disconnect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    delete?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    update?: OpinionUpdateWithWhereUniqueWithoutDoctorInput | OpinionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: OpinionUpdateManyWithWhereWithoutDoctorInput | OpinionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: OpinionScalarWhereInput | OpinionScalarWhereInput[]
  }

  export type DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorSpecialityCreateWithoutDoctorInput, DoctorSpecialityUncheckedCreateWithoutDoctorInput> | DoctorSpecialityCreateWithoutDoctorInput[] | DoctorSpecialityUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutDoctorInput | DoctorSpecialityCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorSpecialityUpsertWithWhereUniqueWithoutDoctorInput | DoctorSpecialityUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorSpecialityCreateManyDoctorInputEnvelope
    set?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    disconnect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    delete?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    update?: DoctorSpecialityUpdateWithWhereUniqueWithoutDoctorInput | DoctorSpecialityUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorSpecialityUpdateManyWithWhereWithoutDoctorInput | DoctorSpecialityUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorSpecialityScalarWhereInput | DoctorSpecialityScalarWhereInput[]
  }

  export type ExperienceUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<ExperienceCreateWithoutDoctorInput, ExperienceUncheckedCreateWithoutDoctorInput> | ExperienceCreateWithoutDoctorInput[] | ExperienceUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: ExperienceCreateOrConnectWithoutDoctorInput | ExperienceCreateOrConnectWithoutDoctorInput[]
    upsert?: ExperienceUpsertWithWhereUniqueWithoutDoctorInput | ExperienceUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: ExperienceCreateManyDoctorInputEnvelope
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[]
    update?: ExperienceUpdateWithWhereUniqueWithoutDoctorInput | ExperienceUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: ExperienceUpdateManyWithWhereWithoutDoctorInput | ExperienceUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
  }

  export type PricingUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<PricingCreateWithoutDoctorInput, PricingUncheckedCreateWithoutDoctorInput> | PricingCreateWithoutDoctorInput[] | PricingUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutDoctorInput | PricingCreateOrConnectWithoutDoctorInput[]
    upsert?: PricingUpsertWithWhereUniqueWithoutDoctorInput | PricingUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: PricingCreateManyDoctorInputEnvelope
    set?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    disconnect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    delete?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    update?: PricingUpdateWithWhereUniqueWithoutDoctorInput | PricingUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: PricingUpdateManyWithWhereWithoutDoctorInput | PricingUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: PricingScalarWhereInput | PricingScalarWhereInput[]
  }

  export type DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorClinicCreateWithoutDoctorInput, DoctorClinicUncheckedCreateWithoutDoctorInput> | DoctorClinicCreateWithoutDoctorInput[] | DoctorClinicUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutDoctorInput | DoctorClinicCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorClinicUpsertWithWhereUniqueWithoutDoctorInput | DoctorClinicUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorClinicCreateManyDoctorInputEnvelope
    set?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    disconnect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    delete?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    update?: DoctorClinicUpdateWithWhereUniqueWithoutDoctorInput | DoctorClinicUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorClinicUpdateManyWithWhereWithoutDoctorInput | DoctorClinicUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorClinicScalarWhereInput | DoctorClinicScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type OpinionUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<OpinionCreateWithoutDoctorInput, OpinionUncheckedCreateWithoutDoctorInput> | OpinionCreateWithoutDoctorInput[] | OpinionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: OpinionCreateOrConnectWithoutDoctorInput | OpinionCreateOrConnectWithoutDoctorInput[]
    upsert?: OpinionUpsertWithWhereUniqueWithoutDoctorInput | OpinionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: OpinionCreateManyDoctorInputEnvelope
    set?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    disconnect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    delete?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    connect?: OpinionWhereUniqueInput | OpinionWhereUniqueInput[]
    update?: OpinionUpdateWithWhereUniqueWithoutDoctorInput | OpinionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: OpinionUpdateManyWithWhereWithoutDoctorInput | OpinionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: OpinionScalarWhereInput | OpinionScalarWhereInput[]
  }

  export type DoctorSpecialityCreateNestedManyWithoutSpecialityInput = {
    create?: XOR<DoctorSpecialityCreateWithoutSpecialityInput, DoctorSpecialityUncheckedCreateWithoutSpecialityInput> | DoctorSpecialityCreateWithoutSpecialityInput[] | DoctorSpecialityUncheckedCreateWithoutSpecialityInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutSpecialityInput | DoctorSpecialityCreateOrConnectWithoutSpecialityInput[]
    createMany?: DoctorSpecialityCreateManySpecialityInputEnvelope
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
  }

  export type DoctorSpecialityUncheckedCreateNestedManyWithoutSpecialityInput = {
    create?: XOR<DoctorSpecialityCreateWithoutSpecialityInput, DoctorSpecialityUncheckedCreateWithoutSpecialityInput> | DoctorSpecialityCreateWithoutSpecialityInput[] | DoctorSpecialityUncheckedCreateWithoutSpecialityInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutSpecialityInput | DoctorSpecialityCreateOrConnectWithoutSpecialityInput[]
    createMany?: DoctorSpecialityCreateManySpecialityInputEnvelope
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
  }

  export type DoctorSpecialityUpdateManyWithoutSpecialityNestedInput = {
    create?: XOR<DoctorSpecialityCreateWithoutSpecialityInput, DoctorSpecialityUncheckedCreateWithoutSpecialityInput> | DoctorSpecialityCreateWithoutSpecialityInput[] | DoctorSpecialityUncheckedCreateWithoutSpecialityInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutSpecialityInput | DoctorSpecialityCreateOrConnectWithoutSpecialityInput[]
    upsert?: DoctorSpecialityUpsertWithWhereUniqueWithoutSpecialityInput | DoctorSpecialityUpsertWithWhereUniqueWithoutSpecialityInput[]
    createMany?: DoctorSpecialityCreateManySpecialityInputEnvelope
    set?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    disconnect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    delete?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    update?: DoctorSpecialityUpdateWithWhereUniqueWithoutSpecialityInput | DoctorSpecialityUpdateWithWhereUniqueWithoutSpecialityInput[]
    updateMany?: DoctorSpecialityUpdateManyWithWhereWithoutSpecialityInput | DoctorSpecialityUpdateManyWithWhereWithoutSpecialityInput[]
    deleteMany?: DoctorSpecialityScalarWhereInput | DoctorSpecialityScalarWhereInput[]
  }

  export type DoctorSpecialityUncheckedUpdateManyWithoutSpecialityNestedInput = {
    create?: XOR<DoctorSpecialityCreateWithoutSpecialityInput, DoctorSpecialityUncheckedCreateWithoutSpecialityInput> | DoctorSpecialityCreateWithoutSpecialityInput[] | DoctorSpecialityUncheckedCreateWithoutSpecialityInput[]
    connectOrCreate?: DoctorSpecialityCreateOrConnectWithoutSpecialityInput | DoctorSpecialityCreateOrConnectWithoutSpecialityInput[]
    upsert?: DoctorSpecialityUpsertWithWhereUniqueWithoutSpecialityInput | DoctorSpecialityUpsertWithWhereUniqueWithoutSpecialityInput[]
    createMany?: DoctorSpecialityCreateManySpecialityInputEnvelope
    set?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    disconnect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    delete?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    connect?: DoctorSpecialityWhereUniqueInput | DoctorSpecialityWhereUniqueInput[]
    update?: DoctorSpecialityUpdateWithWhereUniqueWithoutSpecialityInput | DoctorSpecialityUpdateWithWhereUniqueWithoutSpecialityInput[]
    updateMany?: DoctorSpecialityUpdateManyWithWhereWithoutSpecialityInput | DoctorSpecialityUpdateManyWithWhereWithoutSpecialityInput[]
    deleteMany?: DoctorSpecialityScalarWhereInput | DoctorSpecialityScalarWhereInput[]
  }

  export type DoctorCreateNestedOneWithoutSpecialitiesInput = {
    create?: XOR<DoctorCreateWithoutSpecialitiesInput, DoctorUncheckedCreateWithoutSpecialitiesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutSpecialitiesInput
    connect?: DoctorWhereUniqueInput
  }

  export type SpecialityCreateNestedOneWithoutDoctorsInput = {
    create?: XOR<SpecialityCreateWithoutDoctorsInput, SpecialityUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: SpecialityCreateOrConnectWithoutDoctorsInput
    connect?: SpecialityWhereUniqueInput
  }

  export type DoctorUpdateOneRequiredWithoutSpecialitiesNestedInput = {
    create?: XOR<DoctorCreateWithoutSpecialitiesInput, DoctorUncheckedCreateWithoutSpecialitiesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutSpecialitiesInput
    upsert?: DoctorUpsertWithoutSpecialitiesInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutSpecialitiesInput, DoctorUpdateWithoutSpecialitiesInput>, DoctorUncheckedUpdateWithoutSpecialitiesInput>
  }

  export type SpecialityUpdateOneRequiredWithoutDoctorsNestedInput = {
    create?: XOR<SpecialityCreateWithoutDoctorsInput, SpecialityUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: SpecialityCreateOrConnectWithoutDoctorsInput
    upsert?: SpecialityUpsertWithoutDoctorsInput
    connect?: SpecialityWhereUniqueInput
    update?: XOR<XOR<SpecialityUpdateToOneWithWhereWithoutDoctorsInput, SpecialityUpdateWithoutDoctorsInput>, SpecialityUncheckedUpdateWithoutDoctorsInput>
  }

  export type DoctorCreateNestedOneWithoutExperiencesInput = {
    create?: XOR<DoctorCreateWithoutExperiencesInput, DoctorUncheckedCreateWithoutExperiencesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutExperiencesInput
    connect?: DoctorWhereUniqueInput
  }

  export type EnumExperienceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExperienceType
  }

  export type DoctorUpdateOneRequiredWithoutExperiencesNestedInput = {
    create?: XOR<DoctorCreateWithoutExperiencesInput, DoctorUncheckedCreateWithoutExperiencesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutExperiencesInput
    upsert?: DoctorUpsertWithoutExperiencesInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutExperiencesInput, DoctorUpdateWithoutExperiencesInput>, DoctorUncheckedUpdateWithoutExperiencesInput>
  }

  export type DoctorClinicCreateNestedManyWithoutClinicInput = {
    create?: XOR<DoctorClinicCreateWithoutClinicInput, DoctorClinicUncheckedCreateWithoutClinicInput> | DoctorClinicCreateWithoutClinicInput[] | DoctorClinicUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutClinicInput | DoctorClinicCreateOrConnectWithoutClinicInput[]
    createMany?: DoctorClinicCreateManyClinicInputEnvelope
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
  }

  export type PricingCreateNestedManyWithoutClinicInput = {
    create?: XOR<PricingCreateWithoutClinicInput, PricingUncheckedCreateWithoutClinicInput> | PricingCreateWithoutClinicInput[] | PricingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutClinicInput | PricingCreateOrConnectWithoutClinicInput[]
    createMany?: PricingCreateManyClinicInputEnvelope
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutClinicInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type DoctorClinicUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<DoctorClinicCreateWithoutClinicInput, DoctorClinicUncheckedCreateWithoutClinicInput> | DoctorClinicCreateWithoutClinicInput[] | DoctorClinicUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutClinicInput | DoctorClinicCreateOrConnectWithoutClinicInput[]
    createMany?: DoctorClinicCreateManyClinicInputEnvelope
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
  }

  export type PricingUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<PricingCreateWithoutClinicInput, PricingUncheckedCreateWithoutClinicInput> | PricingCreateWithoutClinicInput[] | PricingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutClinicInput | PricingCreateOrConnectWithoutClinicInput[]
    createMany?: PricingCreateManyClinicInputEnvelope
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DoctorClinicUpdateManyWithoutClinicNestedInput = {
    create?: XOR<DoctorClinicCreateWithoutClinicInput, DoctorClinicUncheckedCreateWithoutClinicInput> | DoctorClinicCreateWithoutClinicInput[] | DoctorClinicUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutClinicInput | DoctorClinicCreateOrConnectWithoutClinicInput[]
    upsert?: DoctorClinicUpsertWithWhereUniqueWithoutClinicInput | DoctorClinicUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: DoctorClinicCreateManyClinicInputEnvelope
    set?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    disconnect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    delete?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    update?: DoctorClinicUpdateWithWhereUniqueWithoutClinicInput | DoctorClinicUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: DoctorClinicUpdateManyWithWhereWithoutClinicInput | DoctorClinicUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: DoctorClinicScalarWhereInput | DoctorClinicScalarWhereInput[]
  }

  export type PricingUpdateManyWithoutClinicNestedInput = {
    create?: XOR<PricingCreateWithoutClinicInput, PricingUncheckedCreateWithoutClinicInput> | PricingCreateWithoutClinicInput[] | PricingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutClinicInput | PricingCreateOrConnectWithoutClinicInput[]
    upsert?: PricingUpsertWithWhereUniqueWithoutClinicInput | PricingUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: PricingCreateManyClinicInputEnvelope
    set?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    disconnect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    delete?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    update?: PricingUpdateWithWhereUniqueWithoutClinicInput | PricingUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: PricingUpdateManyWithWhereWithoutClinicInput | PricingUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: PricingScalarWhereInput | PricingScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutClinicNestedInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClinicInput | AppointmentUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClinicInput | AppointmentUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClinicInput | AppointmentUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DoctorClinicUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<DoctorClinicCreateWithoutClinicInput, DoctorClinicUncheckedCreateWithoutClinicInput> | DoctorClinicCreateWithoutClinicInput[] | DoctorClinicUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorClinicCreateOrConnectWithoutClinicInput | DoctorClinicCreateOrConnectWithoutClinicInput[]
    upsert?: DoctorClinicUpsertWithWhereUniqueWithoutClinicInput | DoctorClinicUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: DoctorClinicCreateManyClinicInputEnvelope
    set?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    disconnect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    delete?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    connect?: DoctorClinicWhereUniqueInput | DoctorClinicWhereUniqueInput[]
    update?: DoctorClinicUpdateWithWhereUniqueWithoutClinicInput | DoctorClinicUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: DoctorClinicUpdateManyWithWhereWithoutClinicInput | DoctorClinicUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: DoctorClinicScalarWhereInput | DoctorClinicScalarWhereInput[]
  }

  export type PricingUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<PricingCreateWithoutClinicInput, PricingUncheckedCreateWithoutClinicInput> | PricingCreateWithoutClinicInput[] | PricingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: PricingCreateOrConnectWithoutClinicInput | PricingCreateOrConnectWithoutClinicInput[]
    upsert?: PricingUpsertWithWhereUniqueWithoutClinicInput | PricingUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: PricingCreateManyClinicInputEnvelope
    set?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    disconnect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    delete?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    connect?: PricingWhereUniqueInput | PricingWhereUniqueInput[]
    update?: PricingUpdateWithWhereUniqueWithoutClinicInput | PricingUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: PricingUpdateManyWithWhereWithoutClinicInput | PricingUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: PricingScalarWhereInput | PricingScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput> | AppointmentCreateWithoutClinicInput[] | AppointmentUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutClinicInput | AppointmentCreateOrConnectWithoutClinicInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutClinicInput | AppointmentUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: AppointmentCreateManyClinicInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutClinicInput | AppointmentUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutClinicInput | AppointmentUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DoctorCreateNestedOneWithoutClinicsInput = {
    create?: XOR<DoctorCreateWithoutClinicsInput, DoctorUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicsInput
    connect?: DoctorWhereUniqueInput
  }

  export type ClinicCreateNestedOneWithoutDoctorLinksInput = {
    create?: XOR<ClinicCreateWithoutDoctorLinksInput, ClinicUncheckedCreateWithoutDoctorLinksInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutDoctorLinksInput
    connect?: ClinicWhereUniqueInput
  }

  export type DoctorUpdateOneRequiredWithoutClinicsNestedInput = {
    create?: XOR<DoctorCreateWithoutClinicsInput, DoctorUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicsInput
    upsert?: DoctorUpsertWithoutClinicsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutClinicsInput, DoctorUpdateWithoutClinicsInput>, DoctorUncheckedUpdateWithoutClinicsInput>
  }

  export type ClinicUpdateOneRequiredWithoutDoctorLinksNestedInput = {
    create?: XOR<ClinicCreateWithoutDoctorLinksInput, ClinicUncheckedCreateWithoutDoctorLinksInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutDoctorLinksInput
    upsert?: ClinicUpsertWithoutDoctorLinksInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutDoctorLinksInput, ClinicUpdateWithoutDoctorLinksInput>, ClinicUncheckedUpdateWithoutDoctorLinksInput>
  }

  export type DoctorCreateNestedOneWithoutPricingsInput = {
    create?: XOR<DoctorCreateWithoutPricingsInput, DoctorUncheckedCreateWithoutPricingsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutPricingsInput
    connect?: DoctorWhereUniqueInput
  }

  export type ClinicCreateNestedOneWithoutPricingInput = {
    create?: XOR<ClinicCreateWithoutPricingInput, ClinicUncheckedCreateWithoutPricingInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutPricingInput
    connect?: ClinicWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutPricingInput = {
    create?: XOR<AppointmentCreateWithoutPricingInput, AppointmentUncheckedCreateWithoutPricingInput> | AppointmentCreateWithoutPricingInput[] | AppointmentUncheckedCreateWithoutPricingInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPricingInput | AppointmentCreateOrConnectWithoutPricingInput[]
    createMany?: AppointmentCreateManyPricingInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPricingInput = {
    create?: XOR<AppointmentCreateWithoutPricingInput, AppointmentUncheckedCreateWithoutPricingInput> | AppointmentCreateWithoutPricingInput[] | AppointmentUncheckedCreateWithoutPricingInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPricingInput | AppointmentCreateOrConnectWithoutPricingInput[]
    createMany?: AppointmentCreateManyPricingInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DoctorUpdateOneRequiredWithoutPricingsNestedInput = {
    create?: XOR<DoctorCreateWithoutPricingsInput, DoctorUncheckedCreateWithoutPricingsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutPricingsInput
    upsert?: DoctorUpsertWithoutPricingsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutPricingsInput, DoctorUpdateWithoutPricingsInput>, DoctorUncheckedUpdateWithoutPricingsInput>
  }

  export type ClinicUpdateOneRequiredWithoutPricingNestedInput = {
    create?: XOR<ClinicCreateWithoutPricingInput, ClinicUncheckedCreateWithoutPricingInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutPricingInput
    upsert?: ClinicUpsertWithoutPricingInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutPricingInput, ClinicUpdateWithoutPricingInput>, ClinicUncheckedUpdateWithoutPricingInput>
  }

  export type AppointmentUpdateManyWithoutPricingNestedInput = {
    create?: XOR<AppointmentCreateWithoutPricingInput, AppointmentUncheckedCreateWithoutPricingInput> | AppointmentCreateWithoutPricingInput[] | AppointmentUncheckedCreateWithoutPricingInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPricingInput | AppointmentCreateOrConnectWithoutPricingInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPricingInput | AppointmentUpsertWithWhereUniqueWithoutPricingInput[]
    createMany?: AppointmentCreateManyPricingInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPricingInput | AppointmentUpdateWithWhereUniqueWithoutPricingInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPricingInput | AppointmentUpdateManyWithWhereWithoutPricingInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPricingNestedInput = {
    create?: XOR<AppointmentCreateWithoutPricingInput, AppointmentUncheckedCreateWithoutPricingInput> | AppointmentCreateWithoutPricingInput[] | AppointmentUncheckedCreateWithoutPricingInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPricingInput | AppointmentCreateOrConnectWithoutPricingInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPricingInput | AppointmentUpsertWithWhereUniqueWithoutPricingInput[]
    createMany?: AppointmentCreateManyPricingInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPricingInput | AppointmentUpdateWithWhereUniqueWithoutPricingInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPricingInput | AppointmentUpdateManyWithWhereWithoutPricingInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DoctorCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutAppointmentsInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
  }

  export type ClinicCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutAppointmentsInput
    connect?: ClinicWhereUniqueInput
  }

  export type PricingCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PricingCreateWithoutAppointmentsInput, PricingUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PricingCreateOrConnectWithoutAppointmentsInput
    connect?: PricingWhereUniqueInput
  }

  export type EnumAppointmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentType
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type DoctorUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutAppointmentsInput
    upsert?: DoctorUpsertWithoutAppointmentsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutAppointmentsInput, DoctorUpdateWithoutAppointmentsInput>, DoctorUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentsInput
    upsert?: PatientUpsertWithoutAppointmentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAppointmentsInput, PatientUpdateWithoutAppointmentsInput>, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutAppointmentsInput
    upsert?: ClinicUpsertWithoutAppointmentsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutAppointmentsInput, ClinicUpdateWithoutAppointmentsInput>, ClinicUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PricingUpdateOneWithoutAppointmentsNestedInput = {
    create?: XOR<PricingCreateWithoutAppointmentsInput, PricingUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PricingCreateOrConnectWithoutAppointmentsInput
    upsert?: PricingUpsertWithoutAppointmentsInput
    disconnect?: PricingWhereInput | boolean
    delete?: PricingWhereInput | boolean
    connect?: PricingWhereUniqueInput
    update?: XOR<XOR<PricingUpdateToOneWithWhereWithoutAppointmentsInput, PricingUpdateWithoutAppointmentsInput>, PricingUncheckedUpdateWithoutAppointmentsInput>
  }

  export type DoctorCreateNestedOneWithoutOpinionsInput = {
    create?: XOR<DoctorCreateWithoutOpinionsInput, DoctorUncheckedCreateWithoutOpinionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutOpinionsInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutOpinionsInput = {
    create?: XOR<PatientCreateWithoutOpinionsInput, PatientUncheckedCreateWithoutOpinionsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutOpinionsInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorUpdateOneRequiredWithoutOpinionsNestedInput = {
    create?: XOR<DoctorCreateWithoutOpinionsInput, DoctorUncheckedCreateWithoutOpinionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutOpinionsInput
    upsert?: DoctorUpsertWithoutOpinionsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutOpinionsInput, DoctorUpdateWithoutOpinionsInput>, DoctorUncheckedUpdateWithoutOpinionsInput>
  }

  export type PatientUpdateOneRequiredWithoutOpinionsNestedInput = {
    create?: XOR<PatientCreateWithoutOpinionsInput, PatientUncheckedCreateWithoutOpinionsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutOpinionsInput
    upsert?: PatientUpsertWithoutOpinionsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutOpinionsInput, PatientUpdateWithoutOpinionsInput>, PatientUncheckedUpdateWithoutOpinionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumExperienceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeFilter<$PrismaModel> | $Enums.ExperienceType
  }

  export type NestedEnumExperienceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperienceTypeFilter<$PrismaModel>
    _max?: NestedEnumExperienceTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumAppointmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeFilter<$PrismaModel> | $Enums.AppointmentType
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentType | EnumAppointmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentType[] | ListEnumAppointmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAppointmentTypeFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type PatientCreateWithoutUserInput = {
    id?: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    opinions?: OpinionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutUserInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
  }

  export type DoctorCreateWithoutUserInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutUserInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
  }

  export type PatientUpsertWithoutUserInput = {
    update: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutUserInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    opinions?: OpinionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutUserInput = {
    update: XOR<DoctorUpdateWithoutUserInput, DoctorUncheckedUpdateWithoutUserInput>
    create: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutUserInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutUserInput, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type UserCreateWithoutPatientInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor?: DoctorCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPatientInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPatientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateWithoutPatientInput = {
    id?: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    clinic: ClinicCreateNestedOneWithoutAppointmentsInput
    pricing?: PricingCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string
    doctorId: string
    clinicId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type OpinionCreateWithoutPatientInput = {
    id?: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutOpinionsInput
  }

  export type OpinionUncheckedCreateWithoutPatientInput = {
    id?: string
    doctorId: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type OpinionCreateOrConnectWithoutPatientInput = {
    where: OpinionWhereUniqueInput
    create: XOR<OpinionCreateWithoutPatientInput, OpinionUncheckedCreateWithoutPatientInput>
  }

  export type OpinionCreateManyPatientInputEnvelope = {
    data: OpinionCreateManyPatientInput | OpinionCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPatientInput = {
    update: XOR<UserUpdateWithoutPatientInput, UserUncheckedUpdateWithoutPatientInput>
    create: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientInput, UserUncheckedUpdateWithoutPatientInput>
  }

  export type UserUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    clinicId?: StringFilter<"Appointment"> | string
    pricingId?: StringNullableFilter<"Appointment"> | string | null
    datetime?: DateTimeFilter<"Appointment"> | Date | string
    durationMinutes?: IntFilter<"Appointment"> | number
    type?: EnumAppointmentTypeFilter<"Appointment"> | $Enums.AppointmentType
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Appointment"> | Date | string | null
  }

  export type OpinionUpsertWithWhereUniqueWithoutPatientInput = {
    where: OpinionWhereUniqueInput
    update: XOR<OpinionUpdateWithoutPatientInput, OpinionUncheckedUpdateWithoutPatientInput>
    create: XOR<OpinionCreateWithoutPatientInput, OpinionUncheckedCreateWithoutPatientInput>
  }

  export type OpinionUpdateWithWhereUniqueWithoutPatientInput = {
    where: OpinionWhereUniqueInput
    data: XOR<OpinionUpdateWithoutPatientInput, OpinionUncheckedUpdateWithoutPatientInput>
  }

  export type OpinionUpdateManyWithWhereWithoutPatientInput = {
    where: OpinionScalarWhereInput
    data: XOR<OpinionUpdateManyMutationInput, OpinionUncheckedUpdateManyWithoutPatientInput>
  }

  export type OpinionScalarWhereInput = {
    AND?: OpinionScalarWhereInput | OpinionScalarWhereInput[]
    OR?: OpinionScalarWhereInput[]
    NOT?: OpinionScalarWhereInput | OpinionScalarWhereInput[]
    id?: StringFilter<"Opinion"> | string
    doctorId?: StringFilter<"Opinion"> | string
    patientId?: StringFilter<"Opinion"> | string
    rating?: IntFilter<"Opinion"> | number
    title?: StringNullableFilter<"Opinion"> | string | null
    description?: StringNullableFilter<"Opinion"> | string | null
    anonymized?: BoolFilter<"Opinion"> | boolean
    createdAt?: DateTimeFilter<"Opinion"> | Date | string
    updatedAt?: DateTimeFilter<"Opinion"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Opinion"> | Date | string | null
  }

  export type UserCreateWithoutDoctorInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patient?: PatientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorSpecialityCreateWithoutDoctorInput = {
    createdAt?: Date | string
    speciality: SpecialityCreateNestedOneWithoutDoctorsInput
  }

  export type DoctorSpecialityUncheckedCreateWithoutDoctorInput = {
    specialityId: string
    createdAt?: Date | string
  }

  export type DoctorSpecialityCreateOrConnectWithoutDoctorInput = {
    where: DoctorSpecialityWhereUniqueInput
    create: XOR<DoctorSpecialityCreateWithoutDoctorInput, DoctorSpecialityUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorSpecialityCreateManyDoctorInputEnvelope = {
    data: DoctorSpecialityCreateManyDoctorInput | DoctorSpecialityCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type ExperienceCreateWithoutDoctorInput = {
    id?: string
    experienceType?: $Enums.ExperienceType
    title: string
    institution?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExperienceUncheckedCreateWithoutDoctorInput = {
    id?: string
    experienceType?: $Enums.ExperienceType
    title: string
    institution?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ExperienceCreateOrConnectWithoutDoctorInput = {
    where: ExperienceWhereUniqueInput
    create: XOR<ExperienceCreateWithoutDoctorInput, ExperienceUncheckedCreateWithoutDoctorInput>
  }

  export type ExperienceCreateManyDoctorInputEnvelope = {
    data: ExperienceCreateManyDoctorInput | ExperienceCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type PricingCreateWithoutDoctorInput = {
    id?: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    clinic: ClinicCreateNestedOneWithoutPricingInput
    appointments?: AppointmentCreateNestedManyWithoutPricingInput
  }

  export type PricingUncheckedCreateWithoutDoctorInput = {
    id?: string
    clinicId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPricingInput
  }

  export type PricingCreateOrConnectWithoutDoctorInput = {
    where: PricingWhereUniqueInput
    create: XOR<PricingCreateWithoutDoctorInput, PricingUncheckedCreateWithoutDoctorInput>
  }

  export type PricingCreateManyDoctorInputEnvelope = {
    data: PricingCreateManyDoctorInput | PricingCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type DoctorClinicCreateWithoutDoctorInput = {
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutDoctorLinksInput
  }

  export type DoctorClinicUncheckedCreateWithoutDoctorInput = {
    clinicId: string
    createdAt?: Date | string
  }

  export type DoctorClinicCreateOrConnectWithoutDoctorInput = {
    where: DoctorClinicWhereUniqueInput
    create: XOR<DoctorClinicCreateWithoutDoctorInput, DoctorClinicUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorClinicCreateManyDoctorInputEnvelope = {
    data: DoctorClinicCreateManyDoctorInput | DoctorClinicCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutDoctorInput = {
    id?: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    clinic: ClinicCreateNestedOneWithoutAppointmentsInput
    pricing?: PricingCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    clinicId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentCreateOrConnectWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateManyDoctorInputEnvelope = {
    data: AppointmentCreateManyDoctorInput | AppointmentCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type OpinionCreateWithoutDoctorInput = {
    id?: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    patient: PatientCreateNestedOneWithoutOpinionsInput
  }

  export type OpinionUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type OpinionCreateOrConnectWithoutDoctorInput = {
    where: OpinionWhereUniqueInput
    create: XOR<OpinionCreateWithoutDoctorInput, OpinionUncheckedCreateWithoutDoctorInput>
  }

  export type OpinionCreateManyDoctorInputEnvelope = {
    data: OpinionCreateManyDoctorInput | OpinionCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDoctorInput = {
    update: XOR<UserUpdateWithoutDoctorInput, UserUncheckedUpdateWithoutDoctorInput>
    create: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorInput, UserUncheckedUpdateWithoutDoctorInput>
  }

  export type UserUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type DoctorSpecialityUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorSpecialityWhereUniqueInput
    update: XOR<DoctorSpecialityUpdateWithoutDoctorInput, DoctorSpecialityUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorSpecialityCreateWithoutDoctorInput, DoctorSpecialityUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorSpecialityUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorSpecialityWhereUniqueInput
    data: XOR<DoctorSpecialityUpdateWithoutDoctorInput, DoctorSpecialityUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorSpecialityUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorSpecialityScalarWhereInput
    data: XOR<DoctorSpecialityUpdateManyMutationInput, DoctorSpecialityUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorSpecialityScalarWhereInput = {
    AND?: DoctorSpecialityScalarWhereInput | DoctorSpecialityScalarWhereInput[]
    OR?: DoctorSpecialityScalarWhereInput[]
    NOT?: DoctorSpecialityScalarWhereInput | DoctorSpecialityScalarWhereInput[]
    doctorId?: StringFilter<"DoctorSpeciality"> | string
    specialityId?: StringFilter<"DoctorSpeciality"> | string
    createdAt?: DateTimeFilter<"DoctorSpeciality"> | Date | string
  }

  export type ExperienceUpsertWithWhereUniqueWithoutDoctorInput = {
    where: ExperienceWhereUniqueInput
    update: XOR<ExperienceUpdateWithoutDoctorInput, ExperienceUncheckedUpdateWithoutDoctorInput>
    create: XOR<ExperienceCreateWithoutDoctorInput, ExperienceUncheckedCreateWithoutDoctorInput>
  }

  export type ExperienceUpdateWithWhereUniqueWithoutDoctorInput = {
    where: ExperienceWhereUniqueInput
    data: XOR<ExperienceUpdateWithoutDoctorInput, ExperienceUncheckedUpdateWithoutDoctorInput>
  }

  export type ExperienceUpdateManyWithWhereWithoutDoctorInput = {
    where: ExperienceScalarWhereInput
    data: XOR<ExperienceUpdateManyMutationInput, ExperienceUncheckedUpdateManyWithoutDoctorInput>
  }

  export type ExperienceScalarWhereInput = {
    AND?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
    OR?: ExperienceScalarWhereInput[]
    NOT?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[]
    id?: StringFilter<"Experience"> | string
    doctorId?: StringFilter<"Experience"> | string
    experienceType?: EnumExperienceTypeFilter<"Experience"> | $Enums.ExperienceType
    title?: StringFilter<"Experience"> | string
    institution?: StringNullableFilter<"Experience"> | string | null
    startDate?: DateTimeNullableFilter<"Experience"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Experience"> | Date | string | null
    description?: StringNullableFilter<"Experience"> | string | null
    createdAt?: DateTimeFilter<"Experience"> | Date | string
    updatedAt?: DateTimeFilter<"Experience"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Experience"> | Date | string | null
  }

  export type PricingUpsertWithWhereUniqueWithoutDoctorInput = {
    where: PricingWhereUniqueInput
    update: XOR<PricingUpdateWithoutDoctorInput, PricingUncheckedUpdateWithoutDoctorInput>
    create: XOR<PricingCreateWithoutDoctorInput, PricingUncheckedCreateWithoutDoctorInput>
  }

  export type PricingUpdateWithWhereUniqueWithoutDoctorInput = {
    where: PricingWhereUniqueInput
    data: XOR<PricingUpdateWithoutDoctorInput, PricingUncheckedUpdateWithoutDoctorInput>
  }

  export type PricingUpdateManyWithWhereWithoutDoctorInput = {
    where: PricingScalarWhereInput
    data: XOR<PricingUpdateManyMutationInput, PricingUncheckedUpdateManyWithoutDoctorInput>
  }

  export type PricingScalarWhereInput = {
    AND?: PricingScalarWhereInput | PricingScalarWhereInput[]
    OR?: PricingScalarWhereInput[]
    NOT?: PricingScalarWhereInput | PricingScalarWhereInput[]
    id?: StringFilter<"Pricing"> | string
    doctorId?: StringFilter<"Pricing"> | string
    clinicId?: StringFilter<"Pricing"> | string
    title?: StringFilter<"Pricing"> | string
    price?: DecimalFilter<"Pricing"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Pricing"> | string
    durationMinutes?: IntFilter<"Pricing"> | number
    description?: StringNullableFilter<"Pricing"> | string | null
    isActive?: BoolFilter<"Pricing"> | boolean
    createdAt?: DateTimeFilter<"Pricing"> | Date | string
    updatedAt?: DateTimeFilter<"Pricing"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Pricing"> | Date | string | null
  }

  export type DoctorClinicUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorClinicWhereUniqueInput
    update: XOR<DoctorClinicUpdateWithoutDoctorInput, DoctorClinicUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorClinicCreateWithoutDoctorInput, DoctorClinicUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorClinicUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorClinicWhereUniqueInput
    data: XOR<DoctorClinicUpdateWithoutDoctorInput, DoctorClinicUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorClinicUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorClinicScalarWhereInput
    data: XOR<DoctorClinicUpdateManyMutationInput, DoctorClinicUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorClinicScalarWhereInput = {
    AND?: DoctorClinicScalarWhereInput | DoctorClinicScalarWhereInput[]
    OR?: DoctorClinicScalarWhereInput[]
    NOT?: DoctorClinicScalarWhereInput | DoctorClinicScalarWhereInput[]
    doctorId?: StringFilter<"DoctorClinic"> | string
    clinicId?: StringFilter<"DoctorClinic"> | string
    createdAt?: DateTimeFilter<"DoctorClinic"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutDoctorInput>
  }

  export type OpinionUpsertWithWhereUniqueWithoutDoctorInput = {
    where: OpinionWhereUniqueInput
    update: XOR<OpinionUpdateWithoutDoctorInput, OpinionUncheckedUpdateWithoutDoctorInput>
    create: XOR<OpinionCreateWithoutDoctorInput, OpinionUncheckedCreateWithoutDoctorInput>
  }

  export type OpinionUpdateWithWhereUniqueWithoutDoctorInput = {
    where: OpinionWhereUniqueInput
    data: XOR<OpinionUpdateWithoutDoctorInput, OpinionUncheckedUpdateWithoutDoctorInput>
  }

  export type OpinionUpdateManyWithWhereWithoutDoctorInput = {
    where: OpinionScalarWhereInput
    data: XOR<OpinionUpdateManyMutationInput, OpinionUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorSpecialityCreateWithoutSpecialityInput = {
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutSpecialitiesInput
  }

  export type DoctorSpecialityUncheckedCreateWithoutSpecialityInput = {
    doctorId: string
    createdAt?: Date | string
  }

  export type DoctorSpecialityCreateOrConnectWithoutSpecialityInput = {
    where: DoctorSpecialityWhereUniqueInput
    create: XOR<DoctorSpecialityCreateWithoutSpecialityInput, DoctorSpecialityUncheckedCreateWithoutSpecialityInput>
  }

  export type DoctorSpecialityCreateManySpecialityInputEnvelope = {
    data: DoctorSpecialityCreateManySpecialityInput | DoctorSpecialityCreateManySpecialityInput[]
    skipDuplicates?: boolean
  }

  export type DoctorSpecialityUpsertWithWhereUniqueWithoutSpecialityInput = {
    where: DoctorSpecialityWhereUniqueInput
    update: XOR<DoctorSpecialityUpdateWithoutSpecialityInput, DoctorSpecialityUncheckedUpdateWithoutSpecialityInput>
    create: XOR<DoctorSpecialityCreateWithoutSpecialityInput, DoctorSpecialityUncheckedCreateWithoutSpecialityInput>
  }

  export type DoctorSpecialityUpdateWithWhereUniqueWithoutSpecialityInput = {
    where: DoctorSpecialityWhereUniqueInput
    data: XOR<DoctorSpecialityUpdateWithoutSpecialityInput, DoctorSpecialityUncheckedUpdateWithoutSpecialityInput>
  }

  export type DoctorSpecialityUpdateManyWithWhereWithoutSpecialityInput = {
    where: DoctorSpecialityScalarWhereInput
    data: XOR<DoctorSpecialityUpdateManyMutationInput, DoctorSpecialityUncheckedUpdateManyWithoutSpecialityInput>
  }

  export type DoctorCreateWithoutSpecialitiesInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutSpecialitiesInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutSpecialitiesInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutSpecialitiesInput, DoctorUncheckedCreateWithoutSpecialitiesInput>
  }

  export type SpecialityCreateWithoutDoctorsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SpecialityUncheckedCreateWithoutDoctorsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type SpecialityCreateOrConnectWithoutDoctorsInput = {
    where: SpecialityWhereUniqueInput
    create: XOR<SpecialityCreateWithoutDoctorsInput, SpecialityUncheckedCreateWithoutDoctorsInput>
  }

  export type DoctorUpsertWithoutSpecialitiesInput = {
    update: XOR<DoctorUpdateWithoutSpecialitiesInput, DoctorUncheckedUpdateWithoutSpecialitiesInput>
    create: XOR<DoctorCreateWithoutSpecialitiesInput, DoctorUncheckedCreateWithoutSpecialitiesInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutSpecialitiesInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutSpecialitiesInput, DoctorUncheckedUpdateWithoutSpecialitiesInput>
  }

  export type DoctorUpdateWithoutSpecialitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutSpecialitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type SpecialityUpsertWithoutDoctorsInput = {
    update: XOR<SpecialityUpdateWithoutDoctorsInput, SpecialityUncheckedUpdateWithoutDoctorsInput>
    create: XOR<SpecialityCreateWithoutDoctorsInput, SpecialityUncheckedCreateWithoutDoctorsInput>
    where?: SpecialityWhereInput
  }

  export type SpecialityUpdateToOneWithWhereWithoutDoctorsInput = {
    where?: SpecialityWhereInput
    data: XOR<SpecialityUpdateWithoutDoctorsInput, SpecialityUncheckedUpdateWithoutDoctorsInput>
  }

  export type SpecialityUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SpecialityUncheckedUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorCreateWithoutExperiencesInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutExperiencesInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutExperiencesInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutExperiencesInput, DoctorUncheckedCreateWithoutExperiencesInput>
  }

  export type DoctorUpsertWithoutExperiencesInput = {
    update: XOR<DoctorUpdateWithoutExperiencesInput, DoctorUncheckedUpdateWithoutExperiencesInput>
    create: XOR<DoctorCreateWithoutExperiencesInput, DoctorUncheckedCreateWithoutExperiencesInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutExperiencesInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutExperiencesInput, DoctorUncheckedUpdateWithoutExperiencesInput>
  }

  export type DoctorUpdateWithoutExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorClinicCreateWithoutClinicInput = {
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutClinicsInput
  }

  export type DoctorClinicUncheckedCreateWithoutClinicInput = {
    doctorId: string
    createdAt?: Date | string
  }

  export type DoctorClinicCreateOrConnectWithoutClinicInput = {
    where: DoctorClinicWhereUniqueInput
    create: XOR<DoctorClinicCreateWithoutClinicInput, DoctorClinicUncheckedCreateWithoutClinicInput>
  }

  export type DoctorClinicCreateManyClinicInputEnvelope = {
    data: DoctorClinicCreateManyClinicInput | DoctorClinicCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type PricingCreateWithoutClinicInput = {
    id?: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutPricingsInput
    appointments?: AppointmentCreateNestedManyWithoutPricingInput
  }

  export type PricingUncheckedCreateWithoutClinicInput = {
    id?: string
    doctorId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPricingInput
  }

  export type PricingCreateOrConnectWithoutClinicInput = {
    where: PricingWhereUniqueInput
    create: XOR<PricingCreateWithoutClinicInput, PricingUncheckedCreateWithoutClinicInput>
  }

  export type PricingCreateManyClinicInputEnvelope = {
    data: PricingCreateManyClinicInput | PricingCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutClinicInput = {
    id?: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    pricing?: PricingCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutClinicInput = {
    id?: string
    doctorId: string
    patientId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentCreateOrConnectWithoutClinicInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput>
  }

  export type AppointmentCreateManyClinicInputEnvelope = {
    data: AppointmentCreateManyClinicInput | AppointmentCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type DoctorClinicUpsertWithWhereUniqueWithoutClinicInput = {
    where: DoctorClinicWhereUniqueInput
    update: XOR<DoctorClinicUpdateWithoutClinicInput, DoctorClinicUncheckedUpdateWithoutClinicInput>
    create: XOR<DoctorClinicCreateWithoutClinicInput, DoctorClinicUncheckedCreateWithoutClinicInput>
  }

  export type DoctorClinicUpdateWithWhereUniqueWithoutClinicInput = {
    where: DoctorClinicWhereUniqueInput
    data: XOR<DoctorClinicUpdateWithoutClinicInput, DoctorClinicUncheckedUpdateWithoutClinicInput>
  }

  export type DoctorClinicUpdateManyWithWhereWithoutClinicInput = {
    where: DoctorClinicScalarWhereInput
    data: XOR<DoctorClinicUpdateManyMutationInput, DoctorClinicUncheckedUpdateManyWithoutClinicInput>
  }

  export type PricingUpsertWithWhereUniqueWithoutClinicInput = {
    where: PricingWhereUniqueInput
    update: XOR<PricingUpdateWithoutClinicInput, PricingUncheckedUpdateWithoutClinicInput>
    create: XOR<PricingCreateWithoutClinicInput, PricingUncheckedCreateWithoutClinicInput>
  }

  export type PricingUpdateWithWhereUniqueWithoutClinicInput = {
    where: PricingWhereUniqueInput
    data: XOR<PricingUpdateWithoutClinicInput, PricingUncheckedUpdateWithoutClinicInput>
  }

  export type PricingUpdateManyWithWhereWithoutClinicInput = {
    where: PricingScalarWhereInput
    data: XOR<PricingUpdateManyMutationInput, PricingUncheckedUpdateManyWithoutClinicInput>
  }

  export type AppointmentUpsertWithWhereUniqueWithoutClinicInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutClinicInput, AppointmentUncheckedUpdateWithoutClinicInput>
    create: XOR<AppointmentCreateWithoutClinicInput, AppointmentUncheckedCreateWithoutClinicInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutClinicInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutClinicInput, AppointmentUncheckedUpdateWithoutClinicInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutClinicInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutClinicInput>
  }

  export type DoctorCreateWithoutClinicsInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutClinicsInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutClinicsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutClinicsInput, DoctorUncheckedCreateWithoutClinicsInput>
  }

  export type ClinicCreateWithoutDoctorLinksInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    pricing?: PricingCreateNestedManyWithoutClinicInput
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutDoctorLinksInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    pricing?: PricingUncheckedCreateNestedManyWithoutClinicInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutDoctorLinksInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutDoctorLinksInput, ClinicUncheckedCreateWithoutDoctorLinksInput>
  }

  export type DoctorUpsertWithoutClinicsInput = {
    update: XOR<DoctorUpdateWithoutClinicsInput, DoctorUncheckedUpdateWithoutClinicsInput>
    create: XOR<DoctorCreateWithoutClinicsInput, DoctorUncheckedCreateWithoutClinicsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutClinicsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutClinicsInput, DoctorUncheckedUpdateWithoutClinicsInput>
  }

  export type DoctorUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type ClinicUpsertWithoutDoctorLinksInput = {
    update: XOR<ClinicUpdateWithoutDoctorLinksInput, ClinicUncheckedUpdateWithoutDoctorLinksInput>
    create: XOR<ClinicCreateWithoutDoctorLinksInput, ClinicUncheckedCreateWithoutDoctorLinksInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutDoctorLinksInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutDoctorLinksInput, ClinicUncheckedUpdateWithoutDoctorLinksInput>
  }

  export type ClinicUpdateWithoutDoctorLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pricing?: PricingUpdateManyWithoutClinicNestedInput
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutDoctorLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pricing?: PricingUncheckedUpdateManyWithoutClinicNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type DoctorCreateWithoutPricingsInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutPricingsInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutPricingsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutPricingsInput, DoctorUncheckedCreateWithoutPricingsInput>
  }

  export type ClinicCreateWithoutPricingInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctorLinks?: DoctorClinicCreateNestedManyWithoutClinicInput
    appointments?: AppointmentCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutPricingInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctorLinks?: DoctorClinicUncheckedCreateNestedManyWithoutClinicInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutPricingInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutPricingInput, ClinicUncheckedCreateWithoutPricingInput>
  }

  export type AppointmentCreateWithoutPricingInput = {
    id?: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutAppointmentsInput
    patient: PatientCreateNestedOneWithoutAppointmentsInput
    clinic: ClinicCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutPricingInput = {
    id?: string
    doctorId: string
    patientId: string
    clinicId: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentCreateOrConnectWithoutPricingInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPricingInput, AppointmentUncheckedCreateWithoutPricingInput>
  }

  export type AppointmentCreateManyPricingInputEnvelope = {
    data: AppointmentCreateManyPricingInput | AppointmentCreateManyPricingInput[]
    skipDuplicates?: boolean
  }

  export type DoctorUpsertWithoutPricingsInput = {
    update: XOR<DoctorUpdateWithoutPricingsInput, DoctorUncheckedUpdateWithoutPricingsInput>
    create: XOR<DoctorCreateWithoutPricingsInput, DoctorUncheckedCreateWithoutPricingsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutPricingsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutPricingsInput, DoctorUncheckedUpdateWithoutPricingsInput>
  }

  export type DoctorUpdateWithoutPricingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutPricingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type ClinicUpsertWithoutPricingInput = {
    update: XOR<ClinicUpdateWithoutPricingInput, ClinicUncheckedUpdateWithoutPricingInput>
    create: XOR<ClinicCreateWithoutPricingInput, ClinicUncheckedCreateWithoutPricingInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutPricingInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutPricingInput, ClinicUncheckedUpdateWithoutPricingInput>
  }

  export type ClinicUpdateWithoutPricingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctorLinks?: DoctorClinicUpdateManyWithoutClinicNestedInput
    appointments?: AppointmentUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutPricingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctorLinks?: DoctorClinicUncheckedUpdateManyWithoutClinicNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPricingInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPricingInput, AppointmentUncheckedUpdateWithoutPricingInput>
    create: XOR<AppointmentCreateWithoutPricingInput, AppointmentUncheckedCreateWithoutPricingInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPricingInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPricingInput, AppointmentUncheckedUpdateWithoutPricingInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPricingInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPricingInput>
  }

  export type DoctorCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    opinions?: OpinionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    opinions?: OpinionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutAppointmentsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
  }

  export type PatientCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPatientInput
    opinions?: OpinionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    opinions?: OpinionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
  }

  export type ClinicCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctorLinks?: DoctorClinicCreateNestedManyWithoutClinicInput
    pricing?: PricingCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    name: string
    address?: string | null
    country?: string | null
    city?: string | null
    neighborhood?: string | null
    latitude?: number | null
    longitude?: number | null
    isVirtual?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctorLinks?: DoctorClinicUncheckedCreateNestedManyWithoutClinicInput
    pricing?: PricingUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutAppointmentsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
  }

  export type PricingCreateWithoutAppointmentsInput = {
    id?: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    doctor: DoctorCreateNestedOneWithoutPricingsInput
    clinic: ClinicCreateNestedOneWithoutPricingInput
  }

  export type PricingUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    doctorId: string
    clinicId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PricingCreateOrConnectWithoutAppointmentsInput = {
    where: PricingWhereUniqueInput
    create: XOR<PricingCreateWithoutAppointmentsInput, PricingUncheckedCreateWithoutAppointmentsInput>
  }

  export type DoctorUpsertWithoutAppointmentsInput = {
    update: XOR<DoctorUpdateWithoutAppointmentsInput, DoctorUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<DoctorCreateWithoutAppointmentsInput, DoctorUncheckedCreateWithoutAppointmentsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutAppointmentsInput, DoctorUncheckedUpdateWithoutAppointmentsInput>
  }

  export type DoctorUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    opinions?: OpinionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type PatientUpsertWithoutAppointmentsInput = {
    update: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PatientCreateWithoutAppointmentsInput, PatientUncheckedCreateWithoutAppointmentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAppointmentsInput, PatientUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    opinions?: OpinionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    opinions?: OpinionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type ClinicUpsertWithoutAppointmentsInput = {
    update: XOR<ClinicUpdateWithoutAppointmentsInput, ClinicUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ClinicCreateWithoutAppointmentsInput, ClinicUncheckedCreateWithoutAppointmentsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutAppointmentsInput, ClinicUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ClinicUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctorLinks?: DoctorClinicUpdateManyWithoutClinicNestedInput
    pricing?: PricingUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isVirtual?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctorLinks?: DoctorClinicUncheckedUpdateManyWithoutClinicNestedInput
    pricing?: PricingUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type PricingUpsertWithoutAppointmentsInput = {
    update: XOR<PricingUpdateWithoutAppointmentsInput, PricingUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PricingCreateWithoutAppointmentsInput, PricingUncheckedCreateWithoutAppointmentsInput>
    where?: PricingWhereInput
  }

  export type PricingUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PricingWhereInput
    data: XOR<PricingUpdateWithoutAppointmentsInput, PricingUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PricingUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutPricingsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutPricingNestedInput
  }

  export type PricingUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorCreateWithoutOpinionsInput = {
    id?: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDoctorInput
    specialities?: DoctorSpecialityCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceCreateNestedManyWithoutDoctorInput
    pricings?: PricingCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutOpinionsInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email?: string | null
    phone?: string | null
    picaddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    specialities?: DoctorSpecialityUncheckedCreateNestedManyWithoutDoctorInput
    experiences?: ExperienceUncheckedCreateNestedManyWithoutDoctorInput
    pricings?: PricingUncheckedCreateNestedManyWithoutDoctorInput
    clinics?: DoctorClinicUncheckedCreateNestedManyWithoutDoctorInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutOpinionsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutOpinionsInput, DoctorUncheckedCreateWithoutOpinionsInput>
  }

  export type PatientCreateWithoutOpinionsInput = {
    id?: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutPatientInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutOpinionsInput = {
    id?: string
    userId: string
    name: string
    surname: string
    email: string
    phone?: string | null
    birthdate?: Date | string | null
    gender?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutOpinionsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutOpinionsInput, PatientUncheckedCreateWithoutOpinionsInput>
  }

  export type DoctorUpsertWithoutOpinionsInput = {
    update: XOR<DoctorUpdateWithoutOpinionsInput, DoctorUncheckedUpdateWithoutOpinionsInput>
    create: XOR<DoctorCreateWithoutOpinionsInput, DoctorUncheckedCreateWithoutOpinionsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutOpinionsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutOpinionsInput, DoctorUncheckedUpdateWithoutOpinionsInput>
  }

  export type DoctorUpdateWithoutOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    specialities?: DoctorSpecialityUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    picaddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialities?: DoctorSpecialityUncheckedUpdateManyWithoutDoctorNestedInput
    experiences?: ExperienceUncheckedUpdateManyWithoutDoctorNestedInput
    pricings?: PricingUncheckedUpdateManyWithoutDoctorNestedInput
    clinics?: DoctorClinicUncheckedUpdateManyWithoutDoctorNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type PatientUpsertWithoutOpinionsInput = {
    update: XOR<PatientUpdateWithoutOpinionsInput, PatientUncheckedUpdateWithoutOpinionsInput>
    create: XOR<PatientCreateWithoutOpinionsInput, PatientUncheckedCreateWithoutOpinionsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutOpinionsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutOpinionsInput, PatientUncheckedUpdateWithoutOpinionsInput>
  }

  export type PatientUpdateWithoutOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPatientNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type AppointmentCreateManyPatientInput = {
    id?: string
    doctorId: string
    clinicId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type OpinionCreateManyPatientInput = {
    id?: string
    doctorId: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutAppointmentsNestedInput
    pricing?: PricingUpdateOneWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutOpinionsNestedInput
  }

  export type OpinionUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorSpecialityCreateManyDoctorInput = {
    specialityId: string
    createdAt?: Date | string
  }

  export type ExperienceCreateManyDoctorInput = {
    id?: string
    experienceType?: $Enums.ExperienceType
    title: string
    institution?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PricingCreateManyDoctorInput = {
    id?: string
    clinicId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DoctorClinicCreateManyDoctorInput = {
    clinicId: string
    createdAt?: Date | string
  }

  export type AppointmentCreateManyDoctorInput = {
    id?: string
    patientId: string
    clinicId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type OpinionCreateManyDoctorInput = {
    id?: string
    patientId: string
    rating: number
    title?: string | null
    description?: string | null
    anonymized?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DoctorSpecialityUpdateWithoutDoctorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    speciality?: SpecialityUpdateOneRequiredWithoutDoctorsNestedInput
  }

  export type DoctorSpecialityUncheckedUpdateWithoutDoctorInput = {
    specialityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorSpecialityUncheckedUpdateManyWithoutDoctorInput = {
    specialityId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperienceUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExperienceUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExperienceUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceType?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PricingUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clinic?: ClinicUpdateOneRequiredWithoutPricingNestedInput
    appointments?: AppointmentUpdateManyWithoutPricingNestedInput
  }

  export type PricingUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUncheckedUpdateManyWithoutPricingNestedInput
  }

  export type PricingUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorClinicUpdateWithoutDoctorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutDoctorLinksNestedInput
  }

  export type DoctorClinicUncheckedUpdateWithoutDoctorInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorClinicUncheckedUpdateManyWithoutDoctorInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutAppointmentsNestedInput
    pricing?: PricingUpdateOneWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneRequiredWithoutOpinionsNestedInput
  }

  export type OpinionUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OpinionUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    anonymized?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorSpecialityCreateManySpecialityInput = {
    doctorId: string
    createdAt?: Date | string
  }

  export type DoctorSpecialityUpdateWithoutSpecialityInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutSpecialitiesNestedInput
  }

  export type DoctorSpecialityUncheckedUpdateWithoutSpecialityInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorSpecialityUncheckedUpdateManyWithoutSpecialityInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorClinicCreateManyClinicInput = {
    doctorId: string
    createdAt?: Date | string
  }

  export type PricingCreateManyClinicInput = {
    id?: string
    doctorId: string
    title: string
    price: Decimal | DecimalJsLike | number | string
    currency?: string
    durationMinutes?: number
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentCreateManyClinicInput = {
    id?: string
    doctorId: string
    patientId: string
    pricingId?: string | null
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DoctorClinicUpdateWithoutClinicInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutClinicsNestedInput
  }

  export type DoctorClinicUncheckedUpdateWithoutClinicInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorClinicUncheckedUpdateManyWithoutClinicInput = {
    doctorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutPricingsNestedInput
    appointments?: AppointmentUpdateManyWithoutPricingNestedInput
  }

  export type PricingUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appointments?: AppointmentUncheckedUpdateManyWithoutPricingNestedInput
  }

  export type PricingUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    pricing?: PricingUpdateOneWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    pricingId?: NullableStringFieldUpdateOperationsInput | string | null
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentCreateManyPricingInput = {
    id?: string
    doctorId: string
    patientId: string
    clinicId: string
    datetime: Date | string
    durationMinutes?: number
    type?: $Enums.AppointmentType
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type AppointmentUpdateWithoutPricingInput = {
    id?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentsNestedInput
    patient?: PatientUpdateOneRequiredWithoutAppointmentsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPricingInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AppointmentUncheckedUpdateManyWithoutPricingInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMinutes?: IntFieldUpdateOperationsInput | number
    type?: EnumAppointmentTypeFieldUpdateOperationsInput | $Enums.AppointmentType
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}