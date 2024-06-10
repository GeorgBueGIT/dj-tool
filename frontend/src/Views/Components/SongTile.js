import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons'

export default function Song(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="song my-3">
        <div className='song-wrapper container'>
          <div className='row'>
            <div className='col-4'>
              <iframe title='spotify-embed' src="https://open.spotify.com/embed/track/4dtw0PeTpfv8ISIWVKHesZ?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div className='col d-flex align-items-center'>
              <b> {props.title} </b>
            </div>
            <div className='col d-flex align-items-center'>
              <b> {props.artist} </b>
            </div>
            <div className='col d-flex align-items-center'>
              <b> {props.bpm}bpm </b>
            </div>
            <div className='col d-flex align-items-center'>
              <b> {props.songkey} </b>
            </div>
            <div className='col d-flex align-items-center'>
              <FontAwesomeIcon 
              icon={props.source === "spotify" ? faSpotify : faSoundcloud}
              style={{ height: "24px", color: props.source === "spotify" ? "#1DB954" : "#000000" }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}