import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { getTrackDetailsById } from "../../utils/Spotify/GetTrackDetailsById";
import { getAudioFeatures } from "../../utils/Spotify/GetAudioFeatures";
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
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

import Song from "./SongTile";

const SongList = forwardRef(({ addedSongsIdsArray, spotifyAccessToken }, ref) => {
  const [items, setItems] = useState([]);
  const [itemObj, setItemObj] = useState({});

  const [itemsFeatures, setItemsFeatures] = useState([]);
  const [itemsFeaturesObj, setItemsFeaturesObj] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const getTrackDetails = async () => {
      setItemObj(await getTrackDetailsById(addedSongsIdsArray, spotifyAccessToken));
      setItemsFeaturesObj(await getAudioFeatures(addedSongsIdsArray, spotifyAccessToken));
    };

    getTrackDetails();
  }, [addedSongsIdsArray, spotifyAccessToken]);

  useEffect(() => {
    if (itemObj.tracks && itemsFeaturesObj.audio_features) {
      // Synchronize items and itemsFeatures by matching IDs
      const updatedItems = itemObj.tracks.map((track) => {
        const audioFeature = itemsFeaturesObj.audio_features.find((feat) => feat && feat.id === track.id);
        return { ...track, ...(audioFeature || {}) };
      });

      setItems(updatedItems);
    }
  }, [itemObj, itemsFeaturesObj]);

  useEffect(() => {
    if (items.length > 0) {
      setItemsFeatures(items.map((song) => ({
        tempo: song.tempo,
        key: song.key,
        mode: song.mode,
        duration_ms: song.duration_ms,
        danceability: song.danceability,
        energy: song.energy,
      })));
    }
  }, [items]);

  useEffect(() => {
    console.log(itemsFeatures);
  }, [itemsFeatures]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const getCurrentSongIdsSorted = () => {
    if (!items) {
      console.error("Empty Set of Songs!");
      return;
    }
    return items.map((item) => item.id).join(", ");
  }
  
  useImperativeHandle(ref, () => ({
    getCurrentSongIdsSorted: getCurrentSongIdsSorted,
  }));

  return (
    <div className="song-list">
      {items && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {itemsFeatures &&
              items.map((song, index) => (
                <Song
                  key={song.id}
                  songIndex={index}
                  id={song.id}
                  cover={song.album.images[0].url}
                  source={song.external_urls.spotify}
                  title={song.name}
                  artists={song.artists}
                  bpm={itemsFeatures[index]?.tempo} // Optional chaining to avoid errors if itemsFeatures is not fully populated
                  songkey={itemsFeatures[index]?.key}
                  mode={itemsFeatures[index]?.mode}
                  duration={itemsFeatures[index]?.duration_ms}
                  danceability={itemsFeatures[index]?.danceability}
                  energy={itemsFeatures[index]?.energy}
                />
              ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id && over) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        const updatedItems = [...items];
        const [removedItem] = updatedItems.splice(activeIndex, 1);
        updatedItems.splice(overIndex, 0, removedItem);

        return updatedItems;
      });
    }
  }
});

export default SongList;
