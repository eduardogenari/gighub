type Image = {
  height: number;
  url: string;
  width: number;
};

export type Artist = {
  id: string;
  name: string;
  genres: string[];
  images: Image[];
  popularity: number;
};

export type Track = {
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  uri: string;
  album: {
    images: Image[];
  };
};
