export const DEBUG_LOGS = process.env.DEBUG_LOGS === 'true';

export function debugLog(...args: unknown[]) {
  if (DEBUG_LOGS) {
    console.log(...args);
  }
}
