// Deterministic safety net for messages that suggest an emergency. The model
// is instructed to handle these, but a fixed response guarantees the right
// resources are always shown, even if the model misbehaves or is unavailable.

const CRISIS_PATTERNS = [
  /\b(?:suicid(?:e|al)|kill (?:myself|himself|herself|themselves|my child|my son|my daughter)|self[-\s]?harm|overdose|wants? to die|doesn'?t want to live|better off dead|no reason to live|end (?:my|his|her|their) life)\b/i,
  /\b(?:child abuse|being abused|abused at home|abusive home|domestic violence|physically abused|sexually abused|unsafe at home|in immediate danger|medical emergency|threatened to hurt|threatens? to (?:hurt|kill)|(?:want|thinking about|planning) to hurt (?:myself|himself|herself|themselves))\b/i,
  /\b(?:this is an emergency|emergency right now|need help right now|call 911|child (?:is )?(?:not safe|unsafe)|being hurt at home)\b/i,
]

export const CRISIS_RESPONSE = `I'm really sorry you and your family are facing this. Your child's safety and well-being come first.

If your child is in immediate danger or having a medical emergency, please call 911 now. If your child is in a mental health crisis in the United States, call or text 988 for the Suicide & Crisis Lifeline. If you suspect abuse or neglect, contact your local child protective services or the Childhelp National Child Abuse Hotline at 1-800-422-4453.

Mission 139 is not an emergency response organization, but we can help with educational advocacy and support resources once the immediate crisis has been addressed. When you are safe and ready, you can share your details through "Talk with our team" and a person will follow up.

I won't collect more information while you're dealing with an emergency.`

export function isCrisisMessage(text: string) {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text))
}
