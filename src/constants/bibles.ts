export default [
  {
    id: 'ENGESVC',
    name: '2001 English Standard',
    abbr: 'ESV'
  },
  {
    id: 'ENGKJVC',
    name: 'King James Version',
    abbr: 'KJV'
  },
  {
    id: 'ENGKJVC2',
    name: 'King James Version (Dramatized)',
    abbr: 'KJV(D)'
  }
]

/**
 * This map attempts to preserve backward-compatibility with previous bible version ids stored in the redux store.
 */
export const legacyBibleIdsMap = {
  ENGESV2: 'ENGESVC',
  ENGKJV1: 'ENGKJVC',
  ENGKJV2: 'ENGKJVC2',
  ENGESVC: 'ENGESVC',
  ENGKJVC: 'ENGKJVC',
  ENGKJVC2: 'ENGKJVC2',
} as any;
