export interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    };
}

// types.ts

export interface Observation {
    stationID: string;
    obsTimeUtc: string;
    obsTimeLocal: string;
    neighborhood: string;
    softwareType: string | null;
    country: string;
    solarRadiation: number;
    lon: number;
    realtimeFrequency: number | null;
    epoch: number;
    lat: number;
    uv: number;
    winddir: number;
    humidity: number;
    qcStatus: number;
    metric: {
      temp: number;
      heatIndex: number;
      dewpt: number;
      windChill: number;
      windSpeed: number;
      windGust: number;
      pressure: number;
      precipRate: number;
      precipTotal: number;
      elev: number;
    };
}

export interface WeatherData {
    observations: Observation[];
}

export interface ForecastData {
    calendarDayTemperatureMax: number[];
    calendarDayTemperatureMin: number[];
    dayOfWeek: string[];
    expirationTimeUtc: number[];
    moonPhase: string[];
    moonPhaseCode: string[];
    moonPhaseDay: number[];
    moonriseTimeLocal: string[];
    moonriseTimeUtc: number[];
    moonsetTimeLocal: string[];
    moonsetTimeUtc: number[];
    narrative: string[];
    qpf: number[];
    qpfSnow: number[];
    sunriseTimeLocal: string[];
    sunriseTimeUtc: number[];
    sunsetTimeLocal: string[];
    sunsetTimeUtc: number[];
    temperatureMax: number[];
    temperatureMin: number[];
    validTimeLocal: string[];
    validTimeUtc: number[];
    daypart: Daypart[];
}

export interface Daypart {
    cloudCover: number[];
    dayOrNight: string[];
    daypartName: string[];
    iconCode: number[];
    iconCodeExtend: number[];
    narrative: string[];
    precipChance: number[];
    precipType: string[];
    qpf: number[];
    qpfSnow: number[];
    qualifierCode: (string | null)[];
    qualifierPhrase: (string | null)[];
    relativeHumidity: number[];
    snowRange: string[];
    temperature: number[];
    temperatureHeatIndex: number[];
    temperatureWindChill: number[];
    thunderCategory: (string | null)[];
    thunderIndex: number[];
    uvDescription: string[];
    uvIndex: number[];
    windDirection: number[];
    windDirectionCardinal: string[];
    windPhrase: string[];
    windSpeed: number[];
    wxPhraseLong: string[];
    wxPhraseShort: string[];
}