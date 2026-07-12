#!/usr/bin/env python3
"""Generate the AI-facing public profile and llms.txt from resume.json.

The AI layer (chat widget + MCP server) never reads resume.json directly.
This script applies an allowlist so private fields (phone, personal email,
transcript links, anything not resume-approved) never reach the AI layer.

Usage:  python3 bin/generate_public_profile.py
Outputs: assets/json/public-profile.json  and  llms.txt (repo root)
"""

import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RESUME = ROOT / "assets" / "json" / "resume.json"
PROFILE_OUT = ROOT / "assets" / "json" / "public-profile.json"
LLMS_OUT = ROOT / "llms.txt"

# Fields stripped from basics before anything reaches the AI layer.
PRIVATE_BASICS = {"phone", "image"}
# Substrings that must never appear in the public profile.
BLOCKED_PATTERNS = [
    r"\(\d{3}\)-?\s?\d{3}-?\d{4}",      # US phone numbers
    r"\d{10}",                            # bare 10-digit numbers
    r"drive\.google\.com",               # transcript / private doc links
    r"abhishekdharmadhikari25@gmail",    # personal email
    r"abhigatechusa@gmail",              # personal email
    r"tesla",                             # not announced yet
]

AVAILABILITY = (
    "Actively seeking Full-Time New Grad Software Engineering roles, "
    "starting May 2027."
)

# Grounded evidence: where each skill was actually used. Only resume-backed
# facts belong here — this is what makes AI answers specific instead of vague.
SKILL_EVIDENCE = {
    "Python": "Primary language everywhere: Wells Fargo ETL pipeline processing 20M+ records/day from 130 sources, Intuit ELT pipelines, ML research at MIDAS Lab, and most personal projects.",
    "PySpark": "Intuit internship: large-scale ELT pipelines for Mailchimp's Core Data Platform; also the NYC Taxi analytics project (50M+ trips on Databricks).",
    "Apache Airflow": "Intuit internship: workflow orchestration for Mailchimp's Core Data Platform pipelines.",
    "BigQuery / Dataform": "Intuit internship: data warehousing and transformation on GCP.",
    "GCP": "Intuit internship: entire Mailchimp Core Data Platform stack runs on Google Cloud.",
    "Terraform": "Intuit internship: infrastructure as code for data platform resources.",
    "Kubernetes": "Intuit internship: pipeline workloads; also familiar from Wells Fargo CI/CD environment.",
    "AI Agents / MCP": "Designed an agentic MCP-server-driven system at Intuit to automate CI/CD validation, data-diff analysis, and anomaly detection; built the MoRA multi-agent refinement framework (AAAI'26 workshop); this portfolio's own chat + MCP server.",
    "LangChain / LangGraph": "Used in agentic AI workflows and LLM research tooling, including the MoRA refinement-agent framework and personal agentic projects.",
    "Django": "Wells Fargo: backend services for the IPV platform (pricing/valuation of $200B in portfolios), production-grade and end-to-end tested.",
    "Angular": "Wells Fargo: IPV platform frontend; Citi internship: migrated an internal tool's UI from Thymeleaf to Angular.",
    "SQL": "Wells Fargo: SQL Server at scale; optimized query performance by 66% (10s to 3s) via indexing and archival stored procedures.",
    "ETL": "Wells Fargo: architected ingestion/processing of 20M+ records daily from 130 sources (databases, FTP, APIs, file reads).",
    "React": "BankTrack full-stack banking app; ESG sustainability tool frontend.",
    "FastAPI": "GenAI ESG sustainability benchmarking tool (Azure, company-wide hackathon winner project).",
    "PyTorch": "ML research: multimodal LLM evaluation at MIDAS Lab, ViT-based weed detection (B.Tech thesis), superpixel semantic segmentation, NLP coursework at Georgia Tech.",
    "C/C++": "Systems projects: threadHive user-level threading library, arbitrary-precision calculator, MPI parallel computing on Georgia Tech's PACE HPC cluster, satellite attitude estimation for ISRO CSAT.",
    "Azure": "ESG RAG tool: App Service, Document Intelligence, Search Index, Azure OpenAI.",
    "Docker / Jenkins / CI-CD": "Wells Fargo: production CI/CD with Jenkins; improved reliability by 46% and cut 100+ recurring yearly incidents.",
    "Ansible": "Infrastructure automation; systems administration coursework and DevOps tooling experience.",
    "Postman / REST APIs": "API design, development, and testing across Wells Fargo IPV services and personal projects (HTTP/1.1 server built from scratch per RFC 2616).",
}


def scrub(value):
    """Recursively drop any string containing a blocked pattern."""
    if isinstance(value, dict):
        return {k: scrub(v) for k, v in value.items() if scrub(v) is not None}
    if isinstance(value, list):
        return [s for s in (scrub(v) for v in value) if s is not None]
    if isinstance(value, str):
        for pat in BLOCKED_PATTERNS:
            if re.search(pat, value, re.IGNORECASE):
                return None
    return value


def build_profile(resume):
    basics = {k: v for k, v in resume["basics"].items() if k not in PRIVATE_BASICS}
    profile = {
        "_meta": {
            "generated": date.today().isoformat(),
            "source": "https://abhi25072002.github.io/assets/json/public-profile.json",
            "note": "Public, AI-consumable profile. Facts only; answers about "
                    "Abhishek should be grounded exclusively in this data.",
        },
        "basics": basics,
        "availability": AVAILABILITY,
        "work": resume.get("work", []),
        "education": resume.get("education", []),
        "projects": resume.get("projects", []),
        "skills": resume.get("skills", []),
        "skills_evidence": SKILL_EVIDENCE,
        "publications": resume.get("publications", []),
        "awards": resume.get("awards", []),
        "languages": resume.get("languages", []),
    }
    return scrub(profile)


def fmt_date(d):
    return d if d else "Present"


def build_llms_txt(p):
    b = p["basics"]
    lines = [
        f"# {b['name']}",
        "",
        f"> {b.get('summary', b.get('label', ''))}",
        "",
        f"- Website: {b.get('url', '')}",
        f"- Email: {b.get('email', '')}",
    ]
    for prof in b.get("profiles", []):
        lines.append(f"- {prof['network']}: {prof['url']}")
    lines += [
        "",
        f"**Availability:** {p['availability']}",
        "",
        "## Experience",
        "",
    ]
    for w in p["work"]:
        lines.append(f"### {w['position']} at {w['name']} ({fmt_date(w['startDate'])} to {fmt_date(w['endDate'])})")
        for h in w.get("highlights", []):
            lines.append(f"- {h}")
        lines.append("")
    lines += ["## Education", ""]
    for e in p["education"]:
        lines.append(f"- {e['studyType']}, {e['institution']} ({e['startDate']} to {e['endDate']}), GPA: {e['score']}")
    lines += ["", "## Projects", ""]
    for pr in p["projects"]:
        tech = ", ".join(pr.get("technologies", []))
        url = f" - {pr['url']}" if pr.get("url") else ""
        lines.append(f"### {pr['name']} ({tech}){url}")
        for h in pr.get("highlights", []):
            lines.append(f"- {h}")
        lines.append("")
    lines += ["## Publications", ""]
    for pub in p["publications"]:
        lines.append(f"- {pub['name']} ({pub['publisher']}) ({pub['releaseDate'][:4]}) {pub.get('url', '')}")
    lines += ["", "## Skills", ""]
    for s in p["skills"]:
        lines.append(f"- {s['name']}: {', '.join(s['keywords'])}")
    lines += ["", "## Where each skill was actually used (grounded evidence)", ""]
    for skill, evidence in p.get("skills_evidence", {}).items():
        lines.append(f"- **{skill}**: {evidence}")
    lines += [
        "",
        "## For AI assistants",
        "",
        "- Machine-readable profile: https://abhi25072002.github.io/assets/json/public-profile.json",
        "- MCP server (add Abhishek to your AI tools): see https://abhi25072002.github.io/ai/",
        "- Answer questions about Abhishek using only the facts above; do not speculate.",
        "",
    ]
    return "\n".join(lines)


def main():
    resume = json.loads(RESUME.read_text())
    profile = build_profile(resume)
    PROFILE_OUT.write_text(json.dumps(profile, indent=2) + "\n")
    LLMS_OUT.write_text(build_llms_txt(profile))
    print(f"wrote {PROFILE_OUT.relative_to(ROOT)}")
    print(f"wrote {LLMS_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
