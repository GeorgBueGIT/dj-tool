import React, {useState} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import Song from './Song';

function SongList() {
  const [items, setItems] = useState([
    {id: 1, source: "spotify", title: "As we are", artist: "Gorge", bpm: 130, songkey: "GMaj" },
    {id: 2, source: "spotify", title: "Never Thought", artist: "Ehsfls", bpm: 128, songkey: "EMaj" },
    {id: 3, source: "soundcloud", title: "Teenage Crime", artist: "Bübler", bpm: 140, songkey: "Em" },
    {id: 4, source: "spotify", title: "As we are", artist: "Gorge", bpm: 130, songkey: "GMaj" },
    {id: 5, source: "spotify", title: "Never Thought", artist: "Ehsfls", bpm: 128, songkey: "EMaj" },
    {id: 6, source: "soundcloud", title: "Teenage Crime", artist: "Bübler", bpm: 140, songkey: "Em" },
    {id: 7, source: "spotify", title: "As we are", artist: "Gorge", bpm: 130, songkey: "GMaj" },
    {id: 8, source: "spotify", title: "Never Thought", artist: "Ehsfls", bpm: 128, songkey: "EMaj" },
    {id: 9, source: "soundcloud", title: "Teenage Crime", artist: "Bübler", bpm: 140, songkey: "Em" }
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div className="song-list container py-3 my-3 px-5">
      <div className='list-header row'>
        <div className='col-6'>
          <h2 className=''> Deep House / Chill </h2>
        </div>
        <div className='col-6 d-flex justify-content-end'>
          <a> back </a>
        </div>
        <div className='col'>
          <h4 className='mb-5'> 128 - 140 bpm </h4>
        </div>
      </div>

    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
          {items.map(song => (
            <Song
              key= {song.id}
              id={song.id}
              source={song.source}
              title={song.title}
              artist={song.artist}
              bpm={song.bpm}
              songkey={song.songkey}
            />
          ))}
      </SortableContext>
    </DndContext>
    </div>
  );
  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id && over) {
        setItems((items) => {
            const activeIndex = items.findIndex(item => item.id === active.id);
            const overIndex = items.findIndex(item => item.id === over.id);

            const updatedItems = [...items];
            const [removedItem] = updatedItems.splice(activeIndex, 1);
            updatedItems.splice(overIndex, 0, removedItem);

            return updatedItems;
        });
    }
}
}

export default SongList;