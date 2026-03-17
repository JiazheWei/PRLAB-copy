# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page website for the Pattern and Recognition Laboratory (PRLab) at Nanjing University, School of Intelligence Science and Technology. PI: Prof. Chenyang Si. Deployed via GitHub Pages at chenyangsi.top.

## Tech Stack

- Vanilla HTML/CSS/JavaScript (no build tools, no bundler, no npm)
- Bootstrap 4/5 + Bootstrap Icons
- jQuery 3.3.1
- Python 3.6+ for member data automation

## Key Commands

```bash
# Generate member data from markdown files
python generate_members_data.py

# Windows batch alternative
update_members.bat
```

There are no test, lint, or build commands. The site is plain static files served as-is via GitHub Pages.

## Architecture

**Single-page app**: `index.html` (~2200 lines) contains all sections, navigated via anchor links with a sticky header using ScrollSpy.

**Member management pipeline**:
1. Markdown files with YAML front matter live in `people/` (one per member)
2. `generate_members_data.py` parses them and generates `assets/js/members-data.js`
3. `assets/js/members.js` renders member cards into `#members-container` on page load
4. A git pre-commit hook (`.git/hooks/pre-commit`) auto-runs the Python script on commit

**Member categorization** (based on `title` field in YAML):
- "Ph.D." or "PhD" → `phd_students`
- "Master" → `master_students`
- "Intern" → `research_interns`
- "Visiting" → `visiting_scholars`

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main single-page site with all sections |
| `assets/css/style.css` | Custom styles |
| `assets/js/members.js` | Client-side member card renderer |
| `assets/js/members-data.js` | **Auto-generated** — do not edit manually |
| `generate_members_data.py` | Markdown → JS data generator |
| `people/*.md` | Member data source files (YAML front matter) |
| `guidance/` | Internal design specs and restructuring guides |

## Important Conventions

- `assets/js/members-data.js` is auto-generated. Edit `people/*.md` files instead, then run `python generate_members_data.py`.
- Member photos go in `assets/img/people/`.
- Documentation files in `people/` (`README.md`, `HOW_TO_ADD_MEMBER.md`) are excluded from processing.
- Commit messages use the format `type:description` (e.g., `docs:renew index`, `feat: delete animation`).
- The site uses bilingual content (Chinese and English).
