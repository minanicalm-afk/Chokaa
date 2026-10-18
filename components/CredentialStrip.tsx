import { credentialLine } from "@/content/site";

export function CredentialStrip() {
  return (
    <section className="border-b border-limestone">
      <div className="shell py-5">
        <p className="meta text-center text-muted">{credentialLine.join("  ·  ")}</p>
      </div>
    </section>
  );
}
