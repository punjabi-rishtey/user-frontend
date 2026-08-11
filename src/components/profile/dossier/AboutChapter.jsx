import { DossierField, DossierFieldGrid } from "./DossierField";

export default function AboutChapter({ data, onChange }) {
  return (
    <DossierFieldGrid>
      <DossierField
        label="About myself"
        name="about_myself"
        value={data.about_myself}
        onChange={onChange}
        type="textarea"
        rows={5}
        placeholder="A few honest lines about who you are"
        hint={`${(data.about_myself || "").length}/300`}
      />
      <DossierField
        label="Looking for"
        name="looking_for"
        value={data.looking_for}
        onChange={onChange}
        type="textarea"
        rows={5}
        placeholder="What you hope to find in a partner"
        hint={`${(data.looking_for || "").length}/300`}
      />
    </DossierFieldGrid>
  );
}
