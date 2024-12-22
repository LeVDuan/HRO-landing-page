// lunar-javascript.d.ts
declare module 'lunar-javascript' {
  class Lunar {
    static fromDate(date: Date): Lunar
    getTetDate(): {
      getFullYear(): number
      getMonth(): number
      getDate(): number
    }
  }

  export = Lunar
}
