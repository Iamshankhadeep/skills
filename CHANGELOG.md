# Changelog

## 1.2.0

- Add Anthropic's `frontend-design` skill with its Apache-2.0 license.
- Pin the Anthropic skills upstream revision in the canonical collection lock.
- Increase the canonical collection from 81 to 82 unique skills.

## 1.1.2

- Update the verification workflow to the current Node 24-based GitHub action releases.

## 1.1.1

- Complete the canonical count, documentation, source lock, and CI updates for the Benny removal.

## 1.1.0

- Remove the complete Pstack Benny automation pack.
- Remove `setup-benny`, `triage-issue-reports`, and `reproduce-and-fix-issues` from the collection.
- Reduce the canonical collection from 84 to 81 skills.

## 1.0.2

- Make the CI discovery assertion tolerate ANSI color codes emitted by the skills CLI.

## 1.0.1

- Declare `Iamshankhadeep/skills` as the canonical distribution.
- Add a machine-readable lock for upstream revisions, counts, and canonical renames.
- Add local and GitHub Actions verification for all 84 unique skill manifests.
- Document the version 2 provider-neutral Herdr orchestration contract.
- Preserve `v1.0.0` as the source-derived rollback baseline.

## 1.0.0

- Package 47 Pstack skills, 36 Matt Pocock skills, and the Herdr skill.
- Resolve the upstream `tdd` and `teach` name collisions while retaining all variants.
- Preserve upstream licenses and required supporting files.
