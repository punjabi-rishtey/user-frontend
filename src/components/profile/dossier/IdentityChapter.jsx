import SectionGroup, { SectionStack } from "../studio/SectionGroup";
import { DossierField, DossierFieldGrid } from "./DossierField";
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  RELIGION_OPTIONS,
} from "./fieldOptions";

export default function IdentityChapter({ data, onChange }) {
  return (
    <SectionStack>
      <SectionGroup title="Contact">
        <DossierFieldGrid>
          <DossierField
            label="Full name"
            name="fullName"
            value={data.fullName}
            onChange={onChange}
          />
          <DossierField
            label="Mobile"
            name="mobile"
            value={data.mobile}
            onChange={onChange}
            type="tel"
          />
          <DossierField
            label="Secondary contact"
            name="secondary_contact"
            value={data.secondary_contact}
            onChange={onChange}
            type="tel"
          />
          <DossierField
            label="Email"
            name="email"
            value={data.email}
            onChange={onChange}
            type="email"
          />
        </DossierFieldGrid>
      </SectionGroup>

      <SectionGroup title="Identity">
        <DossierFieldGrid>
          <DossierField
            label="Date of birth"
            name="dob"
            value={data.dob}
            onChange={onChange}
            type="date"
          />
          <DossierField
            label="Gender"
            name="gender"
            value={data.gender}
            onChange={onChange}
            type="select"
            options={GENDER_OPTIONS}
            readOnly
            hint="Gender is set at signup and cannot be changed here."
          />
          <DossierField
            label="Religion"
            name="religion"
            value={data.religion}
            onChange={onChange}
            type="select"
            options={RELIGION_OPTIONS}
          />
          <DossierField
            label="Marital status"
            name="marital_status"
            value={data.marital_status}
            onChange={onChange}
            type="select"
            options={MARITAL_STATUS_OPTIONS}
          />
        </DossierFieldGrid>
      </SectionGroup>
    </SectionStack>
  );
}
