const Color = {
  default: 'rgb(20, 20, 20)',
  grayscale: 'rgb(196, 196, 196)',
  sky: 'rgb(38, 197, 243)',
  blue: 'rgb(58, 95, 168)',
  base_white: 'rgb(238, 238, 238)',
  pure_white: 'rgb(255, 255, 255)',
  base_black: 'rgb(51, 51, 51)',
  gray_black: 'rgb(94, 94, 94)',
  alert: {
    default: '#333333',
    error: '#CB1742',
    warning: '#DC9918',
    info: '#1753CB',
    success: '#46CB17',
  },
}
export default Color

export const addAlpha = (color: string, alpha: number): string => {
  return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
}

export const TestNetColors = ['#3A81A8', '#0190E1', '#2AA5A8', '#01E12E']

export const MainNetColors = ['#A83A6F', '#E1016D', '#A83A94', '#E19A01']

export const UtilColors = [...MainNetColors, ...TestNetColors]
