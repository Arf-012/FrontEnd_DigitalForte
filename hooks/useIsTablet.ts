'use client'

import { useMediaQuery } from "./useMediaQuery"

export const useIsTablet = () => {
  return useMediaQuery("(max-width: 1024px)")
}