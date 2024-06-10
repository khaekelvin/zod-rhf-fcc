import { UserSchema } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json(); // Retrieve the JSON data from the request body
  const result = UserSchema.safeParse(body); // Use Zod to validate the received data against the UserSchema

  if (result.success) {
    // Check if the validation is successful
    return NextResponse.json({ success: true });
  }
  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  // Respond with a JSON object containing the validation errors
  return NextResponse.json({ server: serverErrors });
}
