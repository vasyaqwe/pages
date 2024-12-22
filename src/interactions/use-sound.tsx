import * as React from "react"

export function useSound(
   url: string,
   settings:
      | {
           volume?: number
           playbackRate?: number
        }
      | undefined = {},
) {
   const audioRef = React.useRef<HTMLAudioElement | null>(null)

   React.useEffect(() => {
      // If the url changes, we clear the old instance,
      // this way a new Audio instance will be created on the next play
      audioRef.current = null
   }, [url])

   React.useEffect(() => {
      if (!audioRef.current) return
      audioRef.current.volume = settings.volume || 1
      audioRef.current.playbackRate = settings.playbackRate || 1
   }, [settings])

   const play = () => {
      if (typeof window === "undefined") return

      if (!audioRef.current) {
         // We only created the Audio instance when play is fired,
         // this way we can avoid loading the sound if it's not used
         audioRef.current = new Audio(url)
      }

      try {
         audioRef.current.currentTime = 0
         audioRef.current.play()
      } catch {}
   }

   return { play }
}
