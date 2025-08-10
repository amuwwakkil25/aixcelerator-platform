"""Generate customized application materials."""
from __future__ import annotations

import os
from pathlib import Path
from typing import Dict

from openai import OpenAI


def generate_cover_letter(
    resume: Dict[str, str],
    job: Dict[str, str],
    template: str,
    api_key: str | None = None,
) -> str:
    """Create a cover letter using OpenAI or a template."""
    if api_key:
        client = OpenAI(api_key=api_key)
        prompt = (
            "Write a professional cover letter highlighting the candidate's skills "
            "and experience in relation to the job description.\n\n"
            f"Resume:\n{resume['text']}\n\nJob Description:\n{job['text']}"
        )
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content.strip()

    skills = ", ".join(resume.get("skills", []))
    return template.format(
        company=job.get("company", "Hiring Manager"),
        job_title=job.get("title", "role"),
        skills=skills,
        candidate_name=resume.get("name", "Candidate"),
    )


def save_submission(
    resume: Dict[str, str],
    job: Dict[str, str],
    cover_letter: str,
    base_dir: Path,
) -> Path:
    """Write cover letter to a structured directory."""
    candidate_dir = resume.get("name", "candidate").replace(" ", "")
    job_dir = f"{job.get('company', 'Company')}-{job.get('title', 'Role').replace(' ', '')}"
    path = base_dir / candidate_dir / job_dir
    path.mkdir(parents=True, exist_ok=True)
    (path / "cover_letter.txt").write_text(cover_letter, encoding="utf-8")
    return path
