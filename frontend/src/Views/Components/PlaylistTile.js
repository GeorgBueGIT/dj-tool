import React from "react";
import PlaylistCoverTest from "../../resources/Images/PlaylistCoverTest.jpeg";
import { Progress } from "antd";

export default function PlaylistTile() {
  return (
    <div className="playlist-tile m-3 p-3" id="playlist-tile">
      <div className="row h-100">
        <div className="col-3 mh-100 d-flex align-items-center">
          <img
            className="playlist-cover"
            src={PlaylistCoverTest}
            width={"100%"}
            alt="playlist-cover"
          />
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-9">
              <div className="playlist-headline-combo p-0">
                <h3 className="my-0 py-0"> Trap </h3>
                <p className="mb-1"> #Trap, #HipHop, #Dark </p>
              </div>
            </div>
            <div className="col-3">
              <b> @LoremIpsum </b>
            </div>
            <div className="col-12">
              <p> Trap Set (Featuring: Trippie Redd, Travis Scott, ...) </p>
            </div>
            <div className="playlist-stats col-12 d-flex justify-content-between align-items-end">
              <div className="fit-content pe-3 mb-0">
                <div className="custom-progress-outer mb-2">
                  <div className="custom-progress-inner" style={{ width: '60px', transform: 'translateX(100%)'}}></div>
                </div> 123 - 144 BPM
              </div>
              <div className="fit-content mb-0">
                {" "}
                <Progress steps={5} percent={87} size={[15, 25]} /> <br /> 87
                Energy{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
