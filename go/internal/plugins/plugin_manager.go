package plugins

import (
	"encoding/json"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
)

type PluginEvents struct {
	OnStart       string `json:"on_start,omitempty"`
	OnFileChanged string `json:"on_file_changed,omitempty"`
	OnError       string `json:"on_error,omitempty"`
}

type PluginManifest struct {
	Name        string       `json:"name"`
	Description string       `json:"description"`
	Version     string       `json:"version"`
	Command     string       `json:"command"`
	Args        []string     `json:"args"`
	RequiredEnv []string     `json:"required_env"`
	Events      PluginEvents `json:"events,omitempty"`
}

type PluginManager struct {
	pluginsDir string
	manifests  map[string]PluginManifest
	mu         sync.RWMutex
}

func NewPluginManager(dir string) *PluginManager {
	if dir == "" {
		homeDir, _ := os.UserHomeDir()
		dir = filepath.Join(homeDir, ".maestro", "plugins")
	}

	// Ensure directory exists
	if err := os.MkdirAll(dir, 0755); err != nil {
		log.Printf("Warning: Failed to create plugin directory %s: %v", dir, err)
	}

	pm := &PluginManager{
		pluginsDir: dir,
		manifests:  make(map[string]PluginManifest),
	}
	pm.LoadPlugins()
	return pm
}

func (pm *PluginManager) LoadPlugins() {
	pm.mu.Lock()
	defer pm.mu.Unlock()

	entries, err := os.ReadDir(pm.pluginsDir)
	if err != nil {
		log.Printf("Error reading plugins directory: %v", err)
		return
	}

	for _, entry := range entries {
		if entry.IsDir() {
			manifestPath := filepath.Join(pm.pluginsDir, entry.Name(), "manifest.json")
			if data, err := os.ReadFile(manifestPath); err == nil {
				var manifest PluginManifest
				if err := json.Unmarshal(data, &manifest); err == nil {
					pm.manifests[manifest.Name] = manifest
					log.Printf("Loaded plugin: %s (v%s)", manifest.Name, manifest.Version)
				}
			}
		}
	}
}

func (pm *PluginManager) GetAvailablePlugins() []PluginManifest {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	var plugins []PluginManifest
	for _, p := range pm.manifests {
		plugins = append(plugins, p)
	}
	return plugins
}

func (pm *PluginManager) EmitEvent(eventName string, payload interface{}) {
	pm.mu.RLock()
	defer pm.mu.RUnlock()

	for _, manifest := range pm.manifests {
		commandToRun := ""
		switch eventName {
		case "on_start":
			commandToRun = manifest.Events.OnStart
		case "on_file_changed":
			commandToRun = manifest.Events.OnFileChanged
		case "on_error":
			commandToRun = manifest.Events.OnError
		}

		if commandToRun != "" {
			log.Printf("[PluginManager] Emitting %s to %s via %s", eventName, manifest.Name, commandToRun)
			// Mock exec
		}
	}
}

func (pm *PluginManager) ExecutePlugin(name string, input string) (string, error) {
	pm.mu.RLock()
	manifest, exists := pm.manifests[name]
	pm.mu.RUnlock()

	if !exists {
		return "", os.ErrNotExist
	}

	// Create command
	cmd := exec.Command(manifest.Command, manifest.Args...)
	_ = cmd // ignore for mock
	// In a real implementation, you would pipe input via stdin,
	// set environment variables from the ConfigManager,
	// and read stdout iteratively to stream results back.

	// For this skeleton, we just mock the return
	return "Executed plugin: " + name + " with input: " + input, nil
}
