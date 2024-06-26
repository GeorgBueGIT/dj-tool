import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteFilled, PlusCircleFilled, WarningOutlined } from "@ant-design/icons";

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

const camelotColors = {
  "1B": "hsl(0, 100%, 50%)", // Red
  "1A": "hsl(0, 100%, 60%)", // Lighter Red for minor
  "2B": "hsl(30, 100%, 50%)", // Orange
  "2A": "hsl(30, 100%, 60%)", // Lighter Orange for minor
  "3B": "hsl(60, 100%, 50%)", // Yellow
  "3A": "hsl(60, 100%, 60%)", // Lighter Yellow for minor
  "4B": "hsl(90, 100%, 50%)", // Lime
  "4A": "hsl(90, 100%, 60%)", // Lighter Lime for minor
  "5B": "hsl(120, 100%, 50%)", // Green
  "5A": "hsl(120, 100%, 60%)", // Lighter Green for minor
  "6B": "hsl(150, 100%, 50%)", // Spring Green
  "6A": "hsl(150, 100%, 60%)", // Lighter Spring Green for minor
  "7B": "hsl(180, 100%, 50%)", // Cyan
  "7A": "hsl(180, 100%, 60%)", // Lighter Cyan for minor
  "8B": "hsl(210, 100%, 50%)", // Sky Blue
  "8A": "hsl(210, 100%, 60%)", // Lighter Sky Blue for minor
  "9B": "hsl(240, 100%, 50%)", // Blue
  "9A": "hsl(240, 100%, 60%)", // Lighter Blue for minor
  "10B": "hsl(270, 100%, 50%)", // Violet
  "10A": "hsl(270, 100%, 60%)", // Lighter Violet for minor
  "11B": "hsl(300, 100%, 50%)", // Magenta
  "11A": "hsl(300, 100%, 60%)", // Lighter Magenta for minor
  "12B": "hsl(330, 100%, 50%)", // Pink
  "12A": "hsl(330, 100%, 60%)", // Lighter Pink for minor
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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const onAddRecommendation = () => {
    props.addRecommendation(props.id);
    props.removeRecommendation(props.id);
  };

  const getCamelotColor = (key, mode) => {
    const notation = getCamelotNotation(key, mode);
    return camelotColors[notation] || "#000000"; // Default to black if not found
  };

  const camelotColor = getCamelotColor(props.songkey, props.mode);

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
          <div className="row p-2 align-items-center">
            <div className="col-1 d-flex align-items-center">
              <img className="song-cover" src={props.cover} alt="Song Cover" />
            </div>
            <div className="col-7 d-flex align-items-start flex-column justify-content-center">
              <b> {props.title} </b>
              {renderArtists()}
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              {props.bpm ? (
                <b className="darker"> {Math.floor(props.bpm)} bpm </b>
              ) : (
                <b className="darker"> <WarningOutlined /> </b>
              )}
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              {props.songkey & props.mode ? (
                <b className="darker" style={{ color: camelotColor }}>
                  {" "}
                  {getCamelotNotation(props.songkey, props.mode)}{" "}
                </b>
              ) : (
                <b className="darker"> <WarningOutlined /> </b>
              )}
            </div>
            <div className="col d-flex align-items-center justify-content-end pe-3">
              <b className="darker"> {formatDuration(props.duration)} </b>
            </div>
            {props.allowRemove && props.allowRemove === true && (
              <div
                className="d-flex align-items-center justify-content-end mx-3 p-2 operational-button-song"
                onClick={() => props.removeSong(props.id)}
              >
                <DeleteFilled />
              </div>
            )}
            {props.addRecommendation && props.removeRecommendation && (
              <div
                className="d-flex align-items-center justify-content-end mx-3 p-2 operational-button-song"
                onClick={() => onAddRecommendation()}
              >
                <PlusCircleFilled />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
