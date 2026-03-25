import { BorgHandoff } from '../../shared/borg-schema';
import { logger } from '../utils/logger';

const LOG_CONTEXT = 'BorgCoreClient';

export class BorgCoreClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.BORG_CORE_URL || 'http://localhost:3000') {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  async createSession(task: string, initialMetadata?: Record<string, any>): Promise<string> {
    const response = await fetch(`${this.baseUrl}/v1/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, initialMetadata }),
    });

    if (!response.ok) {
      const errorMsg = `Failed to create Borg session: ${response.status} ${response.statusText}`;
      logger.error(errorMsg, LOG_CONTEXT);
      throw new Error(errorMsg);
    }

    const data = await response.json() as { sessionId: string };
    return data.sessionId;
  }

  async listSessions(): Promise<Array<{ sessionId: string; task: string; status: string }>> {
    const response = await fetch(`${this.baseUrl}/v1/sessions`);

    if (!response.ok) {
      const errorMsg = `Failed to list Borg sessions: ${response.status} ${response.statusText}`;
      logger.error(errorMsg, LOG_CONTEXT);
      throw new Error(errorMsg);
    }

    return await response.json() as Array<{ sessionId: string; task: string; status: string }>;
  }

  async getHandoff(sessionId: string): Promise<BorgHandoff> {
    const response = await fetch(`${this.baseUrl}/v1/handoffs/${sessionId}`);

    if (!response.ok) {
      const errorMsg = `Failed to get handoff for session ${sessionId}: ${response.status} ${response.statusText}`;
      logger.error(errorMsg, LOG_CONTEXT);
      throw new Error(errorMsg);
    }

    return await response.json() as BorgHandoff;
  }

  async putHandoff(sessionId: string, handoff: BorgHandoff): Promise<void> {
    const response = await fetch(`${this.baseUrl}/v1/handoffs/${sessionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(handoff),
    });

    if (!response.ok) {
      const errorMsg = `Failed to put handoff for session ${sessionId}: ${response.status} ${response.statusText}`;
      logger.error(errorMsg, LOG_CONTEXT);
      throw new Error(errorMsg);
    }
  }

  async archiveSession(sessionId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/v1/sessions/${sessionId}/archive`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorMsg = `Failed to archive session ${sessionId}: ${response.status} ${response.statusText}`;
      logger.error(errorMsg, LOG_CONTEXT);
      throw new Error(errorMsg);
    }
  }

  async getHealth(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/health`);
      if (!response.ok) {
        return { status: 'unhealthy' };
      }
      return await response.json() as { status: string };
    } catch (error) {
      return { status: 'unreachable' };
    }
  }
}
