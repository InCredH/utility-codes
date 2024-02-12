import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ER from "../assets/ER_Model.png";
import { useDebounceEffect } from "./UseDebounceEffect";
import { canvasPreview } from "./CanvasPreview";

const Crop = () => {
  const [crop, setCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [completedCrop, setCompletedCrop] = useState();

  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Image Cropper</h1>
      <div>
        <label>scale </label>
        <input
          type="number"
          value={scale}
          step={0.1}
          style={{ width: "100px", marginBottom: "10px" }}
          onChange={(e) => {
            setScale(e.target.value);
          }}
        ></input>
      </div>
      <div className="Cropper">
        <ReactCrop
          locked="true"
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img ref={imgRef} src={ER} style={{ transform: `scale(${scale})` }} />
        </ReactCrop>
      </div>
      <div
        className="buttons"
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
        }}
      >
        <button
          style={{ width: "200px" }}
          onClick={() =>
            setCrop({
              unit: "px", // Can be 'px' or '%'
              x: 0,
              y: 0,
              width: 350,
              height: 350,
              scale: scale,
            })
          }
        >
          Profile
        </button>
        <button
          style={{ width: "200px" }}
          onClick={() =>
            setCrop({
              unit: "%", // Can be 'px' or '%'
              x: 0,
              y: 0,
              width: 100,
              height: 50,
              scale: scale,
            })
          }
        >
          Landscape
        </button>
        <button
          style={{ width: "200px" }}
          onClick={() =>
            setCrop({
              unit: "%", // Can be 'px' or '%'
              x: 0,
              y: 0,
              width: 50,
              height: 100,
              scale: scale,
            })
          }
        >
          Potrait
        </button>
      </div>
      <div>
        <h2>Preview</h2>
        {completedCrop && (
          <>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Crop;
