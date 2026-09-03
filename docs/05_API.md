# 05_API.md
**Project:** CivilVerse
**Version:** 0.1.0 (Foundation Draft)

# API Philosophy

CivilVerse exposes a versioned, secure, API-first platform.

Principles:

- REST-first
- Future GraphQL support
- OpenAPI documentation
- Consistent error handling
- Pagination by default
- Authentication where required
- Backward compatibility

---

# API Versioning

Base URL

/api/v1

Future:

/api/v2

---

# Authentication

- OAuth
- Email/Password
- Passkeys (future)

JWT/session-based authentication.

---

# Core Resources

## Users

GET    /users/me

PATCH  /users/me

GET    /users/{id}

---

## Articles

GET    /articles

GET    /articles/{slug}

POST   /articles

PATCH  /articles/{id}

DELETE /articles/{id}

Supports:

- Search
- Pagination
- Filters
- Categories
- Tags

---

## Structures

GET /structures

GET /structures/{slug}

Query examples:

- country
- type
- material
- year

---

## Materials

GET /materials

GET /materials/{slug}

---

## Engineering Concepts

GET /concepts

GET /concepts/{slug}

---

## Projects

GET /projects

GET /projects/{slug}

---

## Companies

GET /companies

GET /companies/{slug}

---

## Archie AI

POST /ai/chat

POST /ai/explain

POST /ai/image

POST /ai/pdf

POST /ai/xray

Future:

POST /ai/voice

POST /ai/bim

---

## Search

GET /search

Modes:

- keyword
- semantic
- hybrid

---

## Learning

GET /courses

GET /lessons

POST /progress

POST /quiz

---

## Bookmarks

GET /bookmarks

POST /bookmarks

DELETE /bookmarks/{id}

---

# Error Format

{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "..."
  }
}

---

# Rate Limiting

Public:
100 requests/minute

Authenticated:
Higher limits

AI endpoints:
Token and usage quotas.

---

# Security

- HTTPS only
- Input validation
- Authorization checks
- Rate limiting
- Audit logging
- API keys for external integrations (future)

---

# Future APIs

- Public Developer API
- Knowledge Graph API
- BIM API
- GIS API
- Engineering Dataset API
- Webhooks

---

> Future versions will include complete endpoint specifications, request/response schemas, OpenAPI examples, webhook events, SDK guidance, authentication flows, idempotency rules, and API governance.
