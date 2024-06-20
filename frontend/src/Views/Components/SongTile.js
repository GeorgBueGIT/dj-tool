import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteOutlined } from "@ant-design/icons";

const camelotMajor = {
  0: "8B", // C major
  1: "3B", // C♯/D♭ major
  2: "10B", // D major
  3: "5B", // E♭ major
  4: "12B", // E major
  5: "7B", // F major
  6: "2B", // F♯ major
  7: "9B", // G major
  8: "4B", // A♭ major
  9: "11B", // A major
  10: "6B", // B♭ major
  11: "1B", // B major
};

const camelotMinor = {
  0: "5A", // C minor
  1: "12A", // C♯/D♭ minor
  2: "7A", // D minor
  3: "2A", // E♭ minor
  4: "9A", // E minor
  5: "4A", // F minor
  6: "11A", // F♯ minor
  7: "6A", // G minor
  8: "1A", // A♭ minor
  9: "8A", // A minor
  10: "3A", // B♭ minor
  11: "10A", // B minor
};

export default function Song(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderArtists = () => {
    if (!props.artists) {
      return null;
    }

    const artistNames = props.artists.map((artist) => artist.name).join(", ");
    return <b className="artists">{artistNames}</b>;
  };

  const getCamelotNotation = (key, mode) => {
    if (mode === 0) {
      return camelotMajor[key];
    } else if (mode === 1) {
      return camelotMinor[key];
    } else {
      return null; // Invalid mode
    }
  };

  const formatDuration = (duration) => {
    const totalSeconds = Math.floor(duration / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id="song-tile"
    >
      <div className="song m-2" id="song">
        <div className="song-wrapper py-0">
          <div className="row p-2">
            <div className="col-1 d-flex align-items-center">
              <img className="song-cover" src={props.cover} alt="Song Cover" />
            </div>
            <div className="col-7 d-flex align-items-start flex-column justify-content-center">
              <b> {props.title} </b>
              {renderArtists()}
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              <b className="darker"> {Math.floor(props.bpm)} bpm </b>
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              <b className="darker"> {getCamelotNotation(props.songkey, props.mode)} </b>
            </div>
            <div className="col d-flex align-items-center justify-content-end pe-3">
              <b className="darker"> {formatDuration(props.duration)} </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
