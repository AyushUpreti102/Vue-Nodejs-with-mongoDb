export interface Movie {
  _id: string
  plot: string
  genres: string[]
  runtime: number
  cast: string[]
  title: string
  fullplot: string
  languages: string[]
  released: string
  directors: string[]
  writers: string[]
  awards: Awards
  lastupdated: string
  year: number
  imdb: Imdb
  countries: string[]
  type: string
  tomatoes: Tomatoes
  num_mflix_comments: number
}

export interface Awards {
  wins: number
  nominations: number
  text: string
}

export interface Imdb {
  rating: number
  votes: number
  id: number
}

export interface Tomatoes {
  viewer: Viewer
  production: string
  lastUpdated: string
}

export interface Viewer {
  rating: number
  numReviews: number
  meter: number
}
