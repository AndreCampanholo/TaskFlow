// Compiler shim to ensure `JSX` namespace is available during typechecking.
// Kept intentionally minimal to avoid clashing with proper React types.

declare namespace JSX {
  // Minimal Element alias so files using `JSX.Element` compile.
  type Element = any;

  interface IntrinsicAttributes {}
  interface IntrinsicClassAttributes<T> {}

  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
