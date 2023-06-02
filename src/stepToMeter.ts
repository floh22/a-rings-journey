export function stepToMeter(step: number) {
  return step * 0.762;
}

export function meterToStep(meter: number) {
    return Math.ceil(meter / 0.762);
}