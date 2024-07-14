import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../atoms/accordion";
import { IntentBody, IntentHead } from "../molecules/intent";
import { Loader } from "lucide-react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import contractAbi from "../../abi/FAIRPLAY.json";

const contractAddress = process.env.NEXT_PUBLIC_FAIRPLAY_CONTRACT;

interface Campaign {
  id: number;
  cid: string;
  merchant: string;
  rewardToken: string;
  isNFT: boolean;
  endTime: number;
  isActive: boolean;
  value: number;
  additionalData?: any;
}

const CampaignsFeed = () => {
  const [showNewIntent, setShowNewIntent] = useState(true);

  const [principal, setPrincipal] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const {
    publicClient,
    allCampaigns: campaigns,
    fetching,
  } = useGlobalContext();

  return (
    <Accordion type="single" collapsible className="w-full">
      {/* {showNewIntent && <NewIntent />} */}

      {campaigns &&
        (campaigns as Campaign[] | any[]).length > 0 &&
        campaigns.map((campaign: any, i: number) => (
          <AccordionItem value={"0"} className="border-b-2" key={i}>
            <AccordionTrigger>
              <IntentHead campaign={campaign} />
            </AccordionTrigger>
            <AccordionContent>
              {campaigns && (
                <IntentBody products={campaign.metadata.products} shop={campaign.metadata.shop} onSubmit={() => {}} />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}

      {fetching && <Loader className="animate-spin" />}
    </Accordion>
  );
};

export default CampaignsFeed;
