import { getSeveralTrackDetailsById } from "./Spotify/GetSeveralTrackDetailsById";
import { getSeveralAudioFeatures } from "./Spotify/GetSeveralAudioFeatures";

const camelotWheel = {
  "1A": ["12A", "2A", "1B", "1A"],
  "2A": ["1A", "3A", "2B", "2A"],
  "3A": ["2A", "4A", "3B", "3A"],
  "4A": ["3A", "5A", "4B", "4A"],
  "5A": ["4A", "6A", "5B", "5A"],
  "6A": ["5A", "7A", "6B", "6A"],
  "7A": ["6A", "8A", "7B", "7A"],
  "8A": ["7A", "9A", "8B", "8A"],
  "9A": ["8A", "10A", "9B", "9A"],
  "10A": ["9A", "11A", "10B", "10A"],
  "11A": ["10A", "12A", "11B", "11A"],
  "12A": ["11A", "1A", "12B", "12A"],
  "1B": ["12B", "2B", "1A", "1B"],
  "2B": ["1B", "3B", "2A", "2B"],
  "3B": ["2B", "4B", "3A", "3B"],
  "4B": ["3B", "5B", "4A", "4B"],
  "5B": ["4B", "6B", "5A", "5B"],
  "6B": ["5B", "7B", "6A", "6B"],
  "7B": ["6B", "8B", "7A", "7B"],
  "8B": ["7B", "9B", "8A", "8B"],
  "9B": ["8B", "10B", "9A", "9B"],
  "10B": ["9B", "11B", "10A", "10B"],
  "11B": ["10B", "12B", "11A", "11B"],
  "12B": ["11B", "1B", "12A", "12B"],
};

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

const getCamelotNotation = (key, mode) => {
  if (mode === 0) {
    return camelotMajor[key];
  } else if (mode === 1) {
    return camelotMinor[key];
  } else {
    return null;
  }
};

const getIndexOf = (songArr, checkForSong) => {
  for (let i = 0; i < songArr.length - 1; i++) {
    if (songArr[i].id === checkForSong.id) {
      return i;
    }
  }
};

let BPMTRESHOLD;
const bpmInRange = (bpm1, bpm2) => {
  if (bpm1 >= bpm2) {
    return bpm2 + BPMTRESHOLD >= bpm1;
  } else {
    return bpm2 - BPMTRESHOLD <= bpm1;
  }
};

const bpmDifference = (bpm, bpmCompare) => {
  return Math.abs(bpm - bpmCompare);
};

export const autoSort = async (songIds, spotifyAccessToken, maxJump = 5) => {
  BPMTRESHOLD = maxJump;

  try {
    // Fetch track details and audio features
    const trackDetails = await getSeveralTrackDetailsById(
      songIds,
      spotifyAccessToken
    );
    const audioFeatures = await getSeveralAudioFeatures(
      songIds,
      spotifyAccessToken
    );

    let combinedSongs;

    try {
      combinedSongs = trackDetails.map((track) => {
        const details = audioFeatures.find(
          (feature) => feature.id === track.id
        );
        return { ...track, ...details };
      });
    } catch (err) {
      console.error("ERROR FETCHING AUDIO FEATURES!");
      return songIds;
    }

    combinedSongs.sort((a, b) => Math.floor(a.tempo) - Math.floor(b.tempo));

    for (let i = 0; i < combinedSongs.length - 1; i++) {
      const currentSong = combinedSongs[i];
      const currentSongKey = combinedSongs[i].key;
      const currentSongMode = combinedSongs[i].mode;
      const currentSongCamelot = getCamelotNotation(
        currentSongKey,
        currentSongMode
      );
      const currentSongBpm = Math.floor(currentSong.tempo);

      const matchingSongs = [];

      for (let j = i + 1; j < combinedSongs.length - 1; j++) {
        const comparisonSongBpm = Math.floor(combinedSongs[j].tempo);
        const comparisonSongkey = combinedSongs[j].key;
        const comparisonSongMode = combinedSongs[j].mode;
        const comparisonSongCamelot = getCamelotNotation(
          comparisonSongkey,
          comparisonSongMode
        );

        if (
          camelotWheel[currentSongCamelot].includes(comparisonSongCamelot) &&
          bpmInRange(currentSongBpm, comparisonSongBpm)
        ) {
          matchingSongs.push(combinedSongs[j]);
        }
      }

      if (i < combinedSongs.length - 1 && matchingSongs.length !== 0) {
        if (matchingSongs.length === 1) {
          const saveValue = combinedSongs[i + 1];
          const indexOfMatch = getIndexOf(combinedSongs, matchingSongs[0]);
          combinedSongs[i + 1] = matchingSongs[0];
          combinedSongs[indexOfMatch] = saveValue;
        } else {
          matchingSongs.sort(
            (a, b) =>
              bpmDifference(Math.floor(a.tempo), currentSongBpm) -
              bpmDifference(Math.floor(b.tempo), currentSongBpm)
          );

          let foundMatchingSong = false;
          matchingSongs.forEach((song) => {
            if (
              getCamelotNotation(song.key, song.mode) === currentSongCamelot
            ) {
              const saveValue = combinedSongs[i + 1];
              const indexOfMatch = getIndexOf(combinedSongs, song);
              combinedSongs[i + 1] = song;
              combinedSongs[indexOfMatch] = saveValue;
              foundMatchingSong = true;
            }
          });
          if (!foundMatchingSong) {
            const saveValue = combinedSongs[i + 1];
            const indexOfMatch = getIndexOf(combinedSongs, matchingSongs[0]);
            combinedSongs[i + 1] = matchingSongs[0];
            combinedSongs[indexOfMatch] = saveValue;
          }
        }
      }
    }

    return combinedSongs.map((song) => song.id);
  } catch (error) {
    console.error("Error in autoSort:", error);
    throw error;
  }
};

export default autoSort;
