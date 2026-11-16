import AtmosphereCard from "@/components/lab/AtmosphereCard";

/**
 * Design lab page for the atmosphere card. Not linked from any nav - reach it
 * directly at /lab/atmosphere-card to compare against the reference.
 */
export default function AtmosphereCardLab() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-8"
      style={{ background: "#ebebeb" }}
    >
      <AtmosphereCard />
    </div>
  );
}
