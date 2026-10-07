import crypto from 'node:crypto'

/**
 * Cloudflare Workers runtime (workerd) enforces a maximum of 100,000 iterations for PBKDF2.
 * Payload CMS 3 defaults to 600,000 iterations, which throws:
 * "NotSupportedError: Pbkdf2 failed: iteration counts above 100000 are not supported (requested 600000)."
 * This patch caps PBKDF2 iterations to 100,000 for both Node crypto and WebCrypto Subtle,
 * allowing user registration, password hashing, and authentication to succeed on Cloudflare.
 */
function patchNodeCrypto() {
  try {
    if (crypto && typeof crypto.pbkdf2 === 'function') {
      const originalPbkdf2 = crypto.pbkdf2
      ;(crypto as any).pbkdf2 = function (password: any, salt: any, iterations: any, keylen: any, digest: any, callback: any) {
        const safeIterations = typeof iterations === 'number' && iterations > 100000 ? 100000 : iterations
        return originalPbkdf2.call(crypto, password, salt, safeIterations, keylen, digest, callback)
      }
    }

    if (crypto && typeof crypto.pbkdf2Sync === 'function') {
      const originalPbkdf2Sync = crypto.pbkdf2Sync
      ;(crypto as any).pbkdf2Sync = function (password: any, salt: any, iterations: any, keylen: any, digest: any) {
        const safeIterations = typeof iterations === 'number' && iterations > 100000 ? 100000 : iterations
        return originalPbkdf2Sync.call(crypto, password, salt, safeIterations, keylen, digest)
      }
    }
  } catch (e) {
    console.warn('Failed to patch node:crypto pbkdf2:', e)
  }
}

function patchWebCrypto() {
  try {
    if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) {
      const subtle = globalThis.crypto.subtle

      if (typeof subtle.deriveBits === 'function') {
        const origDeriveBits = subtle.deriveBits.bind(subtle)
        subtle.deriveBits = function (
          algorithm: AlgorithmIdentifier | Pbkdf2Params,
          baseKey: CryptoKey,
          length: number
        ) {
          if (algorithm && typeof algorithm === 'object' && 'name' in algorithm && algorithm.name === 'PBKDF2') {
            const pbkdf2Params = algorithm as Pbkdf2Params
            if (pbkdf2Params.iterations > 100000) {
              algorithm = { ...pbkdf2Params, iterations: 100000 }
            }
          }
          return origDeriveBits(algorithm, baseKey, length)
        }
      }

      if (typeof subtle.deriveKey === 'function') {
        const origDeriveKey = subtle.deriveKey.bind(subtle)
        subtle.deriveKey = function (
          algorithm: AlgorithmIdentifier | Pbkdf2Params,
          baseKey: CryptoKey,
          derivedKeyType: AlgorithmIdentifier,
          extractable: boolean,
          keyUsages: KeyUsage[]
        ) {
          if (algorithm && typeof algorithm === 'object' && 'name' in algorithm && algorithm.name === 'PBKDF2') {
            const pbkdf2Params = algorithm as Pbkdf2Params
            if (pbkdf2Params.iterations > 100000) {
              algorithm = { ...pbkdf2Params, iterations: 100000 }
            }
          }
          return origDeriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages)
        }
      }
    }
  } catch (e) {
    console.warn('Failed to patch WebCrypto subtle deriveBits:', e)
  }
}

patchNodeCrypto()
patchWebCrypto()
