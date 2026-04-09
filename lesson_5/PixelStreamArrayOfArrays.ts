import type { PixelStream, RGBA, TTraverseMode } from "./types.ts";
import { TraverseMode } from "./types.ts";

export class PixelStreamArrayOfArrays implements PixelStream {
  private width;
  private height;
  private array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.array = Array.from(
      new Array(width * height),
      () => [0, 0, 0, 0] as RGBA,
    );
  }

  getPixel(x: number, y: number): RGBA {
    const index = this.width * y + x;
    const result: RGBA = this.array[index];
    return result;
  }

  setPixel(x: number, y: number, rgba: RGBA): RGBA {
    const index = this.width * y + x;
    this.array[index] = rgba;

    return rgba;
  }

  forEach(
    mode: TTraverseMode,
    callback: (x: number, y: number, rgba: RGBA) => void,
  ): void {
    switch (mode) {
      case TraverseMode.RowMajor:
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const px = this.getPixel(x, y);
            callback(x, y, px);
          }
        }
        break;

      case TraverseMode.ColMajor:
        for (let x = 0; x < this.width; x++) {
          for (let y = 0; y < this.height; y++) {
            const px = this.getPixel(x, y);
            callback(x, y, px);
          }
        }
    }
  }
}
