export const SampleEnum = {
  enum: "enum",
  sampleEnum: "sampleEnum",
} as const;
export type SampleEnum = typeof SampleEnum[keyof typeof SampleEnum];