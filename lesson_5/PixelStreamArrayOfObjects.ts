import type { PixelStream, RGBA, TTraverseMode } from "./types.ts";
import { TraverseMode } from "./types.ts";

type RGBAObject = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export class PixelStreamArrayOfObjects implements PixelStream {
  private width: number;
  private height: number;
  private array: RGBAObject[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.array = Array.from(
      new Array(width * height),
      () =>
        ({
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        }) as RGBAObject,
    );
  }

  getPixel(x: number, y: number): RGBA {
    const index = this.width * y + x;
    const pixel = this.array[index];
    return [pixel.r, pixel.g, pixel.b, pixel.a];
  }

  setPixel(x: number, y: number, rgba: RGBA): RGBA {
    const index = this.width * y + x;

    this.array[index] = {
      r: rgba[0],
      g: rgba[1],
      b: rgba[2],
      a: rgba[3],
    };

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
