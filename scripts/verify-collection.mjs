#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { basename, dirname, join, relative, resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const lock = JSON.parse(await readFile(join(root, "collection.json"), "utf8"));
const version = (await readFile(join(root, "VERSION"), "utf8")).trim();

if (version !== lock.version) {
  throw new Error(`VERSION (${version}) does not match collection.json (${lock.version})`);
}

const sourceCount = lock.sources.reduce((total, source) => total + source.skillCount, 0);
if (sourceCount !== lock.expectedSkillCount) {
  throw new Error(
    `Source counts total ${sourceCount}; expected ${lock.expectedSkillCount}`,
  );
}

async function findSkillFiles(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await findSkillFiles(entryPath)));
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      found.push(entryPath);
    }
  }
  return found;
}

const files = await findSkillFiles(join(root, "skills"));
if (files.length !== lock.expectedSkillCount) {
  throw new Error(`Found ${files.length} skills; expected ${lock.expectedSkillCount}`);
}

const skills = [];
for (const file of files.sort()) {
  const contents = await readFile(file, "utf8");
  const frontmatter = contents.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    throw new Error(`Missing YAML frontmatter: ${relative(root, file)}`);
  }

  const nameMatch = frontmatter[1].match(/^name:\s*["']?([^\n"']+)["']?\s*$/m);
  const descriptionMatch = frontmatter[1].match(/^description:\s*(.+)$/m);
  if (!nameMatch || !descriptionMatch) {
    throw new Error(`Missing name or description: ${relative(root, file)}`);
  }

  const name = nameMatch[1].trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    throw new Error(`Non-portable skill name ${JSON.stringify(name)}: ${relative(root, file)}`);
  }
  if (basename(dirname(file)) !== name) {
    throw new Error(
      `Directory/name mismatch for ${relative(root, file)}: expected ${basename(dirname(file))}`,
    );
  }

  skills.push({ name, file });
}

const byName = new Map();
for (const skill of skills) {
  const prior = byName.get(skill.name);
  if (prior) {
    throw new Error(
      `Duplicate skill name ${skill.name}: ${relative(root, prior)} and ${relative(root, skill.file)}`,
    );
  }
  byName.set(skill.name, skill.file);
}

for (const required of ["tdd", "teach", "regression-tdd", "explain-code", "herdr"]) {
  if (!byName.has(required)) {
    throw new Error(`Missing required canonical skill: ${required}`);
  }
}

console.log(
  `Verified ${skills.length} skills, ${byName.size} unique portable names, and collection version ${version}.`,
);
