export function getBounds(
  selectedLocation: string,
  locations: {
    id: number;
    city: string;
    country: string;
    boundingBox: number[];
  }[]
) {
  let bounds;
  if (selectedLocation.includes(",")) {
    bounds = locations
      .filter(
        (dbLocation) =>
          dbLocation.city == selectedLocation.split(",")[0].trim() &&
          dbLocation.country == selectedLocation.split(",")[1].trim()
      )
      .map((dbLocation) => dbLocation.boundingBox)[0];
  } else {
    let allBounds = locations
      .filter(
        (dbLocation) => dbLocation.country == selectedLocation.replace("- ", "")
      )
      .map((dbLocation) => dbLocation.boundingBox);
    const west = Math.min(...allBounds.map((bounds) => bounds[0]));
    const east = Math.max(...allBounds.map((bounds) => bounds[1]));
    const south = Math.min(...allBounds.map((bounds) => bounds[2]));
    const north = Math.max(...allBounds.map((bounds) => bounds[3]));
    bounds = [west, east, south, north];
  }
  return bounds;
}
