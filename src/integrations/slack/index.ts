import type { UpdateItem } from '@/types';

/**
 * Slack integration adapter (Phase 6, optional).
 * ----------------------------------------------
 * Reads pinned / recent messages from an announcements channel to enrich
 * Company Updates. Requires a bot token with `channels:history` and
 * `channels:read` (env: SLACK_BOT_TOKEN, SLACK_ANNOUNCEMENTS_CHANNEL_ID).
 *
 * This is optional and degrades cleanly: if Slack is unavailable, Company
 * Updates falls back to Confluence announcements alone.
 */

/** Placeholder. Phase 6 implements conversations.history + normalization. */
export async function fetchAnnouncements(
  _channelId: string,
  _limit = 5
): Promise<UpdateItem[]> {
  throw new Error('slack.fetchAnnouncements not implemented (Phase 6)');
}
