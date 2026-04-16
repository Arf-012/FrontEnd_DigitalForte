'use client'

import {
  RefObject,
  useEffect,
  useState,
  useCallback,
} from 'react'

export interface UseIntersectionObserverOptions
  extends IntersectionObserverInit {
  /**
   * If true, stops observing after first intersection
   */
  freezeOnceVisible?: boolean
}

export interface UseIntersectionObserverReturn {
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver<T extends Element>(
  targetRef: RefObject<T | null>,
  {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const [entry, setEntry] =
    useState<IntersectionObserverEntry | null>(null)

  const [isIntersecting, setIsIntersecting] =
    useState(false)

  const frozen = freezeOnceVisible && isIntersecting

  const updateEntry = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [observerEntry] = entries
      setEntry(observerEntry)
      setIsIntersecting(observerEntry.isIntersecting)
    },
    []
  )

  useEffect(() => {
    const node = targetRef?.current
    if (!node || frozen) return

    const observer = new IntersectionObserver(updateEntry, {
      root,
      rootMargin,
      threshold,
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [
    targetRef,
    root,
    rootMargin,
    threshold,
    frozen,
    updateEntry,
  ])

  return { isIntersecting, entry }
}
