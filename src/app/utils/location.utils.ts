import { ILocation } from "../interfaces/location.interface";

export function getLocation(): Promise<ILocation> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resp => {
            resolve({
                lon: resp.coords.longitude,
                lat: resp.coords.latitude
            });
        },
            err => reject(err));
    });

}