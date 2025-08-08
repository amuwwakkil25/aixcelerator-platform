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
logging.basicConfig(
    filename="logs/jobflow.log",
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

    matcher = Matcher(model_name)
    matches = matcher.match_directory(Path("resumes"), Path("jobs"), threshold, Path("matches"))

    api_key = os.getenv("OPENAI_API_KEY")
    for match in matches:
        resume = parse_resume(Path("resumes") / match["resume"])
        job = parse_job_description(Path("jobs") / match["job"])
        letter = generate_cover_letter(resume, job, template, api_key)
        save_submission(resume, job, letter, Path("submissions"))


if __name__ == "__main__":
    run()
