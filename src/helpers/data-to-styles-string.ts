export function dataToStylesString(d: any) {
  return Object.entries(d.properties.styles).map(([k, v]) => `${k}: ${v}`).join(';')
}