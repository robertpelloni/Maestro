package agent

import (
	"testing"
)

func TestAgentDetector_DetectAvailableAgents(t *testing.T) {
	detector := NewAgentDetector()
	agents := detector.DetectAvailableAgents()

	if len(agents) == 0 {
		t.Error("Expected agents to be detected, got none")
	}

	expectedAgents := map[string]bool{
		"aider": true,
		"claude_code": true,
		"goose": true,
		"open_interpreter": true,
	}

	for _, a := range agents {
		if expectedAgents[a] {
			delete(expectedAgents, a)
		}
	}

	if len(expectedAgents) > 0 {
		t.Errorf("Some expected agents were not detected: %v", expectedAgents)
	}
}

func TestAgentDetector_CompactContext(t *testing.T) {
	detector := NewAgentDetector()

	shortContext := "This is short"
	if res := detector.CompactContext(shortContext, 10); res != shortContext {
		t.Errorf("Expected %s, got %s", shortContext, res)
	}

	longContext := "This is a very long context string that should be truncated because it exceeds the maximum token length we define here"
	compacted := detector.CompactContext(longContext, 5)

	expectedStart := "This is a very long"
	if compacted[:len(expectedStart)] != expectedStart {
		t.Errorf("Expected to start with '%s', got %s", expectedStart, compacted)
	}

	if compacted[len(compacted)-19:] != "[Context Compacted]" {
		t.Errorf("Expected compaction indicator at the end, got %s", compacted)
	}
}
