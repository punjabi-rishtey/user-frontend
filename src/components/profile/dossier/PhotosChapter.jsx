import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiUrl } from "@/config/constants";
import { authFetch, isSessionExpiryError } from "@/config/authClient";
import {
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
  authTextButtonClassName,
} from "@/components/ui/formStyles";
import { cn } from "@/lib/utils";
import SectionGroup, { SectionStack } from "../studio/SectionGroup";

const API_URL = apiUrl("/api/users");
const CROP_WIDTH = 280;
const CROP_HEIGHT = 370;
const MAX_PHOTOS = 10;

const normalizeProfilePhotoUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("//")) return `https:${url}`;
  return url;
};

export default function PhotosChapter({ onStatus }) {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [images, setImages] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [operation, setOperation] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(0.1);
  const [translatePosition, setTranslatePosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);

  useEffect(() => {
    if (user?._id && isAuthenticated) {
      fetchImages();
    }
  }, [user?._id, isAuthenticated]);

  useEffect(() => {
    return () => {
      if (originalImage?.startsWith("blob:")) {
        URL.revokeObjectURL(originalImage);
      }
    };
  }, [originalImage]);

  useEffect(() => {
    updatePreview();
  }, [scale, translatePosition, originalImage]);

  useEffect(() => {
    if (!showCropper) return;

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;
      setTranslatePosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startPosition, showCropper]);

  const updatePreview = () => {
    if (!previewCanvasRef.current || !imageRef.current || !originalImage) return;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(CROP_WIDTH / 2, CROP_HEIGHT / 2);
    ctx.scale(scale, scale);
    ctx.translate(translatePosition.x / scale, translatePosition.y / scale);
    ctx.translate(-imageRef.current.width / 2, -imageRef.current.height / 2);
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.restore();
  };

  const fetchImages = async () => {
    if (!user?._id) return;
    try {
      const response = await authFetch(`${API_URL}/${user._id}`);
      if (!response.ok) throw new Error("Failed to fetch profile images");
      const data = await response.json();
      if (data.profile_pictures) {
        setImages(data.profile_pictures.map(normalizeProfilePhotoUrl));
      }
      setProfilePicture(
        normalizeProfilePhotoUrl(
          data.profile_picture || data.profile_pictures?.[0] || ""
        )
      );
    } catch (error) {
      if (isSessionExpiryError(error)) return;
      console.error("Error fetching profile images:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !user?._id) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      onStatus?.({
        type: "error",
        message: "Only JPG or PNG files are allowed.",
      });
      return;
    }
    if (images.length >= MAX_PHOTOS) {
      onStatus?.({
        type: "error",
        message: `You can add up to ${MAX_PHOTOS} photos.`,
      });
      return;
    }
    setOriginalFile(file);
    setOriginalImage(URL.createObjectURL(file));
    setTranslatePosition({ x: 0, y: 0 });
    setShowCropper(true);
  };

  const handleCancelCrop = () => {
    if (originalImage?.startsWith("blob:")) URL.revokeObjectURL(originalImage);
    setShowCropper(false);
    setOriginalImage(null);
    setOriginalFile(null);
    setScale(1);
    setMinScale(0.1);
    setTranslatePosition({ x: 0, y: 0 });
  };

  const getCroppedImageBlob = () =>
    new Promise((resolve, reject) => {
      try {
        if (!imageRef.current || !originalImage) {
          reject(new Error("Image not loaded"));
          return;
        }
        const canvas = document.createElement("canvas");
        canvas.width = CROP_WIDTH;
        canvas.height = CROP_HEIGHT;
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(CROP_WIDTH / 2, CROP_HEIGHT / 2);
        ctx.scale(scale, scale);
        ctx.translate(translatePosition.x / scale, translatePosition.y / scale);
        ctx.translate(-imageRef.current.width / 2, -imageRef.current.height / 2);
        ctx.drawImage(imageRef.current, 0, 0);
        ctx.restore();
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Failed to crop"))),
          "image/jpeg",
          0.95
        );
      } catch (error) {
        reject(error);
      }
    });

  const uploadCroppedImage = async () => {
    if (!originalFile || !user?._id) return;
    setIsSaving(true);
    setOperation("uploading");
    try {
      const croppedImageBlob = await getCroppedImageBlob();
      const croppedFile = new File([croppedImageBlob], originalFile.name, {
        type: originalFile.type,
      });
      const formData = new FormData();
      formData.append("profile_pictures", croppedFile);
      const response = await authFetch(`${API_URL}/${user._id}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upload profile image");
      }
      if (data.profile_pictures) {
        setImages(data.profile_pictures.map(normalizeProfilePhotoUrl));
        setProfilePicture(
          normalizeProfilePhotoUrl(
            data.profile_picture || data.profile_pictures[0] || ""
          )
        );
        await refreshUser();
        onStatus?.({ type: "success", message: "Photo added." });
      }
      handleCancelCrop();
    } catch (error) {
      if (isSessionExpiryError(error)) return;
      onStatus?.({
        type: "error",
        message: error.message || "Could not upload photo.",
      });
    } finally {
      setOperation(null);
      setIsSaving(false);
    }
  };

  const handleRemoveImage = async (imageUrl) => {
    if (!user?._id) return;
    if (!window.confirm("Remove this photo from your profile?")) return;
    setOperation("deleting");
    try {
      const response = await authFetch(`${API_URL}/${user._id}/delete-picture`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath: imageUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete image");
      const updatedImages = Array.isArray(data.profile_pictures)
        ? data.profile_pictures.map(normalizeProfilePhotoUrl)
        : images.filter((img) => img !== imageUrl);
      setImages(updatedImages);
      setProfilePicture(
        normalizeProfilePhotoUrl(data.profile_picture) || updatedImages[0] || ""
      );
      await refreshUser();
      onStatus?.({ type: "success", message: "Photo removed." });
    } catch (error) {
      if (isSessionExpiryError(error)) return;
      onStatus?.({
        type: "error",
        message: error.message || "Could not remove photo.",
      });
    } finally {
      setOperation(null);
    }
  };

  const handleSetProfilePicture = async (imageUrl) => {
    if (!user?._id || imageUrl === profilePicture) return;
    setOperation("setting-profile");
    try {
      const response = await authFetch(
        `${API_URL}/${user._id}/set-profile-picture`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to set profile picture");
      }
      setProfilePicture(
        normalizeProfilePhotoUrl(data.profile_picture || imageUrl)
      );
      await refreshUser();
      onStatus?.({
        type: "success",
        message: "Primary portrait updated.",
      });
    } catch (error) {
      if (isSessionExpiryError(error)) return;
      onStatus?.({
        type: "error",
        message: error.message || "Could not set primary photo.",
      });
    } finally {
      setOperation(null);
    }
  };

  const otherImages = images.filter((url) => url && url !== profilePicture);
  const photoCount = images.filter(Boolean).length;

  return (
    <SectionStack>
      <SectionGroup title="Primary">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Add at least 2 photos — families see the primary portrait first (shown
          on the left). Up to {MAX_PHOTOS} photos.
        </p>

        {profilePicture ? (
          <div className="flex items-start gap-4">
            <div className="w-28 shrink-0 overflow-hidden rounded-lg bg-secondary sm:w-32">
              <img
                src={profilePicture}
                alt="Primary portrait"
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
            <div className="min-w-0 pt-1">
              <p className="text-sm font-semibold text-brown">Current primary</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This is the portrait families see first.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className={authSecondaryButtonClassName}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoCount >= MAX_PHOTOS || Boolean(operation)}
                >
                  Add photo
                </button>
                <button
                  type="button"
                  className={cn(authTextButtonClassName, "self-center")}
                  onClick={() => handleRemoveImage(profilePicture)}
                  disabled={operation === "deleting"}
                >
                  Remove primary
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-[10rem] w-full flex-col items-center justify-center rounded-xl border border-dashed border-brown/25 bg-secondary/40 px-6 py-8 text-center transition-colors hover:border-maroon/40 hover:bg-secondary"
          >
            <span className="font-display text-2xl text-brown">
              Add your first portrait
            </span>
            <span className="mt-2 text-sm text-muted-foreground">
              JPG or PNG · crop after you choose
            </span>
          </button>
        )}
      </SectionGroup>

      {otherImages.length > 0 ? (
        <SectionGroup title="More photos">
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {otherImages.map((url) => (
              <div key={url} className="w-24 shrink-0">
                <div className="overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={url}
                    alt=""
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <button
                    type="button"
                    className={authTextButtonClassName}
                    onClick={() => handleSetProfilePicture(url)}
                    disabled={operation === "setting-profile"}
                  >
                    Use as primary
                  </button>
                  <button
                    type="button"
                    className="text-left text-xs text-muted-foreground hover:text-maroon"
                    onClick={() => handleRemoveImage(url)}
                    disabled={operation === "deleting"}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionGroup>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {operation ? (
        <p className="text-sm text-muted-foreground">
          {operation === "uploading"
            ? "Uploading…"
            : operation === "deleting"
              ? "Removing…"
              : "Updating primary…"}
        </p>
      ) : null}

      {showCropper ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-deep/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-2xl text-brown">Crop portrait</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag to reframe. Zoom to fit the face clearly.
            </p>
            <div className="relative mx-auto mt-5 h-[370px] w-[280px] overflow-hidden rounded-lg bg-secondary">
              <canvas
                ref={previewCanvasRef}
                width={CROP_WIDTH}
                height={CROP_HEIGHT}
                className="absolute inset-0 h-full w-full cursor-move"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                  setStartPosition({ x: e.clientX, y: e.clientY });
                }}
              />
              <img
                ref={imageRef}
                src={originalImage}
                alt=""
                className="hidden"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const scaleX = CROP_WIDTH / img.width;
                  const scaleY = CROP_HEIGHT / img.height;
                  const fit = Math.max(scaleX, scaleY);
                  setMinScale(fit * 0.8);
                  setScale(fit);
                  setTranslatePosition({ x: 0, y: 0 });
                }}
              />
            </div>
            <label className="mt-4 block text-sm text-brown">
              Zoom
              <input
                type="range"
                min={minScale}
                max={3}
                step={0.01}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="mt-2 w-full accent-maroon"
              />
            </label>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                className={cn(authSecondaryButtonClassName, "flex-1")}
                onClick={handleCancelCrop}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="button"
                className={cn(authPrimaryButtonClassName, "flex-1")}
                onClick={uploadCroppedImage}
                disabled={isSaving}
              >
                {isSaving ? "Saving…" : "Save photo"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SectionStack>
  );
}

export function getPhotoCountFromUser(user) {
  const pictures = Array.isArray(user?.profile_pictures)
    ? user.profile_pictures.filter(Boolean)
    : [];
  return pictures.length;
}
