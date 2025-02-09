/**
 * Helper type to support {@link https://en.wikipedia.org/wiki/Nominal_type_system | nominal types} in typescript
 *
 * @see type {@link Nominal}
 */
export interface Tagged<N extends string> {
  __typename?: N
}
