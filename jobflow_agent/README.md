# JobFlow Agent

This module automates parsing resumes and job descriptions, matching them and generating cover letters.

## Usage

1. Place resume files in `resumes/` and job descriptions in `jobs/`.
2. Configure options in `config.yaml`.
3. Install dependencies: `pip install -r requirements.txt`.
4. Run the pipeline:

```bash
python -m jobflow_agent.main
```

Matched pairs are written to `matches/matches.json` and cover letters are stored under `submissions/`.
