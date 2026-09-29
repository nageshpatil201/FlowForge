import { FastifyInstance } from "fastify";
import { db } from "../../db/client.js";
import { organizations } from "../../db/schema.js";
import { createOrganizationSchema } from "../organizations/organization.schema.js";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/organizations", async (request, reply) => {
    const result = createOrganizationSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        error: "Invalid request",
        details: result.error.flatten(),
      });
    }

    const [organization] = await db
      .insert(organizations)
      .values({
        name: result.data.name,
      })
      .returning();

    return reply.status(201).send({
      organization,
    });
  });
}