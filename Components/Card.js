import { useRef, useState, useEffect } from "react";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { Button } from "react-bootstrap";

function Card({ name, message, publicId, textColor }) {
  const ref = useRef(null);
  const [url, setURL] = useState("");
  const [copy, setCopy] = useState("Copy");

  useEffect(() => {
    setURL(ref.current.element.current.src);
    return () => {};
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => setCopy("Copied!"))
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  return (
    <div>
      <CloudinaryContext cloudName="Kizmelvin">
        <Image
          publicId={publicId}
          ref={ref}
          crop="scale"
          width="700"
          height="700"
        >
          <Transformation crop="fit" effect="blur:10" />
          <Transformation effect="brightness_hsb:-10" />
          <Transformation
            color={textColor}
            overlay={{
              background: "",
              fontFamily: "Neucha",
              fontSize: 100,
              fontWeight: "bold",
              width: 500,
              text: message,
              textAlign: "center",
            }}
            width="1300"
            crop="fit"
          />
          <Transformation flags="layer_apply" y="-200" />
          <Transformation
            color={textColor}
            overlay={{
              fontFamily: "Dancing Script",
              fontSize: 100,
              fontWeight: "bold",
              text: `from ${name}`,
            }}
          />
          <Transformation
            flags="layer_apply"
            gravity="center"
            x="550"
            y="750"
          />
        </Image>
      </CloudinaryContext>

      {/* Copyable link */}

      <label className="mt-2 p-2 fs-3"> Card Link</label>
      <div class="input-group mb-3 mt-1">
        <input
          type="text"
          className="form-control"
          value={url}
          aria-describedby="url-input"
          disabled
        />
        <div className="input-group-append">
          <Button
            onClick={handleCopy}
            className="input-group-text btn-success"
            id="url-input"
          >
            {copy}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Card;
