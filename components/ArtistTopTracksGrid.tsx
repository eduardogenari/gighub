"use client";

import type { Event } from "@/types/event";
import ArtistTopTracks from "@/components/ArtistTopTracks";
import Spinner from "./Spinner";
import { useState } from "react";

export default function ArtistTopTracksGrid({ event }: { event: Event }) {
  let initialIsSelected = new Array(event.artist.length).fill(false);
  initialIsSelected[0] = true;
  const [isSelected, setSelected] = useState(initialIsSelected);

  return (
    <>
      {event.artist.length > 0 ? (
        <div className="w-[75vw] mt-4">
          <h3 className="flex justify-center">Top Tracks</h3>
          <div className="flex justify-center items-center mb-6">
            {event.artist.map((artist, index) => (
              <div
                onClick={() => {
                  const selectedArray = new Array(event.artist.length).fill(
                    false
                  );
                  selectedArray[index] = true;
                  setSelected(selectedArray);
                }}
                key={index}
                className={
                  (isSelected[index] === true
                    ? "text-destructive font-semibold "
                    : "text-slate-500 ") +
                  "hover:cursor-pointer hover:text-destructive flex justify-center items-center"
                }
              >
                <div
                  className={
                    (isSelected[index] === true
                      ? "border-solid border-destructive border-[1px] "
                      : "") + "rounded-full w-12 h-12 bg-gray-200 m-2"
                  }
                ></div>
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
          {event.artist.map((artist, index) =>
            isSelected[index] === true ? (
              <ArtistTopTracks key={artist.id} artistName={artist.name} />
            ) : null
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
      )}
    </>
  );
}
