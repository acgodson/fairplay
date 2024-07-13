import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../atoms/accordion";
import { IntentBody, IntentHead } from "../molecules/intent";
import { Loader } from "lucide-react";

export interface Proposal {
  id: number;
  documentID: string;
  documentTitle: string;
  method: string;
  proposer: string;
  status: string;
}
const IntentsFeed = () => {
  const [showNewIntent, setShowNewIntent] = useState(true);
  const [proposals, setProposals] = useState<Proposal[] | any[] | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [fetching, setFetching] = useState(true);

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
