import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {Spin} from "antd";
import { getSeveralTrackDetailsById } from "../../utils/Spotify/GetSeveralTrackDetailsById";
import { getSeveralAudioFeatures } from "../../utils/Spotify/GetSeveralAudioFeatures";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

import Song from "./SongTile";

const SongList = forwardRef(
  ({ addedSongsIdsArray, spotifyAccessToken, allowSort = true, allowRemove = true, removeSong}, ref) => {
    const [songObjArray, setSongObjArray] = useState([]);

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 5,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    useEffect(() => {
      const getTracksWithDetails = async () => {
        const trackDetails = await getSeveralTrackDetailsById(
          addedSongsIdsArray,
          spotifyAccessToken
        );
        const audioFeatures = await getSeveralAudioFeatures(
          addedSongsIdsArray,
          spotifyAccessToken
        );
        // Combine the arrays by matching the song IDs
        setSongObjArray(trackDetails.map((track) => {
          const details = audioFeatures?.find((feature) => feature.id === track.id);
          return { ...track, ...details };
        }));
    
      };
      getTracksWithDetails();
    }, [addedSongsIdsArray, spotifyAccessToken]);

    const getCurrentSongIdsSorted = () => {
      if (!songObjArray) {
        console.error("Empty Set of Songs!");
        return;
      }
      return songObjArray.map((item) => item.id).join(", ");
    };

    useImperativeHandle(ref, () => ({
      getCurrentSongIdsSorted: getCurrentSongIdsSorted,
    }));

    let modifiers = [restrictToVerticalAxis, restrictToParentElement];

    if (!allowSort) {
      modifiers.push(restrictToHorizontalAxis);
    }

    return (
      <div className="song-list mb-3">
        {songObjArray ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={modifiers}
          >
            <SortableContext
              items={songObjArray}
              strategy={verticalListSortingStrategy}
            >
              {songObjArray &&
                songObjArray.map((song, index) => (
                  <Song
                    key={song.id}
                    songIndex={index}
                    id={song.id}
                    cover={song.album.images[0].url}
                    source={song.external_urls.spotify}
                    title={song.name}
                    artists={song.artists}
                    bpm={song.tempo}
                    songkey={song.key}
                    mode={song.mode}
                    duration={song.duration_ms}
                    danceability={song.danceability}
                    energy={song.energy}
                    allowRemove={allowRemove}
                    removeSong={removeSong}
                  />
                ))}
            </SortableContext>
          </DndContext>
        ) : (
        <div data-testid="app-spinner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </div>
        )}
      </div>
    );
    function handleDragEnd(event) {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = songObjArray.findIndex((item) => item.id === active.id);
        const newIndex = songObjArray.findIndex((item) => item.id === over.id);

        const updatedItems = arrayMove(songObjArray, oldIndex, newIndex);

        setSongObjArray(updatedItems);
      }
    }
    function arrayMove(array, fromIndex, toIndex) {
      const element = array[fromIndex];
      const newArray = array.slice();
      newArray.splice(fromIndex, 1);
      newArray.splice(toIndex, 0, element);
      return newArray;
    }
  }
);

export default SongList;
