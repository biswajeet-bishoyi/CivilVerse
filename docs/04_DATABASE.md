# 04_DATABASE.md
**Project:** CivilVerse
**Version:** 0.1.0 (Foundation Draft)

# Database Philosophy

CivilVerse is built around a hybrid data architecture:

1. Relational database for transactional data.
2. Knowledge Graph for relationships.
3. Vector index for semantic AI retrieval.

---

# Primary Database

PostgreSQL

Stores:

- Users
- Roles
- Articles
- Structures
- Materials
- Courses
- Quizzes
- Bookmarks
- Comments
- Progress
- Companies
- Projects

---

# Core Entities

## User

- id
- name
- email
- avatar
- role
- bio
- created_at
- updated_at

Relationships

- bookmarks
- notes
- learning_progress
- ai_conversations

---

## Article

- id
- title
- slug
- summary
- body
- status
- author_id
- category_id
- published_at

Relationships

- tags
- references
- related_articles
- media

---

## Structure

Examples

- Bridges
- Dams
- Buildings
- Tunnels
- Airports

Fields

- id
- name
- country
- city
- type
- height
- span
- material
- completion_year
- coordinates

---

## Material

- Concrete
- Steel
- Timber
- FRP
- Glass

Stores engineering properties and applications.

---

## Engineering Concept

Examples

- Shear
- Bending
- Torsion
- Buckling

Each concept links to articles, formulas, videos, standards, and Archie explanations.

---

## Project

Represents real-world infrastructure projects.

---

## Company

Engineering firms, contractors, consultants, manufacturers.

---

## AI Conversation

Stores user interaction history with Archie.

---

# Knowledge Graph

Every major entity becomes a node.

Example relationships:

Structure -> uses -> Material

Structure -> located_in -> Country

Concept -> explained_by -> Article

Concept -> calculated_by -> Calculator

Project -> built_by -> Company

Standard -> applies_to -> Material

---

# Vector Search

Each article, concept, and document receives embeddings for semantic retrieval.

Supports:

- AI search
- Recommendations
- RAG

---

# Indexing Strategy

Indexes:

- slug
- title
- category
- tags
- created_at
- published_at

Spatial indexes for coordinates.

Vector indexes for embeddings.

---

# Media Storage

Images

Videos

3D Models

PDFs

Animations

Stored externally with metadata in PostgreSQL.

---

# Future Expansion

- BIM models
- IFC metadata
- Digital twins
- GIS layers
- Sensor data
- Engineering simulations

---

> Future versions will include ER diagrams, Prisma schema, normalization decisions, migration strategy, partitioning, backup strategy, retention policies, and complete table definitions.
