import { NextRequest } from 'next/server'
import { headers } from 'next/headers'

interface RateLimitRecord {
  count: number
  resetTime: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetIn: number
}

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  prefix?: string
}

const store = new Map<string, RateLimitRecord>()
const MAX_STORE_SIZE = 10000

function cleanup(windowMs: number) {
  if (store.size <= MAX_STORE_SIZE) return
  const cutoff = Date.now() - windowMs
  for (const [key, record] of store.entries()) {
    if (record.resetTime < cutoff) store.delete(key)
  }
}

export function checkRateLimit(
  ip: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs, prefix = 'rl' } = config
  const now = Date.now()
  const key = `${prefix}_${ip}`

  cleanup(windowMs)

  const record = store.get(key)

  if (!record || now > record.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now }
  }

  record.count++
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetIn: record.resetTime - now,
  }
}

export function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  const realIP = request.headers.get('x-real-ip')
  if (realIP) return realIP

  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  if (cfConnectingIP) return cfConnectingIP

  return 'unknown'
}

export async function getClientIPFromHeaders(): Promise<string> {
  const headersList = await headers()

  const forwardedFor = headersList.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  const realIP = headersList.get('x-real-ip')
  if (realIP) return realIP

  const cfConnectingIP = headersList.get('cf-connecting-ip')
  if (cfConnectingIP) return cfConnectingIP

  return 'unknown'
}

export function rateLimitHeaders(
  result: RateLimitResult,
  maxRequests: number
): Record<string, string> {
  return {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetIn / 1000).toString(),
    ...(result.allowed ? {} : { 'Retry-After': Math.ceil(result.resetIn / 1000).toString() }),
  }
}
