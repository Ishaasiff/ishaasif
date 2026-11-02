import type { ComponentType } from "react";
import { RecrotMigrationDiagram } from "./RecrotMigrationDiagram";
import { WorkflowDiagram } from "./WorkflowDiagram";
import { InnovativeDiagram } from "./InnovativeDiagram";
import { StudyAssistantDiagram } from "./AIAssistantDiagram";
/** Heading and intro shown above a project's architecture diagram. */
type ProjectDiagram = {
  Component: ComponentType;
  heading: string;
  description: string;
};

export const projectDiagrams: Partial<Record<string, ProjectDiagram>> = {
  recrot: {
    Component: RecrotMigrationDiagram,
    heading: "Migration architecture",
    description: "How data moves from Firebase to the new Neon Postgres and FastAPI stack.",
  },
  workflow: {
    Component: WorkflowDiagram,
    heading: "Backend architecture",
    description:
      "How requests move through FastAPI, JWT auth, and role checks into a multi-tenant PostgreSQL data layer.",
  },
  innovative: {
    Component: InnovativeDiagram,
    heading: "Site architecture",
    description:
      "How eight routes and typed content modules are prerendered into static HTML, with search and motion layered on the client — and no backend.",
  },
  "ai-study-assistant": {
    Component: StudyAssistantDiagram,
    heading: "Backend architecture",
    description:
      "How the chat endpoint runs a ReAct agent that calls the Groq LLM, with auth and notes routes filtered by user to Neon Postgres.",
  },
};
