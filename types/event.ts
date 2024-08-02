type Venue = {
  id: number;
  name: string | null;
  city: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
};

type PriceRange = {
  id: number;
  type: string | null;
  min: number | null;
  max: number | null;
  currency: string;
};

type Artist = {
  id: number;
  name: string;
};

type Image = {
  id: number;
  url: string;
  width: number;
  height: number;
};

export type Event = {
  id: number;
  name: string;
  artist: Artist[];
  venue: Venue[];
  genre: string[];
  priceRange: PriceRange[];
  startDate: Date;
  endDate: Date;
  image: Image[];
};
