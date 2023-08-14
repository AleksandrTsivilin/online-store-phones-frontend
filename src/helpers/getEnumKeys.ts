export function getEnumKeys<T extends object>(enumType: T): Array<
keyof typeof enumType
> {
  return Object.keys(enumType) as Array<keyof typeof enumType>;
}
