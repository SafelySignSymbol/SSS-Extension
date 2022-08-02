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
}
export default Color

export const addAlpha = (color: string, alpha: number): string => {
  return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}

export const TestNetColors = [
  '#A5DEE4',
  '#0F4C3A',
  '#1E88A8',
  '#113285',
  '#66327C',
  '#533D5B',
  '#72636E',
  '#BEC23F',
  '#C7802D',
  '#CB1B45',
]

export const MainNetColors = [
  '#F596AA',
  '#E16B8C',
  '#9E7A7A',
  '#F17C67',
  '#A35E47',
  '#994639',
  '#E83015',
  '#FC9F4D',
  '#FFB11B',
  '#33A6B8',
]
