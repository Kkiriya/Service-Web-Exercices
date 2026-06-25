import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

// === Express routes === //
const app = express();
app.use(express.json()); // parse le JSON entrant

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur sur http://localhost:${PORT}");
});

// === bcrypt === //
const MDP = "";
// a l'inscription : hacher (10 = count / nb de tours)
const hash = await bcrypt.hash(MDP, 10);

// a la connexion : comparer (sans jamais dechiffrer)
const ok = await bcrypt.compare(MDP, hash);
if (!ok) {
  /* mavais mdp -> 401 */
}

// === JWT === //
const SECRET = process.env.JWT_SECRET!; // dans .env, jamais dans le code
// signer (au login) : creer le token
const token = jwt.sign(
  { sub: agent.id, role: agent.role }, // payload
);

// verifier (sur une route protegee) : lance une erreur si invalide/expire
const payload = jwt.verify(token, SECRET); // { sub, role, iat, exp }
