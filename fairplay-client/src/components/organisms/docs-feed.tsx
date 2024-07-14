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

export interface Proposal {
  id: number;
  documentID: string;
  documentTitle: string;
  method: string;
  proposer: string;
  status: string;
}

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

const IntentsFeed = () => {
  const [showNewIntent, setShowNewIntent] = useState(true);
  const [proposals, setProposals] = useState<Proposal[] | any[] | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [fetching, setFetching] = useState(true);
  const { publicClient } = useGlobalContext();

  return (
    <Accordion type="single" collapsible className="w-full">
      {/* {showNewIntent && <NewIntent />} */}

      {proposals &&
        (proposals as Proposal[] | any[]).length > 0 &&
        proposals.map((proposal, i) => (
          <AccordionItem value={"0"} className="border-b-2" key={i}>
            <AccordionTrigger>
              <IntentHead proposal={proposal} />
            </AccordionTrigger>
            <AccordionContent>
              {proposals && <IntentBody onSubmit={() => {}} />}
            </AccordionContent>
          </AccordionItem>
        ))}

      {fetching && <Loader className="animate-spin" />}
    </Accordion>
  );
};

export default IntentsFeed;
