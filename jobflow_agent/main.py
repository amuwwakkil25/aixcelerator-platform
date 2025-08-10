"""CLI entry point for the JobFlow Agent."""
from __future__ import annotations

import os
import logging
from pathlib import Path
from typing import Any

import yaml

from .generator import generate_cover_letter, save_submission
from .matcher import Matcher
from .parsers import parse_job_description, parse_resume

logger = logging.getLogger(__name__)
log_dir = Path("logs")
log_dir.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    filename=str(log_dir / "jobflow.log"),
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)


def load_config(path: str | Path = "config.yaml") -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as fh:
        return yaml.safe_load(fh)


def run() -> None:
    """Run the full matching and submission pipeline."""
    cfg = load_config()
    threshold = float(cfg.get("similarity_threshold", 0.75))
    model_name = cfg.get("model_name", "all-MiniLM-L6-v2")
    template_path = Path(cfg.get("cover_letter_template", "templates/cover_letter.txt"))
    template = template_path.read_text(encoding="utf-8")

    resumes_dir = Path(cfg.get("resumes_dir", "resumes"))
    jobs_dir = Path(cfg.get("jobs_dir", "jobs"))
    matches_dir = Path(cfg.get("matches_dir", "matches"))
    submissions_dir = Path(cfg.get("submissions_dir", "submissions"))

    matcher = Matcher(model_name)
    matches = matcher.match_directory(resumes_dir, jobs_dir, threshold, matches_dir)

    api_key = os.getenv("OPENAI_API_KEY")
    for match in matches:
        resume = parse_resume(resumes_dir / match["resume"])
        job = parse_job_description(jobs_dir / match["job"])
        letter = generate_cover_letter(resume, job, template, api_key)
        save_submission(resume, job, letter, submissions_dir)


if __name__ == "__main__":
    run()
