import { KJUR } from 'jsrsasign';

const JWT_HEADER = { alg: 'HS256', typ: 'JWT' };
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const fiveYears = new Date(now.getFullYear() + 5, now.getMonth(), now.getDate());

const anonToken = `
{
"role": "anon",
"iss": "supabase",
"iat": ${Math.floor(today.valueOf() / 1000)},
"exp": ${Math.floor(fiveYears.valueOf() / 1000)}
}
`.trim();

const serviceToken = `
{
"role": "service_role",
"iss": "supabase",
"iat": ${Math.floor(today.valueOf() / 1000)},
"exp": ${Math.floor(fiveYears.valueOf() / 1000)}
}
`.trim();

const generateRandomString = (length) => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const MAX = Math.floor(256 / CHARS.length) * CHARS.length - 1;
  const randomUInt8Array = new Uint8Array(1);
  for (let i = 0; i < length; i++) {
    let randomNumber;
    do {
      crypto.getRandomValues(randomUInt8Array);
      randomNumber = randomUInt8Array[0];
    } while (randomNumber > MAX);
    result += CHARS[randomNumber % CHARS.length];
  }
  return result;
};

const jwt_secret_key = generateRandomString(128);
const anonTokenSigned = KJUR.jws.JWS.sign(null, JWT_HEADER, anonToken, jwt_secret_key);
const serviceTokenSigned = KJUR.jws.JWS.sign(
  null,
  JWT_HEADER,
  serviceToken,
  jwt_secret_key,
);
console.log(`JWT_SECRET=${jwt_secret_key}`);
console.log(`ANON_KEY=${anonTokenSigned}`);
console.log(`SERVICE_ROLE_KEY=${serviceTokenSigned}`);
