package wails

import (
	"context"

	"github.com/robertpelloni/maestro/go/internal/orchestrator"
)

// MaestroApp struct
type MaestroApp struct {
	ctx    context.Context
	router *orchestrator.MaestroRouter
}

// NewMaestroApp creates a new MaestroApp application struct
func NewMaestroApp() *MaestroApp {
	return &MaestroApp{
		router: orchestrator.NewMaestroRouter(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *MaestroApp) Startup(ctx context.Context) {
	a.ctx = ctx
}

// AutoOrchestrate triggers the auto-orchestration loop
func (a *MaestroApp) AutoOrchestrate(task string) (string, error) {
	result, err := a.router.AutoOrchestrate(task)
	if err != nil {
		return "", err
	}
	return result.TaskResult, nil
}

// RouteTask routes a specific task to an agent
func (a *MaestroApp) RouteTask(task string) (string, error) {
	result, err := a.router.RouteTask(task)
	if err != nil {
		return "", err
	}
	return result.AgentResponse, nil
}
