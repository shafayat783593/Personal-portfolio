import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
export const AUTH_COOKIE = "portfolio_admin_session";

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/** Server-side helper: is the current request authenticated as admin? */
export function isAuthed() {
  const token = cookies().get(AUTH_COOKIE)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}
