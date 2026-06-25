import {Router, type Response, type Request} from "express";
import prisma from "../../utils/prisma.js";
import axios from "axios";
import bcrypt from "bcryptjs";
import {agentApi} from "../api/agentapi.js";

const routerAgent = Router();

function buildConnectionId(firstName: string, lastName: string): string {
    const suffix = Math.floor(100 + Math.random() * 900);
    return `${firstName}${lastName}${suffix}`;
}

async function fetchCoverIdentity() {
    try {
        const {data} = await agentApi.get("");

        if (!data.results || data.results.length === 0) {
            return null;
        }

        const user = data.results[0];

        return {
            firstName: user.name.first,
            lastName: user.name.last,
            password: user.login.password
        };
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            console.log("Status HTTP: ", e.response.status);
        } else {
            console.log("Network error or timeout");
        }
        return null;
    }
}

routerAgent.post("/recruter", async (req: Request, res: Response) => {
    const data = await fetchCoverIdentity();

    if (!data) {
        return res.status(502).json({erreur: "Impossible de recuperer une identite externe"});
    }

    try {
        const connectionId = buildConnectionId(data.firstName, data.lastName);
        const hashedPwd = await bcrypt.hash(data.password, 10);

        const agent = await prisma.agent.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                connectionId,
                pwd: hashedPwd
            }
        });

        res.status(201).json({
            message: "Agent recruited",
            agent: {
                agentId: agent.agentId,
                firstName: agent.firstName,
                lastName: agent.lastName,
                connectionId: agent.connectionId,
                role: agent.role,
                habilitation: agent.habilitation
            }
        });
    } catch (e: any) {
        if (e?.code === "P2002") {
            return res.status(400).json({erreur: "Agent deja existant (connectionId unique)"});
        }

        console.error(e);
        res.status(500).json({erreur: "Erreur lors du recrutement"});
    }
});

routerAgent.get("/", async (req: Request, res: Response) => {
    const agents = await prisma.agent.findMany({
        orderBy: {firstName: "asc"},
        select: {
            agentId: true,
            firstName: true,
            lastName: true,
            connectionId: true,
            role: true,
            habilitation: true
        }
    });

    res.json(agents);
});

routerAgent.get("/:agentId", async (req: Request, res: Response) => {
    const {agentId} = req.params;

    const agent = await prisma.agent.findUnique({
        where: {agentId},
        select: {
            agentId: true,
            firstName: true,
            lastName: true,
            connectionId: true,
            role: true,
            habilitation: true
        }
    });

    if (!agent) {
        return res.status(404).json({erreur: "Agent introuvable"});
    }
    res.json(agent);
});

export default routerAgent;