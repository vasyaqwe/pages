export * as v from "valibot"
import type { ValidatorAdapter } from "@tanstack/react-router"
import { parse } from "valibot"
import type { GenericSchema, InferInput, InferOutput } from "valibot"

export type ValibotValidatorAdapter<TOptions extends GenericSchema> =
   ValidatorAdapter<InferInput<TOptions>, InferOutput<TOptions>>

export const validator = <TOptions extends GenericSchema>(
   options: TOptions,
): ValibotValidatorAdapter<TOptions> => {
   return {
      types: {
         input: null,
         output: null,
      },
      parse: (input) => parse(options, input),
   }
}
