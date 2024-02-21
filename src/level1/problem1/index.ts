export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  /**
   * insert your code here
   */
    if (value === null || typeof value !== 'object') {
      return value;
    }
  
    if (Array.isArray(value)) {
      return value.map(serialize);
    }
  
    const serializedObject: { [key: string]: unknown } = {};
  
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        serializedObject[key] = serialize(value[key]);
      }
    }
  
    return serializedObject;
  
}

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = unknown>(value: unknown): T {
  /**
   * insert your code here
   */
  if (value === null || typeof value !== 'object') {
    return value as T;
  }

  if (Array.isArray(value)) {
    return value.map(deserialize) as T;
  }

  const deserializedObject: { [key: string]: unknown } = {};

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      deserializedObject[key] = deserialize(value[key]);
    }
  }

  return deserializedObject as T;
  
}
