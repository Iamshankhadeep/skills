# Maintaining the collection

`Iamshankhadeep/skills` is the canonical distribution and release source for this collection. The Cursor, Matt Pocock, and Herdr repositories are upstream inputs. Users should install and update from this repository rather than combining the upstream repositories themselves.

## Importing upstream changes

1. Read `collection.json` and compare each pinned revision with its upstream repository.
2. Import changed skill directories together with every referenced script, template, asset, and license change.
3. Reapply the canonical collision names and update their internal callers:
   - Pstack keeps `tdd` and `teach`.
   - Matt Pocock's variants are `regression-tdd` and `explain-code`.
   - Pstack's display name `Poteto Mode` is normalized to `poteto-mode`.
4. Update the source revision and skill count in `collection.json`.
5. Run `node scripts/verify-collection.mjs` and `npx skills@latest add . --list`.
6. Review any upstream instructions that invoke provider-specific subagents. Version 1 preserves them; version 2 migrations must follow `docs/v2-herdr-orchestration.md`.

Do not copy a `SKILL.md` without its relative dependencies. Do not replace a canonical skill with an upstream file when doing so would undo a documented rename or local routing adjustment.

## Releasing

1. Update `VERSION` and `collection.json` to the same semantic version.
2. Run the verification workflow locally.
3. Commit the release state.
4. Create an annotated `v<version>` tag on that commit.
5. Push `main` and the tag to `Iamshankhadeep/skills`.
6. Create the matching GitHub release.
7. Verify discovery from GitHub:

   ```bash
   npx skills@latest add iamshankhadeep/skills --list
   ```

Published version tags are immutable. If a release is wrong, publish a new version instead of moving its tag.

## Rollback

Create a new branch from the known-good tag. Do not rewrite `main` or delete later release history:

```bash
git switch -c restore-v1 v1.0.0
```
