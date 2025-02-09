import type { Tagged } from "./Tagged"

/**
 * Type to support {@link https://en.wikipedia.org/wiki/Nominal_type_system | nominal types} in typescript
 *
 * @example
 * ```ts
 * type EmailAddress = Nominal<string, "EmailAddress">
 * type Iban = Nominal<string, "Iban">
 *
 * const email: EmailAddress = "test@example.com"
 * const iban: Iban = "DE97100500006453271872"
 *
 * // error: Type 'Iban' is not assignable to type 'EmailAddress'.
 * const email2: EmailAddress = iban
 * ```
 */
export type Nominal<T, N extends string> = T & Tagged<N>
