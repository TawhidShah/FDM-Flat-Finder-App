// import { NextResponse } from "next/server";
// import { Resend } from "resend";
// import { EmailTemplate } from "@/components/EmailTemplate";

// export async function POST(request) {
//   const body = await request.json();

//   const { sender, recipient, subject, message } = body;

//   console.log(sender, recipient, subject, message);

//   const resend = new Resend(process.env.RESEND_API_KEY);

//   const { data, error } = await resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: recipient,
//     subject: subject,
//     react: EmailTemplate({ message }),
//   });

//   if (error) {
//     console.error(error);
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   console.log(data);

//   return NextResponse.json({ data }, { status: 200 });
// }
