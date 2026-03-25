import { BorgHandoff, BorgSettingsPayload, BorgPlaybooksPayload } from '../../shared/borg-schema';

export interface IBorgProvider {
	createSession(task: string, initialMetadata?: Record<string, any>): Promise<string>;
	commitHandoff(handoff: BorgHandoff): Promise<void>;
	getHandoff(sessionId: string): Promise<BorgHandoff>;
	transitionPhase(sessionId: string, completedPhaseId: number, nextPhaseId?: number): Promise<void>;
	listSessions(): Promise<Array<{ sessionId: string; task: string; status: string }>>;
	archiveSession(sessionId: string): Promise<void>;
	getStatus(): Promise<{ connected: boolean; latencyMs?: number }>;
	syncSettings(settings: BorgSettingsPayload): Promise<BorgSettingsPayload>;
	syncPlaybooks(playbooks: BorgPlaybooksPayload): Promise<BorgPlaybooksPayload>;
}
