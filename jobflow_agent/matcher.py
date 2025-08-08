"""Resume and job matching engine."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Iterable, List

from sentence_transformers import SentenceTransformer, util

from .parsers import parse_job_description, parse_resume


class Matcher:
    """Compute similarity scores between resumes and job descriptions."""

    def __init__(self, model_name: str) -> None:
        self.model = SentenceTransformer(model_name)

    def score(self, resume_text: str, job_text: str) -> float:
        emb1 = self.model.encode(resume_text, convert_to_tensor=True)
        emb2 = self.model.encode(job_text, convert_to_tensor=True)
        return float(util.cos_sim(emb1, emb2)[0][0])

    def match_directory(
        self,
        resumes_dir: Path,
        jobs_dir: Path,
        threshold: float,
        output_dir: Path,
    ) -> List[dict]:
        """Compare all resumes against jobs and write matches to disk."""
        output_dir.mkdir(parents=True, exist_ok=True)
        matches: List[dict] = []
        for resume_path in resumes_dir.iterdir():
            if resume_path.is_dir():
                continue
            resume = parse_resume(resume_path)
            for job_path in jobs_dir.iterdir():
                if job_path.is_dir():
                    continue
                job = parse_job_description(job_path)
                score = self.score(resume["text"], job["text"])
                if score >= threshold:
                    match = {
                        "resume": resume_path.name,
                        "job": job_path.name,
                        "score": score,
                    }
                    matches.append(match)
        (output_dir / "matches.json").write_text(json.dumps(matches, indent=2))
        return matches
