const Color = {
  default: 'rgb(20, 20, 20)',
  grayscale: 'rgb(196, 196, 196)',
  pink: 'rgb(180, 41, 249)',
  purple: 'rgb(78, 44, 112)',
  sky: 'rgb(38, 197, 243)',
}
export default Color

export const addAlpha = (color: string, alpha: number): string => {
  return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}
