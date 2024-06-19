import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/ImageCropHelper";
import { CameraFilled } from "@ant-design/icons";
import "react-easy-crop/react-easy-crop.css"; // Import the CSS for Cropper

const ASPECT_RATIO = 1;

const ImageCrop = React.forwardRef((props, ref) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [croppedImageBlob, setCroppedImageBlob] = useState(null);
  const [showCropper, setShowCropper] = useState(true);

  const [uploadButtonHeight, setUploadButtonHeight] = useState(0);
  const uploadButtonRef = useRef(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      const croppedImageBlob = await fetch(croppedImage).then((res) =>
        res.blob()
      );
      console.log("done", { croppedImage });
      setImgSrc(croppedImage);
      setCroppedImageBlob(croppedImageBlob);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImgSrc(imageDataUrl);
      setShowCropper(true);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async () => {
    if (!croppedImageBlob) {
      console.error("No cropped image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", croppedImageBlob, "PlaylistCover.jpg");

    try {
      const response = await fetch("http://localhost:3001/uploadtest", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Upload successful", result);
      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (uploadButtonRef.current) {
      setUploadButtonHeight(uploadButtonRef.current.clientHeight);
    }
  }, [uploadButtonRef.current]);

  const handleClick = (event) => {
    if (event.target.className === "backgroundOverlay") {
      showCroppedImage();
    }
  };

  useImperativeHandle(ref, () => ({
    uploadImage: uploadImage
  }));


  return (
    <div id="image-crop" className="pe-2">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        id="fileInput"
        style={{ display: "none" }}
      />
      <label htmlFor="fileInput" className="h-100">
        <div
          className="add-playlist-thumbnail d-flex align-items-center justify-content-center"
          style={{
            // width: `${uploadButtonHeight}px`,
            backgroundImage: `url(${imgSrc})`,
            cursor: "pointer",
          }}
          ref={uploadButtonRef}
        >
          {!imgSrc && (
            <CameraFilled style={{ fontSize: "64px", color: "black" }} />
          )}
        </div>
      </label>

      <div className="container-relative w-100 h-100">
        {imgSrc && showCropper && (
          <div className="backgroundOverlay" onClick={handleClick}>
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={ASPECT_RATIO}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <button className="position-absolute" onClick={showCroppedImage}>
              Show Result
            </button>
          </div>
        )}
      </div>
      <button onClick={uploadImage}> Upload Cropped Image to Server! </button>
    </div>
  );
})

export default ImageCrop;
