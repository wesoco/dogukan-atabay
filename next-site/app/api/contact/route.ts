import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  name: z.string().min(1, "Ad soyad gerekli"),
  phone: z.string().min(1, "Telefon gerekli"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = bodySchema.safeParse({
      ...raw,
      email: raw.email || "",
    });
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Geçersiz veri" },
        { status: 400 }
      );
    }
    const { name, phone, email, message } = parsed.data;
    await prisma.contactSubmission.create({
      data: {
        name,
        phone,
        email: email || undefined,
        message: message || undefined,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { message: "Kayıt sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
