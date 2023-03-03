export const MODE_INVALID = ""
export const MODE_IMAGE = 1
export const MODE_VIDEO = 2
export const MODE_LIVESTREAM = 3
export const DEFAULT_SHADOW =
  "0 100px 80px rgb(0 0 0 / 7%), 0 41.7776px 33.4221px rgb(0 0 0 / 5%), 0 22.3363px 17.869px rgb(0 0 0 / 4%), 0 12.5216px 10.0172px rgb(0 0 0 / 4%), 0 6.6501px 5.32008px rgb(0 0 0 / 3%), 0 2.76726px 2.21381px rgb(0 0 0 / 2%)"

export const API_URL = "http://localhost:5000"
export const GITHUB_URL = "https://github.com/k27dong/fydp"

export const EMOTION_MAP = [
  "Anger",
  "Contempt",
  "Disgust",
  "Fear",
  "Happiness",
  "Neutral",
  "Sadness",
  "Surprise",
]

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}
