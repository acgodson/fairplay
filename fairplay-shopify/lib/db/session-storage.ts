import { Session as ShopifySession } from "@shopify/shopify-api";

import admin from "./firebase-config";

const db = admin.firestore();
const apiKey = process.env.SHOPIFY_API_KEY || "";

// Helper function to remove undefined values
function cleanObject(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}


export async function storeSession(session: ShopifySession) {
  const sessionRef = db.collection('sessions').doc(session.id);

  await sessionRef.set(cleanObject({
    shop: session.shop,
    accessToken: session.accessToken,
    scope: session.scope,
    expires: session.expires,
    isOnline: session.isOnline,
    state: session.state,
    apiKey,
  }));

  if (session.onlineAccessInfo) {
    const onlineAccessInfoRef = db.collection('onlineAccessInfo').doc(session.id);

    await onlineAccessInfoRef.set(cleanObject({
      expiresIn: session.onlineAccessInfo.expires_in,
      associatedUserScope: session.onlineAccessInfo.associated_user_scope,
    }));

    const { associated_user } = session.onlineAccessInfo;
    const associatedUserRef = db.collection('associatedUsers').doc(session.id);

    await associatedUserRef.set(cleanObject({
      firstName: associated_user.first_name,
      lastName: associated_user.last_name,
      email: associated_user.email,
      emailVerified: associated_user.email_verified,
      accountOwner: associated_user.account_owner,
      locale: associated_user.locale,
      collaborator: associated_user.collaborator,
      userId: associated_user.id,
    }));
  }
}

export async function loadSession(id: string) {
  const sessionDoc = await db.collection('sessions').doc(id).get();

  if (sessionDoc.exists) {
    const sessionData = sessionDoc.data();
    return generateShopifySessionFromDB(sessionData as any);
  } else {
    throw new SessionNotFoundError();
  }
}

export async function deleteSession(id: string) {
  await db.collection('sessions').doc(id).delete();
}

export async function deleteSessions(ids: string[]) {
  const batch = db.batch();
  ids.forEach((id) => {
    const sessionRef = db.collection('sessions').doc(id);
    batch.delete(sessionRef);
  });
  await batch.commit();
}

export async function cleanUpSession(shop: string, accessToken: string) {
  const sessionsSnapshot = await db.collection('sessions')
    .where('shop', '==', shop)
    .where('accessToken', '==', accessToken)
    .where('apiKey', '==', apiKey)
    .get();

  const batch = db.batch();
  sessionsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}


export async function findSessionsByShop(shop: string) {
  const sessionsSnapshot = await db.collection('sessions')
    .where('shop', '==', shop)
    .where('apiKey', '==', apiKey)
    .get();

  const sessions : any = [];
  sessionsSnapshot.forEach((doc) => {
    sessions.push(generateShopifySessionFromDB(doc.data()));
  });

  return sessions;
}

function generateShopifySessionFromDB(session: any) {
  return new ShopifySession({
    id: session.id,
    shop: session.shop,
    accessToken: session.accessToken || undefined,
    scope: session.scope || undefined,
    state: session.state,
    isOnline: session.isOnline,
    expires: session.expires || undefined,
  });
}

export class SessionNotFoundError extends Error {
  constructor() {
    super("Session not found");
    this.name = "SessionNotFoundError";
  }
}
