// import { NextResponse } from "next/server";
// import { sendTestEmail } from "@/lib/emailService";

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email address is required" },
//         { status: 400 }
//       );
//     }

//     console.log("Sending test email to:", email);
//     const result = await sendTestEmail(email);

//     if (result.success) {
//       return NextResponse.json({
//         message: "Test email sent successfully",
//         messageId: result.messageId,
//       });
//     } else {
//       return NextResponse.json(
//         { error: "Failed to send test email", details: result.error },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Test email endpoint error:", error);
//     return NextResponse.json(
//       { error: "Internal server error", details: error.message },
//       { status: 500 }
//     );
//   }
// }
