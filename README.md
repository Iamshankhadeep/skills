# Agent skills collection

This repository packages 84 skills from Pstack, Matt Pocock's skills, and Herdr so they can be installed together with the [skills CLI](https://skills.sh/).

Version 1 preserves the source collections' orchestration behavior, apart from the documented name-collision fixes. The `v1.0.0` Git tag is the stable rollback point before provider-neutral Herdr orchestration is introduced in version 2.

The proposed version 2 contract is documented in [docs/v2-herdr-orchestration.md](docs/v2-herdr-orchestration.md). It is a design only; the installed skills still use version 1 behavior.

## Install

Install every skill for every supported agent in the current project:

```bash
npx skills@latest add Iamshankhadeep/skills --all
```

Install every skill globally for every supported agent:

```bash
npx skills@latest add Iamshankhadeep/skills --all --global
```

List the skills without installing them:

```bash
npx skills@latest add Iamshankhadeep/skills --list
```

Use `--skill <name>` and `--agent <name>` instead of `--all` for a selective install.

## Directory layout

| Directory | Count | Contents |
| --- | ---: | --- |
| `skills/pstack/` | 44 | Pstack's core workflows, principles, writing, orchestration, and verification skills |
| `skills/pstack-benny/` | 3 | Benny issue-triage and reproduction automations, including their required templates |
| `skills/mattpocock/engineering/` | 18 | Stable engineering workflows |
| `skills/mattpocock/productivity/` | 7 | Stable productivity and teaching workflows |
| `skills/mattpocock/in-progress/` | 7 | Experimental/in-progress workflows |
| `skills/mattpocock/misc/` | 4 | Narrow or platform-specific utilities |
| `skills/herdr/` | 1 | Herdr terminal-multiplexer control |

Total: 84 skill manifests with 84 unique skill names.

## Collision policy

The upstream collections contain two exact name collisions. Keeping the duplicate names causes `skills` to silently expose only one copy of each. This repository keeps Pstack's original names and gives Matt Pocock's variants distinct names:

| Upstream name | Name here | Why |
| --- | --- | --- |
| Pstack `tdd` | `tdd` | Original Pstack name; narrow, cheap failing-test-first workflow for bug fixes |
| Matt Pocock `tdd` | `regression-tdd` | Broader feature and bug TDD workflow used by Matt's other skills |
| Pstack `teach` | `teach` | Original Pstack name; one-session explanation of how and why a codebase works |
| Matt Pocock `teach` | `explain-code` | Stateful, multi-session learning workspace |

Pstack's `Poteto Mode` metadata is also normalized to `poteto-mode`, matching its directory and portable skill-name conventions. References inside Matt Pocock's routing skills have been adjusted to the renamed variants.

## Functional overlap

These skills overlap in topic, but are not exact duplicates:

| Area | Skills | Distinction |
| --- | --- | --- |
| Architecture | `architect`, `codebase-design`, `improve-codebase-architecture`, `principle-model-the-domain`, `domain-modeling` | Design a concrete change; supply module vocabulary; audit an existing codebase; shape code structures; maintain project terminology and ADRs |
| Review | `interrogate`, `code-review`, `blast-radius` | Adversarial multi-model review; standards/spec review; downstream breakage analysis |
| Planning and execution | `figure-it-out`, `wayfinder`, `to-spec`, `to-tickets`, `implement` | Auditable open-ended playbook; long-horizon decision map; specification; tracer-bullet breakdown; implementation |
| Debugging and tests | `diagnosing-bugs`, `tdd`, `regression-tdd`, `principle-fix-root-causes` | Diagnosis loop; narrow regression proof; full TDD; lightweight root-cause principle |
| Teaching and discovery | `how`, `why`, `teach`, `explain-code` | Runtime structure; historical rationale; code explanation combining both; persistent curriculum |
| Interviews | `grill-me`, `grilling`, `grill-with-docs`, `loop-me` | User-facing interview; reusable grilling discipline; interview plus project docs; experimental workflow interview |
| Writing | `unslop`, `technical-writing`, `writing-for-agents`, `writing-fragments`, `writing-beats`, `writing-shape` | Style cleanup; technical-doc standard; agent-facing instructions; experimental long-form writing stages |
| Handoffs | `handoff`, `claude-handoff` | Written handoff artifact; experimental live background-agent transfer |
| Implementation | `implement`, `implement-spec` | Stable spec/ticket implementation flow; older experimental spec implementation |
| Parallel work | `swarm`, `arena`, `herdr` | Fan-out and combine; competing candidates; terminal/session control for real agent processes |

The strongest internal overlaps are Matt's `grill-me`/`grilling`, `handoff`/`claude-handoff`, and `implement`/`implement-spec`. They remain because the latter variants are explicitly in progress and the goal of this collection is source completeness.

## Portability notes

- Benny requires its full automation pack and configuration, not only its three `SKILL.md` files.
- `setup-pstack`, parts of `poteto-mode`, and Benny contain Cursor-specific behavior.
- `git-guardrails-claude-code` is specific to Claude Code.
- `herdr` is intentionally inactive unless the agent is running with `HERDR_ENV=1`.
- Skills that spawn parallel agents degrade according to the capabilities of the host agent. Installing a skill for every agent does not make every host support the same tools.
- Matt's `in-progress` directory is included but should be treated as experimental.

## Sources

- [Cursor Pstack](https://github.com/cursor/plugins/tree/main/pstack), snapshot `46125561306434d8a1d7745d540d8932ab0cd2a2` (MIT)
- [Matt Pocock's skills](https://github.com/mattpocock/skills/tree/main/skills), snapshot `5b15a47f2d7150f545fbcacbfe381787fc0230dc` (MIT)
- [Herdr skill v0.8.2](https://github.com/herdrdev/herdr/blob/v0.8.2/skills/herdr/SKILL.md), commit `9eb521456ac0d19d3ab3d9d7cea3cca10baa8a4c` (Apache-2.0)

The corresponding license texts are retained in `licenses/`.
