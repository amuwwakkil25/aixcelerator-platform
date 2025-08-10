"""Utilities for parsing resumes and job descriptions."""
from __future__ import annotations

import re
from pathlib import Path
from typing import Dict

import pdfplumber
import docx


def _extract_text(path: Path) -> str:
    """Extract raw text from PDF, DOCX or TXT files."""
    suffix = path.suffix.lower()
    if suffix == ".pdf":
        with pdfplumber.open(path) as pdf:
            return "\n".join(page.extract_text() or "" for page in pdf.pages)
    if suffix in {".doc", ".docx"}:
        document = docx.Document(path)
        return "\n".join(p.text for p in document.paragraphs)
    return path.read_text(encoding="utf-8")


def parse_resume(file_path: str | Path) -> Dict[str, str]:
    """Parse a resume file into structured information."""
    path = Path(file_path)
    text = _extract_text(path)
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    name = lines[0] if lines else ""
    email_match = re.search(r"[\w\.-]+@[\w\.-]+", text)
    phone_match = re.search(r"\+?\d[\d\s-]{7,}\d", text)

    skill_lines = re.findall(r"(?i)skills?:\s*(.*)", text)
    skills: list[str] = []
    for line in skill_lines:
        skills.extend(s.strip().lower() for s in re.split(r",|;|\n", line))

    return {
        "name": name,
        "email": email_match.group(0) if email_match else "",
        "phone": phone_match.group(0) if phone_match else "",
        "skills": sorted({s for s in skills if s}),
        "text": text,
    }


def parse_job_description(file_path: str | Path) -> Dict[str, str]:
    """Parse a job description into structured information."""
    path = Path(file_path)
    text = _extract_text(path)
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    title = lines[0] if lines else ""
    company_match = re.search(r"Company[:\s]+(.+)", text, re.IGNORECASE)

    return {
        "title": title,
        "company": company_match.group(1).strip() if company_match else "",
        "text": text,
    }
