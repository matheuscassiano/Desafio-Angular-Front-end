export function getLocation(): Promise<any> {
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