import SectionGroup, { SectionStack } from "../studio/SectionGroup";
import { DossierField, DossierFieldGrid } from "./DossierField";

export default function ProfessionChapter({ data, onChange, fieldErrors = {} }) {
  return (
    <SectionStack>
      <SectionGroup title="Work">
        <DossierFieldGrid>
          <DossierField
            label="Occupation"
            name="occupation"
            value={data.occupation}
            onChange={onChange}
          />
          <DossierField
            label="Designation"
            name="designation"
            value={data.designation}
            onChange={onChange}
          />
          <DossierField
            label="Company / working with"
            name="working_with"
            value={data.working_with}
            onChange={onChange}
          />
          <DossierField
            label="Annual income"
            name="income"
            value={data.income}
            onChange={onChange}
            placeholder="e.g. 5 Lakhs"
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Workplace">
        <DossierFieldGrid cols={2}>
          <DossierField
            label="Work city"
            name="work_address.city"
            value={data.work_address?.city}
            onChange={onChange}
          />
          <DossierField
            label="Work address"
            name="work_address.address"
            value={data.work_address?.address}
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
          error={fieldErrors.additional_info || ""}
        />
      </SectionGroup>
    </SectionStack>
  );
}
