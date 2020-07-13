// @flow

/* eslint-disable */

// This is a modified version of redux-persist's createMigrate that allows async
// migrations to be used if you pass the option { asyncMigrations: true }. Async
// migrations are run in sequence and block.
// SOURCE: https://gist.github.com/aguynamedben/ee5ef358856f1543129265fd3cf8b732
// https://github.com/rt2zz/redux-persist/issues/866#issuecomment-441154521


import { DEFAULT_VERSION } from 'redux-persist/lib/constants'

import { PersistedState, MigrationManifest } from 'redux-persist/lib/types'

export default function createMigrate(
  migrations: MigrationManifest,
  config?: { debug: boolean, asyncMigrations?: boolean }
) {
  let { debug, asyncMigrations } = config || {}
  return function(
    state: PersistedState,
    currentVersion: number
  ): Promise<PersistedState> {
    if (!state) {
      if (process.env.NODE_ENV !== 'production' && debug)
        console.log('redux-persist: no inbound state, skipping migration')
      return Promise.resolve(undefined)
    }

    let inboundVersion: number =
      state._persist && state._persist.version !== undefined
        ? state._persist.version
        : DEFAULT_VERSION
    if (inboundVersion === currentVersion) {
      if (process.env.NODE_ENV !== 'production' && debug)
        console.log('redux-persist: versions match, noop migration')
      return Promise.resolve(state)
    }
    if (inboundVersion > currentVersion) {
      if (process.env.NODE_ENV !== 'production')
        console.error('redux-persist: downgrading version is not supported')
      return Promise.resolve(state)
    }

    let migrationKeys = Object.keys(migrations)
      .map(ver => parseInt(ver))
      .filter(key => currentVersion >= key && key > inboundVersion)
      .sort((a, b) => a - b)

    if (process.env.NODE_ENV !== 'production' && debug)
      console.log('redux-persist: migrationKeys', migrationKeys)

    if (asyncMigrations) {
      // Return Promise chain to run async migrations in sequence. Migration
      // functions can return a Promise (or be async).
      return migrationKeys.reduce((promiseChain, versionKey) => {
        return promiseChain.
          then((state) => {
            console.log(`redux-persist: running migration ${versionKey}`);
            return (migrations[versionKey](state) as any)
              .then((state: any) => {
                console.log(`redux-persist: successfully ran migration ${versionKey}`);
                return state;
              })
              .catch((error: any) => {
                console.log(`redux-persist: error running migration ${versionKey}: ${error.message}`);
                throw error;
              });
          });
      }, Promise.resolve(state));
    } else {
      try {
        let migratedState = migrationKeys.reduce((state, versionKey) => {
          if (process.env.NODE_ENV !== 'production' && debug)
            console.log(
              'redux-persist: running migration for versionKey',
              versionKey
            )
          return migrations[versionKey](state) as any
        }, state)
        return Promise.resolve(migratedState) as any
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
