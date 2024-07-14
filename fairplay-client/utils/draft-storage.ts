import admin from "./firebase-config";

interface Draft {
  id: string;
  shop: string;
  campaignTitle: string;
  products: string[];
  endDate: Date;
}

const db = admin.firestore();

// Helper function to remove undefined values
function cleanObject(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}

export async function storeDraft(draft: Draft): Promise<string> {
  const sessionRef = db.collection("drafts");
  const doc = await sessionRef.add(
    cleanObject({
      id: undefined,
      shop: draft.shop,
      campaignTitle: draft.campaignTitle,
      products: draft.products,
      endDate: draft.endDate,
    })
  );
  return doc.id;
}

export async function loadDraft(id: string) {
  const draftDoc = await db.collection("drafts").doc(id).get();

  if (draftDoc.exists) {
    const draftData = draftDoc.data();
    // console.log(draftData);
    if (draftData) {
      return {
        id: draftData.id,
        shop: draftData.shop,
        campaignTitle: draftData.campaignTitle,
        products: draftData.products,
        endDate: draftData.endDate,
      };
    }
  } else {
    throw new DraftNotFoundError();
  }
}

export async function loadDrafts(shop: string) {
  const draftsRef = db.collection("drafts");
  const querySnapshot = await draftsRef.where("shop", "==", shop).get();

  if (!querySnapshot.empty) {
    const drafts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return drafts;
  } else {
    throw new DraftNotFoundError();
  }
}

export async function deleteDraft(id: string) {
  await db.collection("sessions").doc(id).delete();
}

export class DraftNotFoundError extends Error {
  constructor() {
    super("Draft not found");
    this.name = "DraftNotFoundError";
  }
}
