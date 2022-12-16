export interface IWeather {
    name: string;
    main: IWeatherMain
}

interface IWeatherMain {
    temp: number
}