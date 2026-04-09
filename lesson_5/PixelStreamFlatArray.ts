import type { PixelStream, RGBA, TTraverseMode } from "./types.ts";
import { TraverseMode } from "./types.ts";

export class PixelStreamFlatArray implements PixelStream {
  private width: number;
  private height: number;
  private array: number[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.array = Array(width * height * 4).fill(0);
  }

  getPixel(x: number, y: number): RGBA {
    const index = (this.width * y + x) * 4;
    const result: RGBA = [
      this.array[index],
      this.array[index + 1],
      this.array[index + 2],
      this.array[index + 3],
    ];
    return result;
  }

  setPixel(x: number, y: number, rgba: RGBA): RGBA {
    const index = (this.width * y + x) * 4;
    for (let i = 0; i < rgba.length; i++) {
      this.array[index + i] = rgba[i];
    }

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
