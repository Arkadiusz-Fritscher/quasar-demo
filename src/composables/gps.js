import { useStore } from "src/stores/store";

const store = useStore();

export default function useGPS() {
  const getDistance = (lat1, lon1, lat2, lon2, unit = "K") => {
    //:::  Passed to function:                                                    :::
    //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
    //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
    //:::    unit = the unit you desire for results                               :::
    //:::           where: 'M' is statute miles (default)                         :::
    //:::                  'K' is kilometers                                      :::
    //:::                  'N' is nautical miles

    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    }
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  };

  const findNearbyObject = (imgExifData, buildings) => {
    const isBuilding = buildings.find((building) => {
      const { Latitude: imgLat, Longitude: imgLng } = imgExifData.gps;
      const { lat: buildingLat, lng: buildingLng } = building.gps;

      const distance = getDistance(imgLat, imgLng, buildingLat, buildingLng);
      return distance <= store.gpsRadius / 1000 ? true : false;
    });

    return isBuilding;
  };

  return { findNearbyObject };
}
