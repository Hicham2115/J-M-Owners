import { CollectionsNavbar } from "@/components/collections/navbar";
import { CollectionsHero } from "@/components/collections/hero";
import { PropertyBrowser } from "@/components/collections/property-browser";
import { Footer } from "@/components/footer";

export default function CollectionsPage() {
  return (
    <main>
      <CollectionsNavbar />
      <CollectionsHero />
      <PropertyBrowser />
      <Footer />
    </main>
  );
}
