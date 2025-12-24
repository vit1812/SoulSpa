#!/usr/bin/env bash
set -euo pipefail

# React Native (Expo bare) Android App Bundle build script
# - Installs JS deps (npm/yarn)
# - Builds .aab with Gradle wrapper for Play Store upload

APP_ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$APP_ROOT_DIR"

MODE="release"                 # debug | release
ARCHS=""                       # e.g. "arm64-v8a,armeabi-v7a,x86_64" -> passed to -PreactNativeArchitectures
CLEAN_BEFORE_BUILD="false"     # true | false
GRADLE_ZIP=""                  # Optional path to pre-downloaded gradle-<ver>-bin.zip

usage() {
  echo "Usage: $(basename "$0") [--mode debug|release] [--arch <abi1,abi2>] [--clean] [--gradle-zip /path/to/gradle-<ver>-bin.zip]"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode)
      MODE="$2"; shift 2;;
    --arch)
      ARCHS="$2"; shift 2;;
    --clean)
      CLEAN_BEFORE_BUILD="true"; shift 1;;
    --gradle-zip)
      GRADLE_ZIP="$2"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown arg: $1"; usage; exit 1;;
  esac
done

echo "==> Node & package manager info"
node --version || true
npm --version || true
yarn --version >/dev/null 2>&1 && yarn --version || true

echo "==> Install JS dependencies"
if [[ -d node_modules ]]; then
  echo "node_modules/ exists; skipping install to avoid network."
else
  if [[ -f yarn.lock ]] && command -v yarn >/dev/null 2>&1; then
    yarn install --frozen-lockfile
  elif [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi
fi

echo "==> Prepare Gradle wrapper"
ANDROID_DIR="android"
cd "$ANDROID_DIR"

# Optionally point Gradle Wrapper to local distribution ZIP
RESTORE_WRAPPER=false
WRAPPER_PROPS="gradle/wrapper/gradle-wrapper.properties"
if [[ -n "${GRADLE_ZIP}" ]]; then
  if [[ ! -f "${GRADLE_ZIP}" ]]; then
    echo "ERROR: --gradle-zip file not found: ${GRADLE_ZIP}"; exit 1
  fi
  echo "==> Using local Gradle distribution: ${GRADLE_ZIP}"
  cp "${WRAPPER_PROPS}" "${WRAPPER_PROPS}.bak"
  RESTORE_WRAPPER=true
  ESCAPED_ZIP_PATH=$(python3 -c 'import sys, urllib.parse; p=sys.argv[1]; print("distributionUrl=file:"+urllib.parse.quote(p, safe="/"))' "${GRADLE_ZIP}")
  if sed --version >/dev/null 2>&1; then SED_INPLACE=(-i); else SED_INPLACE=(-i ""); fi
  sed "${SED_INPLACE[@]}" -E "s#^distributionUrl=.*#${ESCAPED_ZIP_PATH}#" "${WRAPPER_PROPS}"
fi

if [[ "${CLEAN_BEFORE_BUILD}" == "true" ]]; then
  echo "==> Clean previous builds"
  ./gradlew clean
fi

echo "==> Build AAB (mode=${MODE}${ARCHS:+, archs=${ARCHS}})"
GRADLE_ARGS=()
if [[ -n "${ARCHS}" ]]; then
  GRADLE_ARGS+=("-PreactNativeArchitectures=${ARCHS}")
fi

if [[ "${MODE}" == "debug" ]]; then
  TASK="bundleDebug"
else
  TASK="bundleRelease"
fi

if [[ ${#GRADLE_ARGS[@]:-0} -gt 0 ]]; then
  ./gradlew "${TASK}" "${GRADLE_ARGS[@]}"
else
  ./gradlew "${TASK}"
fi

if [[ "${RESTORE_WRAPPER}" == "true" ]]; then
  mv -f "${WRAPPER_PROPS}.bak" "${WRAPPER_PROPS}"
fi

BUNDLE_BASE_DIR="app/build/outputs/bundle"
if [[ "${MODE}" == "debug" ]]; then
  BUNDLE_DIR="${BUNDLE_BASE_DIR}/debug"
else
  BUNDLE_DIR="${BUNDLE_BASE_DIR}/release"
fi

BUNDLE_FILES=($(ls -1 "${BUNDLE_DIR}"/*.aab 2>/dev/null || true))
if [[ ${#BUNDLE_FILES[@]} -eq 0 ]]; then
  echo "ERROR: No AABs found in ${BUNDLE_DIR}."; exit 1
fi

echo "==> Built AAB(s):"
for f in "${BUNDLE_FILES[@]}"; do
  echo "  - $PWD/$f"
done

echo "Done. Upload the .aab to Google Play Console."
