'use client'

import { useMediaQuery } from "./useMediaQuery"

export const useIsMobile = () => {
  return useMediaQuery("(max-width: 768px)")
}