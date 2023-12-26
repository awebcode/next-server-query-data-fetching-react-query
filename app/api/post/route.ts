// import { NextRequest, NextResponse } from "next/server";
// import { cookies, headers } from "next/headers";

// export async function POST(req: NextRequest, res: NextResponse) {
//        let formData = await req.formData();
//     let body = Object.fromEntries(formData);
// console.log(formData)

//   return NextResponse.json(
//     {
//       message: "Post success!",
//           //   json,
//         json:body
//     },
//     { status: 201 }
//   );
// }
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  let json = await req.json();
  console.log(json);

  return NextResponse.json(
    {
      message: "Post success!",
      //   json,
      json,
    },
    { status: 201 }
  );
}
