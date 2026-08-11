import {
  authInputClassName,
  authSecondaryButtonClassName,
} from "@/components/ui/formStyles";
import SectionGroup, { SectionStack } from "../studio/SectionGroup";
import { DossierField, DossierFieldGrid } from "./DossierField";
import {
  ABROAD_OPTIONS,
  BODY_TYPE_OPTIONS,
  CASTE_OPTIONS,
  DIET_OPTIONS,
  FEET_OPTIONS,
  HABIT_OPTIONS,
  INCHES_OPTIONS,
  MANGLIK_OPTIONS,
  NRI_OPTIONS,
  SKIN_TONE_OPTIONS,
  YES_NO_OPTIONS,
} from "./fieldOptions";

export default function LifestyleChapter({
  data,
  hobbies,
  newHobby,
  onChange,
  onHobbyChange,
  onAddHobby,
  onRemoveHobby,
}) {
  return (
    <SectionStack>
      <SectionGroup title="Appearance">
        <DossierFieldGrid cols={2}>
          <DossierField
            label="Height (feet)"
            name="height.feet"
            value={data.height?.feet}
            onChange={onChange}
            type="select"
            options={[{ value: "", label: "Feet" }, ...FEET_OPTIONS]}
          />
          <DossierField
            label="Height (inches)"
            name="height.inches"
            value={data.height?.inches}
            onChange={onChange}
            type="select"
            options={[{ value: "", label: "Inches" }, ...INCHES_OPTIONS]}
          />
        </DossierFieldGrid>
        <DossierFieldGrid>
          <DossierField
            label="Skin tone"
            name="physical_attributes.skin_tone"
            value={data.physical_attributes?.skin_tone}
            onChange={onChange}
            type="select"
            options={SKIN_TONE_OPTIONS}
          />
          <DossierField
            label="Body type"
            name="physical_attributes.body_type"
            value={data.physical_attributes?.body_type}
            onChange={onChange}
            type="select"
            options={BODY_TYPE_OPTIONS}
          />
          <DossierField
            label="Physical disability"
            name="physical_attributes.physical_disability"
            value={data.physical_attributes?.physical_disability}
            onChange={onChange}
            type="select"
            options={YES_NO_OPTIONS}
          />
          <DossierField
            label="Disability details"
            name="physical_attributes.disability_reason"
            value={data.physical_attributes?.disability_reason}
            onChange={onChange}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Background">
        <DossierFieldGrid>
          <DossierField
            label="Caste"
            name="caste"
            value={data.caste}
            onChange={onChange}
            type="select"
            options={CASTE_OPTIONS}
          />
          <DossierField
            label="Language"
            name="language"
            value={data.language}
            onChange={onChange}
            placeholder="e.g. Punjabi, Hindi, English"
          />
          <DossierField
            label="Manglik status"
            name="manglik"
            value={data.manglik}
            onChange={onChange}
            type="select"
            options={MANGLIK_OPTIONS}
          />
          <DossierField
            label="Birth time"
            name="birth_details.birth_time"
            value={data.birth_details?.birth_time}
            onChange={onChange}
            type="time"
          />
          <DossierField
            label="Birth place"
            name="birth_details.birth_place"
            value={data.birth_details?.birth_place}
            onChange={onChange}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Habits">
        <DossierFieldGrid>
          <DossierField
            label="Smoking"
            name="lifestyle.smoke"
            value={data.lifestyle?.smoke}
            onChange={onChange}
            type="select"
            options={HABIT_OPTIONS}
          />
          <DossierField
            label="Drinking"
            name="lifestyle.drink"
            value={data.lifestyle?.drink}
            onChange={onChange}
            type="select"
            options={HABIT_OPTIONS}
          />
          <DossierField
            label="Diet preference"
            name="lifestyle.veg_nonveg"
            value={data.lifestyle?.veg_nonveg}
            onChange={onChange}
            type="select"
            options={DIET_OPTIONS}
          />
          <DossierField
            label="NRI status"
            name="lifestyle.nri_status"
            value={data.lifestyle?.nri_status}
            onChange={onChange}
            type="select"
            options={NRI_OPTIONS}
          />
          <DossierField
            label="Ready to move abroad"
            name="lifestyle.abroad_ready"
            value={
              data.lifestyle?.abroad_ready === null ||
              data.lifestyle?.abroad_ready === undefined
                ? ""
                : data.lifestyle.abroad_ready
            }
            onChange={onChange}
            type="select"
            options={ABROAD_OPTIONS}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Home">
        <DossierFieldGrid cols={2}>
          <DossierField
            label="City"
            name="home_address.city"
            value={data.home_address?.city}
            onChange={onChange}
          />
          <DossierField
            label="Address"
            name="home_address.address"
            value={data.home_address?.address}
            onChange={onChange}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Hobbies">
        <div className="mb-3 flex flex-wrap gap-2">
          {hobbies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hobbies added yet.</p>
          ) : (
            hobbies.map((hobby) => (
              <button
                key={hobby}
                type="button"
                onClick={() => onRemoveHobby(hobby)}
                className="rounded-lg border border-brown/15 bg-secondary/50 px-3 py-1.5 text-sm text-brown transition-colors hover:border-maroon/30 hover:text-maroon"
              >
                {hobby} ×
              </button>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHobby}
            onChange={onHobbyChange}
            placeholder="Add a hobby"
            className={authInputClassName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddHobby();
              }
            }}
          />
          <button
            type="button"
            onClick={onAddHobby}
            className={authSecondaryButtonClassName}
          >
            Add
          </button>
        </div>
      </SectionGroup>
    </SectionStack>
  );
}
