import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function POST(request) {
  const body = await request.json();

  const { sender, recipient, listingTitle, subject, message } = body;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
  } catch (error) {
    return NextResponse.json(
      { message: "Error verifying email transport" },
      { status: 500 },
    );
  }

  try {
    const sendResult = await transport.sendMail({
      from: process.env.SMTP_EMAIL,
      to: recipient.email,
      subject:
        "Message from your property listing on FDM Flat Finder, " + subject,
      html: compileEmailTemplate(
        `${recipient.firstName} ${recipient.lastName}`,
        sender.firstName,
        sender.lastName,
        sender.email,
        listingTitle,
        message,
      ),
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 },
    );
  }
}

export function compileEmailTemplate(
  owner,
  senderFirstName,
  senderLastName,
  senderEmail,
  propertyTitle,
  message,
) {
  const template = handlebars.compile(EmailTemplate);
  const htmlBody = template({
    owner: owner,
    senderFirstName: senderFirstName,
    senderLastName: senderLastName,
    senderEmail: senderEmail,
    propertyTitle: propertyTitle,
    message: message,
  });
  return htmlBody;
}
