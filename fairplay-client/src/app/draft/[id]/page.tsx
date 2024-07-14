
import GlassContainer from "@/components/molecules/glass-container";
import QueryIntents from "@/components/organisms/query-intents";
import LayoutWrapper from "@/components/template/layout-wrapper";

export default async function Page(id: any) {

  return (
    <LayoutWrapper>
      <GlassContainer>
        <QueryIntents id={id} />
      </GlassContainer>
    </LayoutWrapper>
  );
}
