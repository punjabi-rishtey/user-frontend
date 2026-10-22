import SectionGroup, { SectionStack } from "../studio/SectionGroup";
import { DossierField, DossierFieldGrid } from "./DossierField";
import { FAMILY_TYPE_OPTIONS, FAMILY_VALUE_OPTIONS } from "./fieldOptions";

export default function FamilyChapter({ data, onChange, fieldErrors = {} }) {
  return (
    <SectionStack>
      <SectionGroup title="Values">
        <DossierFieldGrid>
          <DossierField
            label="Family value"
            name="family_value"
            value={data.family_value}
            onChange={onChange}
            type="select"
            options={FAMILY_VALUE_OPTIONS}
          />
          <DossierField
            label="Family type"
            name="family_type"
            value={data.family_type}
            onChange={onChange}
            type="select"
            options={FAMILY_TYPE_OPTIONS}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Parents">
        <DossierFieldGrid>
          <DossierField
            label="Mother's name"
            name="mother.name"
            value={data.mother?.name}
            onChange={onChange}
            error={fieldErrors["mother.name"] || ""}
          />
          <DossierField
            label="Mother's occupation"
            name="mother.occupation"
            value={data.mother?.occupation}
            onChange={onChange}
            error={fieldErrors["mother.occupation"] || ""}
          />
          <DossierField
            label="Father's name"
            name="father.name"
            value={data.father?.name}
            onChange={onChange}
            error={fieldErrors["father.name"] || ""}
          />
          <DossierField
            label="Father's occupation"
            name="father.occupation"
            value={data.father?.occupation}
            onChange={onChange}
            error={fieldErrors["father.occupation"] || ""}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Siblings">
        <DossierFieldGrid cols={2}>
          <DossierField
            label="Brothers"
            name="siblings.brother_count"
            value={data.siblings?.brother_count}
            onChange={onChange}
            type="number"
          />
          <DossierField
            label="Sisters"
            name="siblings.sister_count"
            value={data.siblings?.sister_count}
            onChange={onChange}
            type="number"
          />
        </DossierFieldGrid>
      </SectionGroup>
    </SectionStack>
  );
}
