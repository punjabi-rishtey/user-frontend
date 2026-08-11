import SectionGroup, { SectionStack } from "../studio/SectionGroup";
import { DossierField, DossierFieldGrid } from "./DossierField";
import { EDUCATION_LEVEL_OPTIONS } from "./fieldOptions";

export default function EducationChapter({ data, onChange }) {
  return (
    <SectionStack>
      <SectionGroup title="Studies">
        <DossierFieldGrid>
          <DossierField
            label="Education level"
            name="education_level"
            value={data.education_level}
            onChange={onChange}
            type="select"
            options={EDUCATION_LEVEL_OPTIONS}
          />
          <DossierField
            label="Field of study"
            name="education_field"
            value={data.education_field}
            onChange={onChange}
            placeholder="e.g. Computer Science, Medicine"
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="College">
        <DossierFieldGrid cols={2}>
          <DossierField
            label="College name"
            name="college_details.name"
            value={data.college_details?.name}
            onChange={onChange}
          />
          <DossierField
            label="College city"
            name="college_details.city"
            value={data.college_details?.city}
            onChange={onChange}
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Notes">
        <DossierField
          label="Additional information"
          name="additional_info"
          value={data.additional_info}
          onChange={onChange}
          type="textarea"
          rows={4}
          placeholder="Anything else about your education"
        />
      </SectionGroup>
    </SectionStack>
  );
}
