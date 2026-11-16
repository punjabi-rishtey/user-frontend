import { DossierField, DossierFieldGrid } from "./DossierField";

export default function AstrologyChapter({ data, onChange }) {
  return (
    <DossierFieldGrid>
      <DossierField
        label="Rashi / Nakshatra"
        name="rashi_nakshatra"
        value={data.rashi_nakshatra}
        onChange={onChange}
      />
      <DossierField
        label="Gotra"
        name="gotra"
        value={data.gotra}
        onChange={onChange}
      />
    </DossierFieldGrid>
  );
}
