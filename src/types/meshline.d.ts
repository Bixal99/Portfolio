export {};

declare module "meshline" {
  export const MeshLineGeometry: unknown;
  export const MeshLineMaterial: unknown;
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        meshLineGeometry: Record<string, unknown>;
        meshLineMaterial: Record<string, unknown>;
      }
    }
  }
}
