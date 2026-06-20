export class RovoAgent {
	constructor() {}

	public async queryEnterpriseGraph(query: string): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`Enterprise graph results for: ${query}`);
			}, 400);
		});
	}

	public async transitionIssueStatus(issueKey: string, status: string): Promise<void> {
		console.log(`Transitioned ${issueKey} to ${status}`);
		return new Promise((resolve) => setTimeout(resolve, 200));
	}
}
