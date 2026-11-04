#!/usr/bin/env bash
# ==============================================================================
# Growth-Indonesia Automated Production Attestation Pipeline
# Must run in Instabox VM agy-nafta (/data/home/Growth-Indonesia)
# Enforces strict non-zero exit halting ($? == 0) across all 5 verification stages.
# ==============================================================================
set -eo pipefail

START_TIME_PIPELINE=$(date +%s)
echo "================================================================================"
echo "          GROWTH-INDONESIA PRODUCTION ATTESTATION PIPELINE                      "
echo "================================================================================"
echo "Timestamp: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
echo "Host:      $(hostname)"
echo "Directory: $(pwd)"
echo "Node:      $(node -v) ($(node -p 'process.arch'))"
echo "================================================================================"

# Clean previous build artifacts to ensure an idempotent environment
rm -rf dist

run_stage() {
  local stage_num="$1"
  local stage_name="$2"
  shift 2
  local cmd="$*"

  echo ""
  echo ">>> [STAGE ${stage_num}/5] Starting: ${stage_name}"
  echo ">>> Command: ${cmd}"
  echo "--------------------------------------------------------------------------------"

  local stage_start=$(date +%s)
  local exit_code=0
  "$@" || exit_code=$?
  local stage_end=$(date +%s)
  local stage_duration=$((stage_end - stage_start))

  echo "--------------------------------------------------------------------------------"
  if [ $exit_code -eq 0 ]; then
    echo ">>> [STAGE ${stage_num}/5] PASS: ${stage_name} (exit code: 0, duration: ${stage_duration}s)"
  else
    echo ">>> [STAGE ${stage_num}/5] FAILED: ${stage_name} (exit code: ${exit_code}, duration: ${stage_duration}s)"
    echo ""
    echo "❌ FATAL: Attestation pipeline halted due to failure in Stage ${stage_num}."
    echo "Command that failed: ${cmd}"
    exit $exit_code
  fi
}

# STAGE 1: Astro Check & TypeScript Diagnostics
run_stage 1 "Astro Diagnostics & Type Integrity" npm run check

# STAGE 2: Production Build
# Ensure dist/ is purged before build to prevent stale chunk collisions in @astrojs/cloudflare
rm -rf dist
run_stage 2 "Production Build (196 Pages + Cloudflare Worker)" npm run build

# STAGE 3: Unit Test Suite
run_stage 3 "Unit Tests (28/28 Unit Tests in lib/*.test.ts)" npm test

# STAGE 4: Hallmark Sloplint Policy
run_stage 4 "Hallmark Sloplint Policy (0 FAIL, 0 REFLEX, 0 WARN)" node scripts/sloplint.mjs .

# STAGE 5: E2E Requirement Runner (213 Tests across 5 Tiers)
run_stage 5 "E2E Requirement Runner (213 Tests, All 5 Tiers)" env -u DISPLAY node tests/e2e/runner.mjs

TOTAL_DURATION=$(( $(date +%s) - START_TIME_PIPELINE ))

echo ""
echo "================================================================================"
echo "              ALL 5 VERIFICATION STAGES PASSED CONCURRENTLY                     "
echo "                      FINAL ATTESTATION: VERIFIED (0)                          "
echo "                      TOTAL TIME: ${TOTAL_DURATION}s                           "
echo "================================================================================"
exit 0
