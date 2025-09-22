#!/usr/bin/env bash
set -euo pipefail

# React Native (Expo bare) Android APK build script
# - Installs JS deps (npm/yarn)
# - Builds APK with Gradle wrapper
# - Optionally installs to a connected device via adb

APP_ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$APP_ROOT_DIR"

MODE="release"                 # debug | release
ARCHS=""                       # e.g. "arm64-v8a,armeabi-v7a,x86_64" -> passed to -PreactNativeArchitectures
INSTALL_AFTER_BUILD="false"    # true | false
CLEAN_BEFORE_BUILD="false"     # true | false
GRADLE_ZIP=""                  # Optional path to pre-downloaded gradle-<ver>-bin.zip

usage() {
  echo "Usage: $(basename "$0") [--mode debug|release] [--arch <abi1,abi2>] [--clean] [--install] [--gradle-zip /path/to/gradle-<ver>-bin.zip]"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode)
      MODE="$2"; shift 2;;
    --arch)
      ARCHS="$2"; shift 2;;
    --clean)
      CLEAN_BEFORE_BUILD="true"; shift 1;;
    --install)
      INSTALL_AFTER_BUILD="true"; shift 1;;
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
  # Build file:// URL and escape path safely
  ESCAPED_ZIP_PATH=$(python3 -c 'import sys, urllib.parse; p=sys.argv[1]; print("distributionUrl=file:"+urllib.parse.quote(p, safe="/"))' "${GRADLE_ZIP}")
  # macOS sed in-place
  if sed --version >/dev/null 2>&1; then SED_INPLACE=(-i); else SED_INPLACE=(-i ""); fi
  sed "${SED_INPLACE[@]}" -E "s#^distributionUrl=.*#${ESCAPED_ZIP_PATH}#" "${WRAPPER_PROPS}"
fi

if [[ "${CLEAN_BEFORE_BUILD}" == "true" ]]; then
  echo "==> Clean previous builds"
  ./gradlew clean
fi

echo "==> Build APK (mode=${MODE}${ARCHS:+, archs=${ARCHS}})"
GRADLE_ARGS=()
if [[ -n "${ARCHS}" ]]; then
  GRADLE_ARGS+=("-PreactNativeArchitectures=${ARCHS}")
fi

if [[ "${MODE}" == "debug" ]]; then
  if [[ ${#GRADLE_ARGS[@]:-0} -gt 0 ]]; then
    ./gradlew assembleDebug "${GRADLE_ARGS[@]}"
  else
    ./gradlew assembleDebug
  fi
else
  if [[ ${#GRADLE_ARGS[@]:-0} -gt 0 ]]; then
    ./gradlew assembleRelease "${GRADLE_ARGS[@]}"
  else
    ./gradlew assembleRelease
  fi
fi

# Restore wrapper properties if modified
if [[ "${RESTORE_WRAPPER}" == "true" ]]; then
  mv -f "${WRAPPER_PROPS}.bak" "${WRAPPER_PROPS}"
fi

# Determine APK path(s)
APK_BASE_DIR="app/build/outputs/apk"
if [[ "${MODE}" == "debug" ]]; then
  APK_DIR="${APK_BASE_DIR}/debug"
else
  APK_DIR="${APK_BASE_DIR}/release"
fi

APK_FILES=($(ls -1 ${APK_DIR}/*.apk 2>/dev/null || true))
if [[ ${#APK_FILES[@]} -eq 0 ]]; then
  echo "ERROR: No APKs found in ${APK_DIR}."; exit 1
fi

echo "==> Built APK(s):"
for f in "${APK_FILES[@]}"; do
  echo "  - $PWD/$f"
done

if [[ "${INSTALL_AFTER_BUILD}" != "true" ]]; then
  echo "Done. Use --install to auto-install to a connected device."
  exit 0
fi

echo "==> Installing to connected device (adb)"
if ! command -v adb >/dev/null 2>&1; then
  echo "ERROR: adb not found. Install Android Platform Tools and ensure 'adb' is on PATH."; exit 1
fi

DEVICE_COUNT=$(adb devices | awk 'NR>1 && $2=="device" {print $1}' | wc -l | tr -d ' ')
if [[ "$DEVICE_COUNT" -eq 0 ]]; then
  echo "No connected devices. Plug in a device (with USB debugging) or start an emulator."; exit 1
fi

# Pick an APK to install
TARGET_APK="${APK_FILES[0]}"

# If multiple APKs exist and a device ABI can be detected, try to pick a matching one.
if [[ ${#APK_FILES[@]} -gt 1 ]]; then
  ABI=$(adb shell getprop ro.product.cpu.abi | tr -d '\r')
  echo "Device ABI: ${ABI}"
  for f in "${APK_FILES[@]}"; do
    case "$f" in
      *${ABI}*.apk) TARGET_APK="$f"; break;;
    esac
  done
fi

echo "Installing: ${TARGET_APK}"
adb install -r "${TARGET_APK}" || {
  echo "adb install failed. If it's a release APK, ensure signing is configured in android/app (gradle.properties + signingConfigs)."; exit 1;
}

echo "Install complete."
