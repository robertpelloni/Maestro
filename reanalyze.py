with open("TODO.md", "r") as f:
    todo = f.read()

todo = todo.replace("- [ ] **Group Chat Polish**: Dynamically resolve the moderator agent type in `useGroupChatHandlers.ts` instead of hardcoding it.", "- [x] **Group Chat Polish**: Dynamically resolve the moderator agent type in `useGroupChatHandlers.ts` instead of hardcoding it.")
with open("TODO.md", "w") as f:
    f.write(todo)
