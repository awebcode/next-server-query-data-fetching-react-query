import jwt from "jsonwebtoken";

export async function generateJWTAccessToken(
  data: Record<string, any>
  
): Promise<string> {
  const token: string = jwt.sign({email:data}, process.env.JWT_SECRET!, {
    expiresIn: "1m",
  });
  return token;
}


export async function generateJWTRefreshToken(data: Record<string, any>): Promise<string> {
  const token: string = jwt.sign({ email: data }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "2m",
  });
  return token;
}