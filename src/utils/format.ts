export const formatDateRelative = (
   date: Date | number,
   style?: Intl.RelativeTimeFormatStyle,
) => {
   // Allow dates or times to be passed
   const timeMs = typeof date === "number" ? date : date.getTime()

   // Get the amount of seconds between the given date and now
   const deltaSeconds = Math.round((Date.now() - timeMs) / 1000) // Changed this line

   if (Math.abs(deltaSeconds) < 60) return "just now"

   // Array representing one minute, hour, day, week, month, etc in seconds
   const cutoffs = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity,
   ]

   // Array equivalent to the above but in the string representation of the units
   const units: Intl.RelativeTimeFormatUnit[] = [
      "second",
      "minute",
      "hour",
      "day",
      "week",
      "month",
      "year",
   ]

   // Grab the ideal cutoff unit
   const unitIndex = cutoffs.findIndex(
      (cutoff) => cutoff > Math.abs(deltaSeconds),
   )

   // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
   // is one day in seconds, so we can divide our seconds by this to get the # of days
   const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1
   const unit = units[unitIndex]

   if (!divisor || !unit) return ""

   // Intl.RelativeTimeFormat do its magic
   const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto", style })
   return rtf.format(-Math.floor(deltaSeconds / divisor), unit) // Added negative sign here
}

export const formatDateIntl = (
   date: Date | string | number,
   options: Intl.DateTimeFormatOptions = {},
) =>
   new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      ...options,
   }).format(new Date(date))

export const formatDate = (input: number) => {
   const date = new Date(input)

   const now = new Date()
   const yesterday = new Date(now)

   yesterday.setDate(now.getDate() - 1)

   const beforeYesterday = new Date(now)
   beforeYesterday.setDate(now.getDate() - 2)

   if (date.toDateString() === now.toDateString()) {
      return "Today"
   }
   if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
   }

   return formatDateIntl(input)
}

export const formatNumber = (value: number) => {
   const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
   })

   if (value >= 1_000_000) {
      return `${formatter.format(value / 1_000_000)}M`
   }
   if (value >= 1_000) {
      return `${formatter.format(value / 1_000)}K`
   }
   return formatter.format(value)
}

export const formatCurrency = (
   price: number | string,
   options: Intl.NumberFormatOptions = {},
) => {
   return new Intl.NumberFormat("ua-UA", {
      style: "currency",
      currency: options.currency ?? "UAH",
      notation: options.notation ?? "standard",
      ...options,
   })
      .format(Number(price))
      .replace("UAH", "₴")
}
