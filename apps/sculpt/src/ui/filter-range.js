import { clamp } from "../model.js";

export function constrainCutoff(params, id, value) {
  return id === "cutoffLow" ? clamp(value, 20, params.cutoff) : clamp(value, params.cutoffLow ?? 20, 18000);
}
