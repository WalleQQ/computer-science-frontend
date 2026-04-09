import { bench, describe } from "vitest";
import { TraverseMode } from "./types.ts";
import { PixelStreamFlatArray } from "./PixelStreamFlatArray.ts";
import { PixelStreamArrayOfArrays } from "./PixelStreamArrayOfArrays.ts";
import { PixelStreamArrayOfObjects } from "./PixelStreamArrayOfObjects.ts";
import { PixelStreamTypedArray } from "./PixelStreamTypedArray.ts";

const SIZES = [128, 512, 1920] as const;

const implementations = [
  { label: "flat-array", Class: PixelStreamFlatArray },
  { label: "array-of-arrays", Class: PixelStreamArrayOfArrays },
  { label: "array-of-objects", Class: PixelStreamArrayOfObjects },
  { label: "typed-array", Class: PixelStreamTypedArray },
];

for (const size of SIZES) {
  describe(`${size}×${size}`, () => {
    for (const { label, Class } of implementations) {
      const stream = new Class(size, size);

      bench(`${label} RowMajor`, () => {
        stream.forEach(TraverseMode.RowMajor, () => {});
      });

      bench(`${label} ColMajor`, () => {
        stream.forEach(TraverseMode.ColMajor, () => {});
      });
    }
  });
}
