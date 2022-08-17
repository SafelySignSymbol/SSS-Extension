const Color = {
  default: 'rgb(20, 20, 20)',
  grayscale: 'rgb(196, 196, 196)',
  pink: 'rgb(180, 41, 249)',
  purple: 'rgb(78, 44, 112)',
  sky: 'rgb(38, 197, 243)',
  blue: 'rgb(58, 95, 168)',
  base_white: 'rgb(238, 238, 238)',
  base_black: 'rgb(51, 51, 51)',
  gray_black: 'rgb(94, 94, 94)',
  pure_white: 'rgb(255, 255, 255)',
}
export default Color

export const addAlpha = (color: string, alpha: number): string => {
  return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}

export const TestNetColors = ['#A5DEE4', '#0F4C3A', '#1E88A8']

export const MainNetColors = ['#F596AA', '#E16B8C', '#9E7A7A']
