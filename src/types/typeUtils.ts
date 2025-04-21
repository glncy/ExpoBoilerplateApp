import { useRouter } from "expo-router";

export type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type ExpoRouterPaths = Parameters<ReturnType<typeof useRouter>["push"]>[0];