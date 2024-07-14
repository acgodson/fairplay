import {
  storeDraft,
  loadDrafts,
  loadDraft,
} from "../../../../utils/draft-storage";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const shop = url.searchParams.get("shop");

  if (!id && !shop) {
    return new NextResponse(
      "Either 'id' or 'shop' parameter must be provided",
      { status: 400 }
    );
  }

  try {
    if (id) {
      console.log(id);
      const draft = await loadDraft(id);
      console.log(draft);
      return NextResponse.json(draft);
    } else if (shop) {
      const drafts = await loadDrafts(shop);
      console.log(drafts);
      return NextResponse.json(drafts);
    }
  } catch (e: any) {
    console.log(e);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const draft = await req.json();
    const draftId = await storeDraft(draft);
    return NextResponse.json({ id: draftId });
  } catch (e: any) {
    console.log(e);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
