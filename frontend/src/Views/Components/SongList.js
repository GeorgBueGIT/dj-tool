import React, {
  useEffect,
  useState,
  useRef,
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
  ({ addedSongsIdsArray, spotifyAccessToken, allowSort = true }, ref) => {
    const [items, setItems] = useState(null);

    const [itemsFeatures, setItemsFeatures] = useState([]);

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    useEffect(() => {
      const getTrackDetails = async () => {
        setItems(
          await getSeveralTrackDetailsById(
            addedSongsIdsArray,
            spotifyAccessToken
          )
        );
        setItemsFeatures(
          await getSeveralAudioFeatures(addedSongsIdsArray, spotifyAccessToken)
        );
      };
      getTrackDetails();
    }, [addedSongsIdsArray, spotifyAccessToken]);

    useEffect(() => {
      console.log("Items: " + JSON.stringify(items));
      console.log("Features: " + itemsFeatures);
      if (
        items &&
        itemsFeatures &&
        items.tracks &&
        itemsFeatures.audio_features
      ) {
        // Synchronize items and itemsFeatures by matching IDs
        const updatedItems = items.map((track) => {
          const audioFeature = itemsFeatures.find(
            (feat) => feat && feat.id === track.id
          );
          return { ...track, ...(audioFeature || {}) };
        });

        setItems(updatedItems);
      }
    }, [items, itemsFeatures]);

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
        {items ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={modifiers}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
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
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const updatedItems = arrayMove(items, oldIndex, newIndex);
        const updatedItemsFeatures = arrayMove(
          itemsFeatures,
          oldIndex,
          newIndex
        );

        setItems(updatedItems);
        setItemsFeatures(updatedItemsFeatures);
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
