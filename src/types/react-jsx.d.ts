// This file may not be included by tsconfig's "include" because it's a .d.ts.
// Keep it as a declaration file for editors, but also add a `.ts` shim
// so the compiler picks up the global `JSX` namespace when needed.

import type React from "react";

declare global {
  namespace JSX {
    type Element = React.ReactElement;
    interface IntrinsicAttributes extends React.Attributes {}
    interface IntrinsicClassAttributes<T> {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
