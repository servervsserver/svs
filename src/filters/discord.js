export function discordInviteHandle (value) {
  if (!value) return ""
  return value.split(/\\|\//).pop()  
}
