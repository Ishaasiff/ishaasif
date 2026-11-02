/** A single design decision, with the cost that came with it. */
export type CaseStudyDecision = {
  title: string;
  body: string;
  /** The downside accepted in exchange for the decision. Rendered as a callout. */
  tradeoff?: string;
};

/** One section of a project case study. Sections render in array order. */
export type CaseStudySection = {
  id: string;
  heading: string;
  intro?: string;
  paragraphs?: readonly string[];
  decisions?: readonly CaseStudyDecision[];
  /** A two-column "choice / why" table. */
  stack?: readonly { tool: string; why: string }[];
  /** Short titled notes, rendered in two columns. */
  points?: readonly { label: string; body: string }[];
  bullets?: readonly string[];
};

/** Long-form project write-up shown below the architecture diagram. */
export type ProjectCaseStudy = {
  /** Role, audience, stack: three at-a-glance facts. */
  meta: readonly { label: string; value: string }[];
  sections: readonly CaseStudySection[];
};

export type Project = {
  /** Used in the URL: /projects/<slug> */
  slug: string;
  title: string;
  description: string;
  /** Link to the deployed site. Leave empty until you have it; the button shows as disabled. */
  liveUrl: string;
  /** Optional deep-dive rendered under the project's diagram. */
  caseStudy?: ProjectCaseStudy;
};

export const projects: readonly Project[] = [
  {
    slug: "recrot",
    title: "Recrot",
    description: `Recrot is the backend for a tutoring marketplace that connects tutors with parents and companies with subscriptions, notifications, and admin oversight built in.`,
    liveUrl: "https://recrot-backend-n2uu.vercel.app/docs",
  },
  {
    slug: "workflow",
    title: "Workflow",
    description: `Workflow is a multi-tenant work management SaaS. Its purpose is to help organizations plan and track work through projects, tasks, teams, and reports, with role-based access control keeping each organization's data separate.`,
    liveUrl: "https://workflow-frontend-xi.vercel.app",
  },
  {
    slug: "innovative",
    title: "Innovative Widget",
    description: `A marketing website for "Innovative Widget," a digital agency.`,
    liveUrl: "https://innovativewidgetsite.vercel.app/",
  },
  {
    slug: "ai-study-assistant",
    title: "AI-StudyAssistant",
    description: `A multi-user AI study assistant built on FastAPI and LangChain. Students chat with an LLM tutor that can act on its own — when asked, it saves the explanation as a persistent note in Postgres, scoped to that user. Solo-built end to end: JWT auth, layered API, and a ReAct agent with database-writing tools.`,
    liveUrl: "https://cognify-6xkd.vercel.app/docs",
    caseStudy: {
      meta: [
        {
          label: "Role",
          value: "Solo developer — architecture, data model, REST API, authentication, LLM agent and tool integration.",
        },
        {
          label: "Built for",
          value: "Students who want the speed of a chatbot with the retention of notes.",
        },
        {
          label: "Core stack",
          value: "FastAPI, LangChain, PostgreSQL (Neon), Groq — API-first, no frontend in the repo.",
        },
      ],
      sections: [
        {
          id: "overview",
          heading: "What it is",
          paragraphs: [
            `An API-first study companion for students. You sign up, open a conversation, and ask about a topic. The assistant explains concepts in plain language, and when you say something like “save that as a note,” it writes the note to your account instead of just replying. Notes are then yours to list, read, edit, and delete.`,
            `It closes the gap between “the AI explained it” and “I still have it next week.” Because it is API-first, a web or mobile client can sit on top of it without changing the backend.`,
            `Everything on the server is mine: the FastAPI app, the layered structure (routes → controllers → models/core), JWT auth, the Postgres schema, the LangChain agent, and the tool that lets the model write to the database.`,
          ],
        },
        {
          id: "decisions",
          heading: "Decisions and trade-offs",
          intro:
            "Six choices shaped the backend. Each one bought something specific — and each one has a cost I can name.",
          decisions: [
            {
              title: "A tool-using agent instead of a plain chatbot",
              body: "The chat endpoint runs a LangChain ReAct agent with two tools: a Calculator and a SaveNote tool. This was the core design decision — a normal chatbot can only talk about saving a note; an agent can decide to save it. The SaveNote tool is built per-request with a closure over the current user's ID and database session, so the model physically cannot write to another user's account.",
              tradeoff:
                "The model decides when to act, so behaviour is non-deterministic, and ReAct relies on the model emitting parseable Action: text. I mitigated that with handle_parsing_errors=True and max_iterations=5 to stop runaway loops. Native function calling would be more reliable, but ReAct keeps it model-agnostic and lets me swap providers freely.",
            },
            {
              title: "Stateless chat with history rebuilt from the database",
              body: "Rather than holding ConversationBufferMemory in process memory, I reload the message history from Postgres on every request and inject it into the prompt. The server can restart or scale horizontally without losing context, and conversations survive deploys.",
              tradeoff:
                "Prompt size grows with thread length, so long conversations get slower and more expensive. The next step is windowing or summarising older turns — I chose to ship correctness first and optimise later, since early usage is short sessions.",
            },
            {
              title: "Multi-tenant isolation at the data layer",
              body: "Every query filters on user_id — not just the route guards. Ownership is enforced in the controller, so a bug in a route cannot leak another user's notes. Models use UUID primary keys and ON DELETE CASCADE, so deleting a user cleans up their conversations, messages, and notes.",
            },
            {
              title: "Connection handling tuned for serverless Postgres",
              body: "The database is Neon, which drops idle connections aggressively. I configured pool_pre_ping, pool_recycle=300, and TCP keepalives so the API reconnects instead of throwing stale-connection errors on the first request after a quiet period. This was a real production failure mode, not a hypothetical.",
            },
            {
              title: "Pragmatic schema management",
              body: "Tables are created via SQLAlchemy's create_all rather than Alembic. It is the right call for a solo project at this stage — zero migration overhead while the schema is still moving.",
              tradeoff:
                "It is explicitly a “before scale” choice. Alembic is the first thing I would add once the schema stabilises.",
            },
            {
              title: "Auth done simply",
              body: "JWT bearer tokens with bcrypt-hashed passwords (with the 72-byte truncation handled explicitly). Stateless, no session store, and a standard OAuth2PasswordBearer flow so the Swagger UI is usable for testing immediately.",
            },
          ],
        },
        {
          id: "stack",
          heading: "Stack",
          intro: "Deliberately small — nothing here exists for its own sake.",
          stack: [
            {
              tool: "Python + FastAPI",
              why: "Typed, fast to build, auto-generated OpenAPI docs — testing the API costs nothing.",
            },
            {
              tool: "Pydantic / pydantic-settings",
              why: "Request validation and typed environment config in one dependency.",
            },
            {
              tool: "SQLAlchemy 2.0",
              why: "Typed mapped_column models, relationships, cascade deletes.",
            },
            {
              tool: "PostgreSQL (Neon)",
              why: "Serverless Postgres — free tier, branching, SSL by default.",
            },
            {
              tool: "LangChain",
              why: "Agent and tool abstraction, provider-agnostic so the model isn't a lock-in.",
            },
            {
              tool: "Groq (openai/gpt-oss-120b)",
              why: "Very low-latency, low-cost inference — good enough for tutoring, fast enough to feel live.",
            },
            {
              tool: "python-jose + bcrypt",
              why: "Standard JWT signing and salted password hashing.",
            },
            {
              tool: "Uvicorn",
              why: "ASGI server.",
            },
          ],
        },
        {
          id: "highlights",
          heading: "Worth a closer look",
          points: [
            {
              label: "Agentic tool use with real side effects",
              body: "The interesting engineering isn't the chat — it's safely letting an LLM trigger a database write, scoped to one user, inside a request that must stay transactional.",
            },
            {
              label: "Layered architecture",
              body: "Transport (routes), business logic (controllers), infrastructure (core), and schema (models) are separated, so swapping the LLM provider or the database touches one folder.",
            },
            {
              label: "Failure-mode thinking",
              body: "The connection-pool tuning and the agent's iteration cap are both responses to things that actually break in production.",
            },
            {
              label: "Configuration over hardcoding",
              body: "Settings are externalised through pydantic-settings and a .env file, so environments differ by configuration rather than by code.",
            },
            {
              label: "Roadmap and judgment",
              body: "Being able to name what I would do next signals more than pretending the project is finished.",
            },
          ],
        },
        {
          id: "next",
          heading: "What's next",
          intro:
            "The project is intentionally unfinished. These are the next moves, in priority order.",
          bullets: [
            "Streaming responses, so answers feel live instead of arriving all at once.",
            "Message summarisation or windowing to cap prompt size on long threads.",
            "Alembic migrations before the schema starts changing under real data.",
            "Per-user rate limiting on the chat endpoint.",
            "A test suite covering the auth flow, note ownership, and the SaveNote tool.",
            "Async or off-thread execution for the blocking LLM calls, which currently occupy worker threads under load.",
          ],
        },
      ],
    },
  },
];