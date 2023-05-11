export interface AirportIataInformation {
  icao: string;
  iata: string;
  shortName: string;
  fullName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  elevation: {
    meter: number;
    km: number;
    mile: number;
    nm: number;
    feet: number;
  };
  country: {
    code: string;
    name: string;
  };
  continent: {
    code: string;
    name: string;
  };
  timeZone: string;
  urls: {
    webSite: string;
    wikipedia: string;
    twitter: string;
    googleMaps: string;
    liveAtc: string;
    flightRadar: string;
  };
}
