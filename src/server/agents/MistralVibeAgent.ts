export class MistralVibeAgent {
	public vibeProfile: string = 'default';

	constructor() {}

	public setVibeProfile(profile: string): void {
		this.vibeProfile = profile;
		console.log(`Vibe profile set to: ${profile}`);
	}
}
