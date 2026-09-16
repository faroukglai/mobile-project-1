/**
 * Snack entry — Expo Snack requires App.js/App.tsx at the project root.
 * Local Expo still uses package.json "main": "expo-router/entry".
 */
import { ExpoRoot } from 'expo-router';

// @ts-expect-error Metro/Snack provide require.context
const ctx = require.context('./src/app');

export default function App() {
  return <ExpoRoot context={ctx} />;
}
