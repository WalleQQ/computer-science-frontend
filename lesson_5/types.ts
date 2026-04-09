export type RGBA = [red: number, green: number, blue: number, alpha: number];

export const TraverseMode = {
  RowMajor: 0,
  ColMajor: 1,
} as const;
export type TTraverseMode = (typeof TraverseMode)[keyof typeof TraverseMode];

export interface PixelStream {
  getPixel(x: number, y: number): RGBA;
  setPixel(x: number, y: number, rgba: RGBA): RGBA;
  forEach(
    mode: TTraverseMode,
    callback: (x: number, y: number, rgba: RGBA) => void,
  ): void;
}
