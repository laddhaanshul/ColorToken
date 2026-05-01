# Agent Configuration

## Agent: color-tokens-bot

### Description

The `color-tokens-bot` is an AI agent designed to assist developers with the `@laddhaanshul/color-tokens` npm package. It can help with token selection, theme configuration, accessibility auditing, and code generation for both React web and React Native projects.

### Capabilities

- **Token Lookup:** Retrieve specific color values from primitive or semantic tokens by category, shade, or name
- **Theme Configuration:** Generate theme provider code for React (CSS variables) and React Native (Context API)
- **Accessibility Audit:** Check text-background contrast ratios and suggest WCAG-compliant color combinations
- **Code Generation:** Create styled components, style sheets, and CSS variable definitions using the token system
- **Migration Assistance:** Help migrate existing projects from hardcoded colors to token-based theming
- **Custom Extensions:** Guide users through adding custom color scales or semantic tokens

### Integration Points

- **GitHub Actions:** The agent can be integrated into CI pipelines to audit PRs for hardcoded color values
- **VS Code Extension:** Can be used as a language server for autocomplete and hover documentation
- **CLI Tool:** Available as an npm binary for token inspection and generation tasks
- **Documentation Bot:** Powers the interactive documentation on the promotional website

### Configuration

```yaml
agent:
  name: color-tokens-bot
  version: 1.0.0
  model: gpt-4
  context:
    - packages/color-tokens/src/tokens/primitive.ts
    - packages/color-tokens/src/tokens/semantic.ts
    - packages/color-tokens/src/utils/index.ts
  commands:
    - name: lookup
      description: Look up a color token value
      usage: "lookup <category>.<key>"
    - name: contrast
      description: Check contrast ratio between two colors
      usage: "contrast <hex1> <hex2>"
    - name: generate-theme
      description: Generate theme provider boilerplate
      usage: "generate-theme [--platform=react|react-native]"
    - name: audit
      description: Audit a file for hardcoded colors
      usage: "audit <file-path>"
  temperature: 0.2
  max_tokens: 4096
```

### Example Interactions

**User:** "What's the brand primary color in dark mode?"
**Agent:** The brand primary color in dark mode is `#60A5FA` (from `darkSemanticColors.brand.primary`). This maps to `primitiveColors.blue[400]`, providing adequate contrast against the dark background (`#030712`).

**User:** "Generate a theme provider for my React app"
**Agent:** Here's a complete ThemeProvider implementation using CSS variables... [generates code]

**User:** "Does white text on brand primary meet WCAG AA?"
**Agent:** White (`#FFFFFF`) on brand primary (`#2563EB`) gives a contrast ratio of approximately 4.6:1, which meets WCAG AA for normal text (requires 4.5:1). However, it does not meet AAA (requires 7:1).
